# Journey 

The aim of this section is to track periodically the development state from the **point of view of the team**. So we will describe the main concepts, issues and solutions taken into consideration without an high level of detail (reserved for the `report` document).

> For this project we have decided to follow the agile philosophy and split the development in five sprints of one week.

<br/>

---
## **Sprint 1** (from May 16th to May 23rd) 
In this initial phase we **set-up the repository** and decided **best practices** 
(branching strategy, code style, solution architecture, etc.).

We made a **feasibility study** for our initial idea (**baseline**) which was: 
* Modeling in [Blender](https://www.blender.org/) a copy of the **arc-reactor** created by Tony Stark in the movie [Iron Man](https://en.wikipedia.org/wiki/Iron_Man) 
    * This seems a good mesh choice cause arc-reactor is quite complex visually but feasible to be modeled, from zero, in (more or less) one week
<br/><br/>
<div style="text-align: center;">
<img src="https://www.dhresource.com/webp/m/0x0s/f2-albu-g10-M01-4D-BD-rBVaVlxUREuAHr4IAAHXO5VHzhw270.jpg/scala-1-1-per-iron-man-arc-reactor-necessario.jpg" alt="arc reactor" style="width:50%">

<strong>Image 1</strong> - <em>Original arc reactor (credits: image from [it.dhgate.com](https://it.dhgate.com/product/1-1-scale-for-iron-man-arc-reactor-need-to/445607161.html))</em></div>
<br/>

* Create a **basic scene** in `THREE.js` loading the model with an `orbit control` applied on the camera, in order to visualize the mesh
* Using the `vertex colors` in order to (select) change a specific component of the mesh **applying different shaders**
    * Create a simple **command bar** in order to **change the component material**
* Embed the scene in a **simple web page**

<br/>

---
## **Sprint 2** (from May 24th to May 30th) 

In this sprint we have tried to study the basic **modeling notions** and design in 
Blender the mesh. A first issue was the **reduction of the number of triangles** of the mesh (essential cause the mesh was really heavy in terms of memory) and the application of the `shade smooth` command (needed to improove the mesh smoothness aesthetic).

We noticed that the mesh could be decomposed properly in some component with exactly one homogeneous material (emissive materials or metals).

Soon we also have realized that using vertex color for component identification wasn't the best choice so we have decided to **split the mesh in 9 components** and load each one independently in the scene. This decomposition reminded us of the idea of creating a command to explode the mesh and inspect any single component in a separate view.

Finally we encounter an issue cause the arc-reactor presents 10 coils and each one is made by a copper wire rolled around a metal structure; for its nature this component cannot (easily) be decomposed in two separated meshes so we decided to set two different `vertex colors` (`red` and `green`) in order to be able to recognize the two parts in the shading process.

> Using some external tools like [ShaderMap](https://shadermap.com/home/) and [Substance Painter](https://www.substance3d.com/) we generate the required textures for the simulation of the copper wire.

<br/>

---
## **Sprint 3** (from May 31st to June 6th) 

Mesh decomposition carries the burden to set up the position of every component manually in the scene; the first idea to manage that was to use a `.csv` 
file where storing initial and final state of each mesh (for state we means `rotation`, `position` and `scale` properties). Initial state represent
the initial pose of the component and final state the final pose 
(once **explosion animation** ends).

Soon we realize that `.csv` was a format too static and uncomfortable 
(also problematic for parameter type specification and character escape) so 
we have converted the `architecture` file in `.json` format and also change the state definition to an arbitrary number of frames (by pure luck this will fit perfectly with the idea behind the `tween.js` animations).

Once the mesh was perfectly recomposed and a simple animation created
we set up a `ray caster` on the scene to select any component.

Finally we have studied a way to integrate the scene in a web page and soon we understood that the best way (accordingly with the [THREE.js example section](https://threejs.org/examples/)) was to separate the code of the site and the code of the scene in different `html` views and integrate them using an `<iframe>` tag.

<br/>

---
## **Sprint 4** (from June 7th to June 13th) 

In this sprint we have implemented a **switch** in order to **change scene** once a component was inspected. The main problem here was to solve **event overlap** 
of the hidden scene on the displayed one (`orbit control`, `ray casting`, etc.).

```{js}
if(!switchScene)
	return raycaster.intersectObject( group, true );
else
	return raycaster.intersectObject( inspectorScene, true );
```
*The easyest solution was to switch the event target of the raycaster to the current displayed mesh group (with a global boolean variable called `switchScene`)*

Moreover we realize that every self-respecting website must have an **high responsiveness** and can be used on smartphone, tablets and huge screens interchangebly. So we focus on a **fluid layout** of the web site using some famous libraries:
* **[Bootstrap 4](https://getbootstrap.com/docs/4.3/layout/overview/)** for its grid system and css classes for the main interactive components (buttons, modals, toast, navbar, tables, tooltips, etc.)
* **[Font Awesome](https://fontawesome.com/)** mainly for icons
* **[Slick Nav](https://slicknav.io/)** for the creation of the mobile navbar
* **[JQuery](https://api.jquery.com/id-selector/)** for a fast retrieval of the `html` components/tags

Finally we have **updated some meshes** cause, when inspected, they didn't look well 
(some open faces in particular).

<br/>

---
## **Sprint 5** (from June 14th to June 17th) 

In this last sprint **we have implemented our own shaders** taking inspiration by **microfacet model** studied in the course (avioding to consider the diffuse component since we use only metals).

Moreover we change our first idea for material selection form a static **control pannel** to 
a **new scene with some cubes each one dressed with a different material**; this way seems more beautiful aesthetically and also more user friendly. 

Initially we thought to add directly to the inspector scene the cubes but was really hard to 
maintain the cubes in the same position (contrasting camera translation, rotation and zooming). 
So the winning idea was to implement a **new scene** and 
**superimpose it on the inspector scene** with an `<iframe>`. 
Using a sort of event paradigm we were able to **exchange events with the two scenes** and also to bind the camera rotation of the inspector scene with the cubes rotation.

A huge code refactoring was needed and we find a trick to save on a `.glsl` file the 
shaders definitions and load them safely in an asyncronous way. 

Finally with a `ray casting` we bind the box selection action with the material update of the inspected component.

> Since now the **scene background was black** but this was a little unreal cause smooth materials reflected environment map images of things not presented in the scene. We have 
decided to use the **environment map** as scene background. 

> We see that our animations are really bad implemented from the code style point of view so we decide to integrate [tween.js](https://github.com/tweenjs/tween.js/) to manage animations with great results.

<br/>

---
## **Last day**

As in every real agile development the last day is used for **code refactoring/documentation** and think about the entire process (things well done and those go wrong).