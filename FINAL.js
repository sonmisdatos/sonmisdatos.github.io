var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
//Variables Afiches (2)
var markersuperior; 
var markerlado1;
var markerlado2;
var markerlado3;
var markerlado4;
var mesh1;
//Variables Ojo (1)
var markerOjo;
var mesh2;
//Variables Info (3)
var markerInfo;
var mesh;
var loaderFont= new THREE.FontLoader();
//Variables Avatar (4)
var mesh3, mesh4;
var markerAvatar;
var RhinoMesh, RhinoMesh2;
//Variables Video (5)
let markerVideo;
let mesh5;
//VAriables interacción
let marker1, marker2; //marcadores
let mesh6, mesh7, mesh8, mesh9, mesh10, mesh11, mesh12; //meshes que van a aparecer al visualizar el marcador 

let raycaster; //permite apuntar o detectar objetos en nuestra aplicacion  

let mouse = new THREE.Vector2();

let INTERSECTED; //guarda info sobre los objetos intersectados por mi raycast

let objects = []; //guarda los objetos que quiero detectar

var sprite1; //variable para el label
var canvas1, context1, texture8; // variables para creacion del label


loaderFont.load('./data/gentilis_bold.typeface.json', function(font){
    
    init(font);
    animate();

});

function main() {

}

