/*
* Inspector management script
*
* author = 'Marco Iuri, Edoardo Lenzi'
* version = '1.0'
* license = 'GPL-3.0'
*/


var inspectedObject;


/*
* Init inspector scene
*/
function Trigger( component ){
    
    //Empty old inspector scene
    EmptyInspScene();

    //Load component and create inspector scene
    inspectedObject = component.clone();
    inspectedObject.position.set( 0, 0, 0 );
    inspectedObject.scale.set( inspectedObject.parameters.inspectorScale, inspectedObject.parameters.inspectorScale, inspectedObject.parameters.inspectorScale );
    inspectedObject.rotation.set( 0, 0, 0 );
    
    //Create new inspector scene
    var elements = new Array( skyMesh, inspectorHemiLight, inspectorDirectLight, inspectedObject );
    CreateInspScene( elements );

    //Switch Scene
    switchScene = true;

    //Create close inspector button
    ApplyTemplate( '../inspector/inspector.html' );
    BindEvent( window, 'mousemove', SendRotation );
    BindEvent( document, 'touchmove', SendRotation );
}


/*
* Clean old scene
*/
function EmptyInspScene()
{
    inspectorScene.children.forEach( child => {
        inspectorScene.remove( child );
    });
}


/*
* Setup inspector scene
*/
function CreateInspScene( elements )
{
	elements.forEach( element => {
        inspectorScene.add( element );
    });
}


/*
* Apply to the mesh the material with index materialIndex (defined in the materialVector)
*/
function ChangeMaterial( mesh, materialIndex ){
    mesh.material = materialVector[ materialIndex ];
    mesh.parameters.materials[ mesh.parameters.materials.indexOf( materialIndex ) ] = mesh.parameters.materials[ 0 ];
    mesh.parameters.materials[ 0 ] = materialIndex; 
    mesh.material.needsUpdate = true;
}


/*
* Update every mesh with the same url parameter of the inspected one, 
* applying the material indexed with materialIndex
*/
function UpdateSceneMaterials( materialIndex ){
    ChangeMaterial( inspectedObject, materialIndex );
    group.children.forEach(function( child ){
        if( child instanceof AnimatedMesh && child.parameters.url == inspectedObject.parameters.url ){
            ChangeMaterial( child, materialIndex );
        } else if( child instanceof AnimatedGroup && child.children[ 0 ].parameters.url == inspectedObject.parameters.url ){
            child.children.forEach(function( c ){
                ChangeMaterial( c, materialIndex );
            })
        }
    })   
}