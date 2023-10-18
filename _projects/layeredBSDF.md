---
layout: project
title: Position Free Monte Carlo for layered material rendering
poster: project_layeredmat.png
venue : Physics Based Rendering, CMU Spring 2021
order: 1
sections:
  abstract: Real world objects are often coated with multiple layers on top the base color to protect from scratches or to provide rich diversity of material appear- ance like spatially varying specular highlights. The idea of layered material modeling tries to circumvent explicitly calculating light transport with each coating layer and replace it with BSDF which gives equivalent reflection and transmission component, albeit with some assumption. Past approaches have tackled the problem of modeling layered material by either creating a concise representation of captured data or by precomputing a low-order statistics of the material. My project is based on [Guo et al. 2018] work on using position free Monte Carlo with plane parallel layers with participating media to provide the BRDF. In my project, I have implemented their unidi- rectional evaluation and approximate PDF approach to show the concept. The report highlights the main algorithm and benefits of the approach.
---
**Arpit Agarwal**  
[Report](assets/pdfs/project_layeredmat.pdf)
{: .links} 