function init(font) {

	///////CREACION DE UNA ESCENA///////////////////
	scene = new THREE.Scene();

	let light = new THREE.PointLight(0xffffff, 1, 100); //creo nueva luz 
	light.position.set(0, 4, 4); //indico la posicion de la luz 
	light.castShadow = true; //activo la capacidad de generar sombras.
    light.shadow.mapSize.width = 4096; //resolucion mapa de sombras ancho 
    light.shadow.mapSize.height = 4096;// resolucion mapa de sombras alto	
	scene.add(light); //agrego la luz a mi escena    

	///////CREACION DE UNA LUCES///////////////////
	let lightSphere = new THREE.Mesh(
		new THREE.SphereGeometry(0.1),
		new THREE.MeshBasicMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.8
		})
	);

	lightSphere.position.copy(light);
	scene.add(lightSphere);

	///////CREACION DE UNA CAMARA///////////////////
	camera = new THREE.Camera();
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

	scene.add(camera);

	//raycaster
	raycaster = new THREE.Raycaster();



	///////CREACION DEL RENDERER///////////////////
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});

	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize(1920, 1080);
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.body.appendChild(renderer.domElement);

	///////CREACION DE UN COUNTER///////////////////
	clock = new THREE.Clock();
	deltaTime = 0;
	totalTime = 0;

	////////////////////////////////////////////////////////////
	// setup arToolkitSource
	////////////////////////////////////////////////////////////

	arToolkitSource = new THREEx.ArToolkitSource({
		sourceType: 'webcam',
	});

	function onResize() {
		arToolkitSource.onResize()
		arToolkitSource.copySizeTo(renderer.domElement)
		if (arToolkitContext.arController !== null) {
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
		}
	}

	arToolkitSource.init(function onReady() {
		onResize()
	});

	// handle resize event
	window.addEventListener('resize', function () {
		onResize()
	});

	////////////////////////////////////////////////////////////
	// setup arToolkitContext
	////////////////////////////////////////////////////////////	

	// create atToolkitContext
	arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: 'data/camera_para.dat',
		detectionMode: 'mono'
	});

	// copy projection matrix to camera when initialization complete
	arToolkitContext.init(function onCompleted() {
		camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
	});

	////////////////////////////////////////////////////////////
	// setup markerRoots
	////////////////////////////////////////////////////////////

	// MARKERS AFICHES //
	markersuperior = new THREE.Group();
	markersuperior.name = 'marker1';
	scene.add(markersuperior);
	let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, markersuperior, {
		type: 'pattern',
		patternUrl: "data/pattern-marcadores_2.patt",
	})

	markerlado1 = new THREE.Group();
	markerlado1.name = 'marker1';
	scene.add(markerlado1);
	let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, markerlado1, {
		type: 'pattern',
		patternUrl: "data/pattern-marcadores_3.patt",
	})

	markerlado2 = new THREE.Group();
	markerlado2.name = 'marker1';
	scene.add(markerlado2);
	let markerControls3 = new THREEx.ArMarkerControls(arToolkitContext, markerlado2, {
		type: 'pattern',
		patternUrl: "data/pattern-marcadores_4.patt",
	})

	markerlado3 = new THREE.Group();
	markerlado3.name = 'marker1';
	scene.add(markerlado3);
	let markerControls4 = new THREEx.ArMarkerControls(arToolkitContext, markerlado3, {
		type: 'pattern',
		patternUrl: "data/pattern-marcadores_5.patt",
	})

	markerlado4 = new THREE.Group();
	markerlado4.name = 'marker1';
	scene.add(markerlado4);
	let markerControls5 = new THREEx.ArMarkerControls(arToolkitContext, markerlado4, {
		type: 'pattern',
		patternUrl: "data/pattern-marcadores_6.patt",
	})

	// MARKER OJO //
	markerOjo = new THREE.Group();
	markerOjo.name = 'marker1';
	scene.add(markerOjo);
	let markerControls6 = new THREEx.ArMarkerControls(arToolkitContext, markerOjo, {
		type: 'pattern',
		patternUrl: "data/pattern-marcadores_1.patt",
	})

	// MARKER INFO //
	markerInfo = new THREE.Group();
    markerInfo.name = 'marker1';
    scene.add(markerInfo);
    let markerControls7 = new THREEx.ArMarkerControls(arToolkitContext, markerInfo,{
        type: 'pattern',
        patternUrl: "data/pattern-marcadores_7.patt"
    })

	// MARKER AVATAR //
    markerAvatar = new THREE.Group(); 
    scene.add(markerAvatar);  
    let markerControl = new THREEx.ArMarkerControls(arToolkitContext, markerAvatar, {
		type: 'pattern', 
		patternUrl: 'data/pattern-marcadores_8.patt',
	});
	
	// MARKER VIDEO //
    markerVideo = new THREE.Group();
    scene.add(markerVideo); 
    let markerControls8 = new THREEx.ArMarkerControls(arToolkitContext, markerVideo, {
        type: 'pattern',
        patternUrl: "data/pattern-marcadores_9.patt",
	})   
	
	//Marcador 2
    marker2 = new THREE.Group();
    marker2.name = 'marker2';
    scene.add(marker2); //agregamos el marcador a la escena 

    let markerControls9 = new THREEx.ArMarkerControls(arToolkitContext, marker2, {
        type: 'pattern',
        patternUrl: "data/pattern-marcadores-10.patt",
    })

	//01- CREACION CAJA OJOOOOOOOOOOOOO
	let geo1 = new THREE.BoxGeometry(1, 1, 1); //geometria box. 
	let loader = new THREE.TextureLoader(); //objeto que me permite cargar una imagen
	let texture1 = loader.load('./images/bigdata.jpg'); //cargo la imagen desde la carpeta Images
	let material1 = new THREE.MeshLambertMaterial(
		{
			transparent: true,
			map: texture1,
			side: THREE.BackSide
		}
	);  // crea un material que muestra las caras interiores de un objeto.  
	
	mesh2 = new THREE.Mesh(geo1, material1); //creo un nuevo mesh
	mesh2.position.y = -.5;
	markerOjo.add(mesh2); //agrego el mesh al marcador y a la escena

	//02- CREACION GEOMETRIA MASCARA
	let geoMask =new THREE.BoxGeometry(1, 1, 1);
	console.log(geoMask.faces);
	geoMask.faces.splice(4,2);

	let material2 = new THREE.MeshBasicMaterial(
		{
			colorWrite: false
		}
	)

	let meshMask= new THREE.Mesh(geoMask, material2);
	meshMask.scale.set(1,1,1).multiplyScalar(1.015);
	meshMask.position.y= -0.5;
	markersuperior.add(meshMask);
	markerOjo.add(meshMask);

	//Geometria Dentro de la caja OJOOOOOOOO
	let geoEsfera = new THREE.SphereGeometry(.25, 16, 16);
	let texture2 = loader.load('./images/ojos.png'); //cargo la imagen desde la carpeta Images	 
	let material3 = new THREE.MeshLambertMaterial(
		{
	 		map: texture2,
	 		side: THREE.DoubleSide
	 	}
	 );  // crea un material que muestra las caras interiores de un objeto. 
	let meshEsfera = new THREE.Mesh(geoEsfera, material3);
	meshEsfera.position.y = -.5;
	meshEsfera.rotateY(-Math.PI/2);
	meshEsfera.rotateZ(Math.PI/2);
	markerOjo.add(meshEsfera);

	//////// IMAGENES AFICHEEES //////////

	////CARGAR IMAGEN SUPERIOR
	let geoPlane = new THREE.PlaneBufferGeometry(1,1,4,4);
	let loader2 = new THREE.TextureLoader();
	let texture3 = loader2.load('./images/fb-superior.png')
	let material4 = new THREE.MeshBasicMaterial({map:texture3});

	let meshImage = new THREE.Mesh(geoPlane, material4);
	meshImage.rotation.x = -Math.PI / 2;
	markersuperior.add(meshImage);

	////CARGAR IMAGEN LADO 1
	let geoPlane1 = new THREE.PlaneBufferGeometry(1,1,4,4);
	let loader3 = new THREE.TextureLoader();
	let texture4 = loader3.load('./images/fb-1.png')
	let material5 = new THREE.MeshBasicMaterial({map:texture4});

	let meshImage1 = new THREE.Mesh(geoPlane1, material5);
	meshImage1.rotation.x = -Math.PI / 2;
	markerlado1.add(meshImage1);

	////CARGAR IMAGEN LADO 2
	let geoPlane2 = new THREE.PlaneBufferGeometry(1,1,4,4);
	let loader4 = new THREE.TextureLoader();
	let texture5 = loader4.load('./images/fb-2.png')
	let material6 = new THREE.MeshBasicMaterial({map:texture5});

	let meshImage2 = new THREE.Mesh(geoPlane2, material6);
	meshImage2.rotation.x = -Math.PI / 2;
	markerlado2.add(meshImage2);

	////CARGAR IMAGEN LADO 3
	let geoPlane3 = new THREE.PlaneBufferGeometry(1,1,4,4);
	let loader5 = new THREE.TextureLoader();
	let texture6 = loader5.load('./images/fb-3.png')
	let material7 = new THREE.MeshBasicMaterial({map:texture6});

	let meshImage3 = new THREE.Mesh(geoPlane3, material7);
	meshImage3.rotation.x = -Math.PI / 2;
	markerlado3.add(meshImage3);

	////CARGAR IMAGEN LADO 4
	let geoPlane4 = new THREE.PlaneBufferGeometry(1,1,4,4);
	let loader6 = new THREE.TextureLoader();
	let texture7 = loader6.load('./images/fb-4.png')
	let material8 = new THREE.MeshBasicMaterial({map:texture7});

	let meshImage4 = new THREE.Mesh(geoPlane4, material8);
	meshImage4.rotation.x = -Math.PI / 2;
	markerlado4.add(meshImage4);

