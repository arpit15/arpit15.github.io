---
title: "A Modularized Approach to Vision-based Tactile Sensor Design Using Physics-based Rendering"
poster: project_opticalsim.png
venue : Ph.D. Thesis, Robotics Institute, Carnegie Mellon University, 2024
order: 2
type: thesis
section:
  abstract: "Touch is an essential sensing modality for making autonomous robots more dexterous and allowing them to work collaboratively with humans. In particular, the advent of vision-based tactile sensors has resulted in efforts to design such sensors that can be easily incorporated into various robot structures for different robotic manipulation tasks, to increase robustness, precision, and reliability. However, this design task remains a challenging problem. This is for two reasons: first, the design of the sensor itself requires the compact integration of multiple optical elements to improve optical signal fidelity during interaction with the environment; second, the successful integration of vision-based tactile sensors into robotic manipulation tasks requires the codesign of both the sensors and the robot structure itself. This thesis aims to alleviate these two challenges by creating a general design framework that allows a roboticist to quickly iterate on the design and evaluation of vision-based tactile sensors for designated robotic manipulation tasks. The framework comprises three core elements. First, our framework uses an optical simulator that can accurately and efficiently generate the images captured by arbitrary sensor designs. Our simulator leverages physics-based rendering techniques from computer graphics and enables the generation of realistic tactile images for any given sensor design. To create this simulator, we performed detailed real-to-sim experiments to calibrate our simulation models. We show that the resulting simulator can qualitatively and quantitatively match real-world measurements for GelSight-like sensors with flat and curved sensing surfaces. Second, our framework proposes computational techniques for procedural sensor generation and automatic sensor design evaluation techniques. In the context of curved tactile sensors, our generator takes as input a 2D curve and uses CAD primitives to generate from it the full sensor shape. The procedural sensor generation allows for the automatic placement of different optical components, given their corresponding reference geometry. We introduce three objective functions: RGB2Norm, NormDiff, and As-orthographic-as-possible. These objective functions quantify sensor design’s tactile signal perception and enable automatic parameter selection. Third, our framework introduces an interactive design toolbox, OptiSense Studio, that functionalizes our design pipeline into a useful tool for novice users. We introduce general design modules for the rapid prototyping of GelSight-like tactile sensors. The toolbox allows interactive feedback through optical simulation while designing the sensor without deep expertise. The obtained design is automatically parameterized through our toolbox and can be optimized using our proposed objective functions. We have successfully applied this framework for the design of vision-based tactile sensors that used curved surfaces to emulate human fingertips. We have also applied our interactive framework for rapidly creating optimized variants of existing tactile sensors, GelSight Mini, GelSight360, and GelSight Svelte. Finally, we are able to create a new sensor, GelBelt, for a different robotic application completely virtually and optimize its illumination settings using our toolbox. Through this thesis, we demonstrate the utility of our design framework for the co-design of vision-based tactile sensors and soft robots. More broadly, we hope to create a new point of convergence between disparate communities such as computer graphics (physics-based rendering and simulation), optics (optical lens and material design), and robotics, and foster new research directions within and across these communities."
bibtex: |
  @phdthesis{agarwal2024modularized,
    title   = {A Modularized Approach to Vision-based Tactile Sensor Design Using Physics-based Rendering},
    author  = {Agarwal, Arpit},
    school  = {Carnegie Mellon University},
    address = {Pittsburgh, PA},
    type    = {{Ph.D.} thesis},
    note    = {Robotics Institute. Advisors: Wenzhen Yuan and Ioannis Gkioulekas. Posted online January 2026},
    year    = {2024},
    doi     = {10.1184/R1/31076170.v1},
    url     = {https://kilthub.cmu.edu/articles/thesis/A_Modularized_Approach_to_Vision-based_Tactile_Sensor_Design_Using_Physics-based_Rendering/31076170}
  }
---
**Arpit Agarwal**. Advisors: Wenzhen Yuan, Ioannis Gkioulekas.  
[Thesis](https://kilthub.cmu.edu/articles/thesis/A_Modularized_Approach_to_Vision-based_Tactile_Sensor_Design_Using_Physics-based_Rendering/31076170) \|
[DOI](https://doi.org/10.1184/R1/31076170.v1)
{: .links}
