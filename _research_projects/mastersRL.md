---
layout: project
title: Model learning for look-ahead exploration in continuous control
poster: project_mastersRL.jpg
venue: AAAI Conference on Artificial Intelligence (AAAI), 2019
order: 3
section:
  abstract: We propose an exploration method that incorporates look- ahead search over basic learnt skills and their dynamics, and use it for reinforcement learning (RL) of manipulation poli- cies . Our skills are multi-goal policies learned in isolation in simpler environments using existing multigoal RL formula- tions, analogous to options or macroactions. Coarse skill dy- namics, i.e., the state transition caused by a (complete) skill execution, are learnt and are unrolled forward during looka- head search. Policy search benefits from temporal abstrac- tion during exploration, though itself operates over low-level primitive actions, and thus the resulting policies does not suf- fer from suboptimality and inflexibility caused by coarse skill chaining. We show that the proposed exploration strategy results in effective learning of complex manipulation poli- cies faster than current state-of-the-art RL methods, and con- verges to better policies than methods that use options or parametrized skills as building blocks of the policy itself, as opposed to guiding exploration. We show that the proposed exploration strategy results in effective learning of complex manipulation policies faster than current state-of-the-art RL methods, and converges to better policies than methods that use options or parameterized skills as building blocks of the policy itself, as opposed to guiding exploration.
---
**Arpit Agarwal**, Katharina Muelling, Katerina Fragkiadaki.  
[PDF](https://www.aaai.org/ojs/index.php/AAAI/article/download/4181/4059) \|
[project page](https://sites.google.com/view/skill-based-exploration/home) \|
[code](https://github.com/arpit15/skill-based-exploration-drl)
{: .links} 