function AddText(name, location, size, depth){
        let geoText = new THREE.TextBufferGeometry(name,
           {
               font: font,
               size: size,
               height: depth,
               curveSegments:1
           });
   
           let textMaterial= new THREE.MeshLambertMaterial();
           let textMesh= new THREE.Mesh(geoText, textMaterial);
           textMesh.position.copy(location);
           textMesh.rotation.x = -Math.PI / 2;
    
           markerInfo.add(textMesh)
       }
   
       AddText('Nicole Swinburn', new THREE.Vector3(-0.5,3.5,0), 0.45, 0.2);
       AddText('Ing. Comercial', new THREE.Vector3(1,1,3), 0.2, 0.1);
       AddText('Deportista', new THREE.Vector3(-1,2,2), 0.2, 0.1);
       AddText('Av. Las Condes 10523', new THREE.Vector3(1,2,2), 0.2, 0.1);
       AddText('03/01/96', new THREE.Vector3(-1,1,3), 0.2, 0.1);
       AddText('1 hermana', new THREE.Vector3(-3,1,3), 0.2, 0.1);
       AddText('1 pug', new THREE.Vector3(-1.5,3,1), 0.2, 0.1);
       AddText('Banco Santander', new THREE.Vector3(0,3,1), 0.2, 0.1);
       AddText('18.542.962-4', new THREE.Vector3(-3,2,2), 0.2, 0.1);
       AddText('Av. Las Condes 10523', new THREE.Vector3(1,2,2), 0.2, 0.1);
       AddText('Ilustraciones', new THREE.Vector3(3.5,1,3), 0.2, 0.1);
       AddText('UAI', new THREE.Vector3(4,2,2), 0.2, 0.1);
       AddText('iPhone 6', new THREE.Vector3(2.5,3,1), 0.2, 0.1);


    /////////////////////////////////////////////////
    //GEOMETRY
    /////////////////////////////////////////////////

    //Creo una geometria cubo
    let geo3 = new THREE.CubeGeometry(.75, .75, .75); // crear la plantilla
    //creo material 
    let material9 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }); //creamos el material 

    //Creo una geometria 
    let geo4 = new THREE.CubeGeometry(.75, .75, .75); // crear la plantilla
    //creo material 
    let material10 = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }); //creamos el material

    //////////////MESH3//////////////////////////////////////////
    //creo un mesh con la geometria y el material 
    mesh3 = new THREE.Mesh(geo3, material9); //nuestro mesh 
    //CAMBIO LA POSICION DE MI MESH 
    mesh3.position.y = 0.5;
    mesh3.position.z = -0.3;
    //activo el recibir y proyectar sombras en otros meshes
    mesh3.castShadow = true;
    mesh3.receiveShadow = true;

    //////////////MESH4//////////////////////////////////////////
    //creo un mesh con la geometria y el material 
    mesh4 = new THREE.Mesh(geo4, material10); //nuestro mesh 
    //CAMBIO LA POSICION DE MI MESH 
    mesh4.position.x = 0.75;
    mesh4.position.y = 1.0;
    //activo el recibir y proyectar sombras en otros meshes
    mesh4.castShadow = true;
    mesh4.receiveShadow = true;

    ////////////////////PISO////////////////
    let floorGeometry = new THREE.PlaneGeometry(20, 20);
    let floorMaterial = new THREE.ShadowMaterial();
    floorMaterial.opacity = 0.25;

    let floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);

    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    markerAvatar.add(floorMesh);


    /////// OBJ IMPORT/////////////////////
    function onProgress(xhr) { console.log((xhr.loaded / xhr.total * 100) + "% loaded"); }
    function onError(xhr) { console.log("ha ocurrido un error") };

    //////OBJETO RHINO 1///////////////
    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('cuerpo.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('data/models/')
                .load('cuerpo.obj', function (group) {
                    RhinoMesh = group.children[0];
                    RhinoMesh.material.side = THREE.DoubleSide;
                    RhinoMesh.scale.set(0.04, 0.04, 0.04);
                    RhinoMesh.castShadow = true;
                    RhinoMesh.receiveShadow = true;

                    markerAvatar.add(RhinoMesh);
                }, onProgress, onError);
        });

    //////OBJETO RHINO 2///////////////
    new THREE.MTLLoader()
        .setPath('data/models/')
        .load('boletas.mtl', function (materials) {
            materials.preload();
            new THREE.OBJLoader()
                .setMaterials(materials)
                .setPath('data/models/')
                .load('boletas.obj', function (group) {
                    RhinoMesh2 = group.children[0];
                    RhinoMesh2.material.side = THREE.DoubleSide;
                    RhinoMesh2.scale.set(0.04, 0.04, 0.04);
                    RhinoMesh2.castShadow = true;
                    RhinoMesh2.receiveShadow = true;

                    markerAvatar.add(RhinoMesh2);
                }, onProgress, onError);
        });

    //////OBJETO RHINO 3///////////////
    new THREE.MTLLoader()
    .setPath('data/models/')
    .load('caja.mtl', function (materials) {
        materials.preload();
        new THREE.OBJLoader()
            .setMaterials(materials)
            .setPath('data/models/')
            .load('caja.obj', function (group) {
                RhinoMesh2 = group.children[0];
                RhinoMesh2.material.side = THREE.DoubleSide;
                RhinoMesh2.scale.set(0.04, 0.04, 0.04);
                RhinoMesh2.castShadow = true;
                RhinoMesh2.receiveShadow = true;

                markerAvatar.add(RhinoMesh2);
            }, onProgress, onError);
    });

     //////OBJETO RHINO 4///////////////
     new THREE.MTLLoader()
     .setPath('data/models/')
     .load('pantalla.mtl', function (materials) {
         materials.preload();
         new THREE.OBJLoader()
             .setMaterials(materials)
             .setPath('data/models/')
             .load('pantalla.obj', function (group) {
                 RhinoMesh2 = group.children[0];
                 RhinoMesh2.material.side = THREE.DoubleSide;
                 RhinoMesh2.scale.set(0.04, 0.04, 0.04);
                 RhinoMesh2.castShadow = true;
                 RhinoMesh2.receiveShadow = true;

                 markerAvatar.add(RhinoMesh2);
             }, onProgress, onError);
     });
 

     //////OBJETO RHINO 7///////////////
     new THREE.MTLLoader()
     .setPath('data/models/')
     .load('eye2.mtl', function (materials) {
         materials.preload();
         new THREE.OBJLoader()
             .setMaterials(materials)
             .setPath('data/models/')
             .load('eye2.obj', function (group) {
                 RhinoMesh2 = group.children[0];
                 RhinoMesh2.material.side = THREE.DoubleSide;
                 RhinoMesh2.scale.set(0.04, 0.04, 0.04);
                 RhinoMesh2.castShadow = true;
                 RhinoMesh2.receiveShadow = true;

                 markerAvatar.add(RhinoMesh2);
             }, onProgress, onError);
     });

	     //////CREACION VIDEO///////////////
		 let geoVideo = new THREE.PlaneBufferGeometry(2,2,4,4); //molde geometria

		 let video =  document.getElementById('video');
		
		 let texture =  new THREE.VideoTexture(video);
		 texture.minFilter = THREE.LinearFilter;
		 texture.magFilter= THREE.LinearFilter;
		 texture.format =  THREE.RGBFormat;
	 
		 let material11 = new THREE.MeshBasicMaterial(
			 {
	 
				 map:texture
		 }
		 );
	 
		 mesh5 = new THREE.Mesh(geoVideo, material11);
		 mesh5.rotation.x = -Math.PI/2;
	 
		 markerVideo.add(mesh5);

    ////////////GEOMETRIAS INTERACCION////////////////////////

    //paso 1 - creo geometria 
    let box = new THREE.CubeGeometry(.5, .5, .5); //plantilla para crear geometrias cubo

    //Paso 2 - creo materiales
    //material 1
    let matBox01 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );

    //material 2
    let matBox02 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );

    let matBox03 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );

    let matBox04 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );

    let matBox05 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );

    let matBox06 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );

    let matBox07 = new THREE.MeshLambertMaterial(
        {
            color: Math.random() * 0xffffff,
            side: THREE.DoubleSide
        }
    );


    //paso 3 - Creo Meshes

    //mesh6
    mesh6 = new THREE.Mesh(box, matBox01);
    mesh6.position.y = 0.5;
    mesh6.name = 'El producto eres tú'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh7
    mesh7 = new THREE.Mesh(box, matBox02);
    mesh7.position.y = 2;
    mesh7.position.x = -1.5;
    mesh7.position.z = -2;
    //mesh7.position.x = -.6;
    mesh7.name = 'Data rights are human rights'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh8
    mesh8 = new THREE.Mesh(box, matBox03);
    mesh8.position.y = 1.5;
    mesh8.position.x = 0.5;
    mesh8.position.z = -1;
    //mesh8.position.x = -.6;
    mesh8.name = 'Nuestra dignidad peligra'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh9
    mesh9 = new THREE.Mesh(box, matBox04);
    mesh9.position.y = 2;
    mesh9.position.x = 1.5;
    mesh9.position.z = -1.5;
    //mesh9.position.x = -.6;
    mesh9.name = 'Los datos no se esfuman'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh10
    mesh10 = new THREE.Mesh(box, matBox05);
    mesh10.position.y = 2.5;
    mesh10.position.x = 1.5;
    mesh10.position.z = 2;
    //mesh10.position.x = -.6;
    mesh10.name = 'El impuesto son tus datos'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh11
    mesh11 = new THREE.Mesh(box, matBox06);
    mesh11.position.y = 3;
    mesh11.position.x = -1;
    mesh11.position.z = 1;
    //mesh11.position.x = -.6;
    mesh11.name = 'Tus datos son valiosos'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh12
    mesh12 = new THREE.Mesh(box, matBox07);
    mesh12.position.y = 4;
    mesh12.position.x = 1;
    mesh12.position.z = -1;
    //mesh12.position.x = -.6;
    mesh12.name = 'Exige tus derechos digitales'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    /////////CREACION ELEMENTOS TEXTO//////////////////////
    //CREACION DE CANVAS 
    canvas1 = document.createElement('canvas');
    context1 = canvas1.getContext('2d');
    context1.font = "Bold 14px Arial";
    context1.fillStyle = "rgba(0,0,0,0.95)";
    context1.fillText('Hello', 0, 1);

    //los contenidos del canvas seran usados como textura 
    texture8 = new THREE.Texture(canvas1);
    texture8.needsUpdate = true;


    //creacion del sprite
    var spriteMaterial = new THREE.SpriteMaterial(
        {
            map: texture8
        }
    )
    sprite1 = new THREE.Sprite(spriteMaterial);
    sprite1.scale.set(1.5, 1.5, 1.5);
    //sprite1.position.set(5, 5, 0);

    ////////////AGREGAMOS OBJETOS A ESCeNA Y ARRAY OBJECTS


    //Agregamos objetos a detectar a nuestro array objects
    objects.push(mesh6);
    objects.push(mesh7);
    objects.push(mesh8);
    objects.push(mesh9);
    objects.push(mesh10);
    objects.push(mesh11);
    objects.push(mesh12);
    //agregamos nuestros objetos a la escena mediante el objeto marker1
    marker2.add(sprite1);
    marker2.add(mesh6);
    marker2.add(mesh7);
    marker2.add(mesh8);
    marker2.add(mesh9);
    marker2.add(mesh10);
    marker2.add(mesh11);
    marker2.add(mesh12);
    //////////EVENT LISTERNERS/////////////////////////////////
    document.addEventListener('mousemove', onDocumentMouseMove, false);// detecta movimiento del mouse


}

