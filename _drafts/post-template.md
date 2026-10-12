---
# ---- Front matter reference (delete these comments in real posts) ----
title: "Kernel launch overhead notes"   # required, shown as <h1> and in lists
date: 2026-10-11 09:00:00 -0700          # required for published posts; file name must be YYYY-MM-DD-slug.md
description: "What a CUDA kernel launch actually costs, and how to amortize it."  # optional; shown on /blog/ and used by SEO tags
tags: [cuda, performance]                # optional; shown in the post meta line
toc: true                                # optional; client-side table of contents from h2/h3 (default: false)
math: true                               # optional; loads KaTeX (default: true for posts, set false to skip)
# layout: post                           # default for posts (see _config.yml)
---

A short intro paragraph goes here. It should say what the post is about and why you
should care, in two or three sentences. This draft exercises every styling feature
of the site: headings, math, code, tables, figures, footnotes, callouts and quotes.

## Why launch overhead matters

A CUDA kernel launch is not free. On a modern GPU the host-side cost is roughly
$$t_\text{launch} \approx 3\text{--}10\,\mu\text{s}$$
per kernel, regardless of how much work the kernel does. If a kernel runs for
$$t_\text{kernel}$$ and you launch $$N$$ of them back to back, the fraction of time
spent doing useful work is

$$
\eta = \frac{N\, t_\text{kernel}}{N\,(t_\text{kernel} + t_\text{launch})}
     = \frac{1}{1 + t_\text{launch} / t_\text{kernel}} .
$$

When $$t_\text{kernel} \ll t_\text{launch}$$ the efficiency collapses, which is why
tiny elementwise kernels are the first thing to fuse.

> Premature optimization is the root of all evil, but launch-bound code is the
> root of many profiler screenshots.

**Note.** Callouts use a kramdown inline attribute list: put `{: .note}` on the line
directly after a paragraph (no blank line in between). It works on blockquotes too.
{: .note}

### Aligned equations

Derivations work too. Here is a simple cost model for a chain of $$k$$ fused kernels:

$$
\begin{aligned}
T_\text{unfused} &= k\, t_\text{launch} + \sum_{i=1}^{k} t_i \\
T_\text{fused}   &= t_\text{launch} + \sum_{i=1}^{k} t_i - \Delta_\text{mem} \\
\Rightarrow\quad T_\text{unfused} - T_\text{fused} &= (k-1)\, t_\text{launch} + \Delta_\text{mem}.
\end{aligned}
$$

And a matrix, because robotics people love rotations:

$$
R_z(\theta) =
\begin{bmatrix}
\cos\theta & -\sin\theta & 0 \\
\sin\theta & \cos\theta  & 0 \\
0          & 0           & 1
\end{bmatrix},
\qquad R_z(\theta)^\top R_z(\theta) = I .
$$

Single-dollar inline math like $x_i + y_i$ also renders, but kramdown may treat
underscores as emphasis, so prefer the double-dollar form $$x_i + y_i$$ in prose.

## Measuring it

Let's start with the CUDA side. The kernel below does almost nothing on purpose, so
the timing is dominated by the launch.

```cuda
#include <cstdio>
#include <cuda_runtime.h>

__global__ void empty_kernel(float* __restrict__ out, int n) {
    int i = blockIdx.x * blockDim.x + threadIdx.x;
    if (i < n) out[i] += 1.0f;
}

int main() {
    const int n = 1 << 10;
    float* d_out;
    cudaMalloc(&d_out, n * sizeof(float));

    cudaEvent_t start, stop;
    cudaEventCreate(&start);
    cudaEventCreate(&stop);

    cudaEventRecord(start);
    for (int it = 0; it < 1000; ++it) {
        empty_kernel<<<(n + 255) / 256, 256>>>(d_out, n);
    }
    cudaEventRecord(stop);
    cudaEventSynchronize(stop);

    float ms = 0.f;
    cudaEventElapsedTime(&ms, start, stop);
    printf("avg per launch: %.2f us\n", ms * 1e3f / 1000);
    cudaFree(d_out);
    return 0;
}
```

On the host side, `cudaLaunchKernel` is where the time goes. A plain C++ version of
a launch wrapper looks like this:

```cpp
template <typename Kernel, typename... Args>
inline void launch(Kernel k, dim3 grid, dim3 block, cudaStream_t s, Args... args) {
    k<<<grid, block, 0, s>>>(args...);
    // Always check; launch errors are asynchronous otherwise.
    if (cudaPeekAtLastError() != cudaSuccess) {
        std::fprintf(stderr, "launch failed: %s\n",
                     cudaGetErrorString(cudaGetLastError()));
    }
}
```

The same experiment from Python with PyTorch, using `torch.cuda.Event` for timing:

```python
import torch

x = torch.zeros(1 << 10, device="cuda")
start, end = torch.cuda.Event(enable_timing=True), torch.cuda.Event(enable_timing=True)

torch.cuda.synchronize()
start.record()
for _ in range(1000):
    x += 1          # one tiny kernel per iteration
end.record()
torch.cuda.synchronize()

print(f"avg per launch: {start.elapsed_time(end) / 1000 * 1e3:.2f} us")
```

### Results

Numbers from one run on an RTX-class GPU (yours will differ).[^1]

| Approach              | Launches | Time per iter (us) | Speedup |
|:----------------------|---------:|-------------------:|--------:|
| Plain stream launches |     1000 |                4.8 |    1.0x |
| CUDA Graph            |        1 |                1.6 |    3.0x |
| Fused kernel          |        1 |                0.9 |    5.3x |

The wide-table case: on narrow screens a table like this scrolls inside itself instead
of making the whole page scroll sideways.

## Figures

Figures use plain HTML so they can carry a caption:

<figure>
  <img src="{{ '/assets/images/project_opticalsim.png' | relative_url }}" alt="Rendering of an optical tactile sensor simulation" style="max-width: 80%">
  <figcaption>Figure 1. Any image under <code>assets/images</code> works; captions are optional.</figcaption>
</figure>

## Fixes that worked

1. Fuse elementwise kernels (or let `torch.compile` do it).
2. Capture repeated launch sequences in a CUDA Graph.
3. Batch small problems into a single launch with a grid-stride loop.

Inline code such as `cudaLaunchKernel`, `threadIdx.x` or `std::vector<float>` is
styled subtly, and long lines in a code block scroll inside the block, not the page.

---

That's all. Happy profiling.

[^1]: Footnotes are a kramdown feature: define them anywhere with `[^id]: text` and they are collected at the bottom of the post.