function onDocumentMouseMove(event) {
    event.preventDefault();
    sprite1.position.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1, 0);
    sprite1.renderOrder = 999;
    sprite1.onBeforeRender = function (renderer) { renderer.clearDepth(); }

    mouse.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1); //mouse pos

    raycaster.setFromCamera(mouse, camera); //creo el rayo que va desde la camara , pasa por el frustrum 
    let intersects = raycaster.intersectObjects(objects, true); //buscamos las intersecciones

    if (intersects.length > 0) {
        if (intersects[0].object != INTERSECTED) {
            if (INTERSECTED) {
                INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
            }
            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            INTERSECTED.material.color.setHex(0xffff00);

            if (INTERSECTED.name) {
                context1.clearRect(0, 0, 10, 10);
                let message = INTERSECTED.name;
                let metrics = context1.measureText(message);
                let width = metrics.width;
                context1.fillStyle = "rgba(0,0,0,0.95)"; // black border
                context1.fillRect(0, 0, width + 8, 20 + 8);
                context1.fillStyle = "rgba(255,255,255,0.95)"; // white filler
                context1.fillRect(2, 2, width + 4, 20 + 4);
                context1.fillStyle = "rgba(0,0,0,1)"; // text color
                context1.fillText(message, 5, 20);
                texture8.needsUpdate = true;
            }
            else {
                context1.clearRect(0, 0, 10, 10);
                texture8.needsUpdate = true;
            }
        }

    }
    //si no encuentra intersecciones
    else {
        if (INTERSECTED) {
            INTERSECTED.material.color.setHex(INTERSECTED.currentHex); //devolviendo el color original al objeto            
        }
        INTERSECTED = null;
        context1.clearRect(0, 0, 300, 300);
        texture8.needsUpdate = true;
    }
}


///////automatico///////////////////////

function update() {
	// update artoolkit on every frame
	if (arToolkitSource.ready !== false)
		arToolkitContext.update(arToolkitSource.domElement);
}


function render() {
	renderer.render(scene, camera);
}


function animate() {
    requestAnimationFrame(animate);
    deltaTime = clock.getDelta();
    totalTime += deltaTime;
    render();
    update();
    video.play();
}

function playVideo(){
	let video = document.getElementById('video');
	video.play();
}
