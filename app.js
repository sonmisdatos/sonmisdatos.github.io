//variables globales
let scene, camera, renderer, clock, deltaTime, totalTime; //variables de mi escena THREE
let arToolkitSource, arToolkitContext; //objetos que permiten ejecutar todo lo referente a AR
let marker1, marker2; //marcadores
let mesh6, mesh7, mesh8, mesh9, mesh10, mesh11, mesh12; //meshes que van a aparecer al visualizar el marcador 

let raycaster; //permite apuntar o detectar objetos en nuestra aplicacion  

let mouse = new THREE.Vector2();

let INTERSECTED; //guarda info sobre los objetos intersectados por mi raycast

let objects = []; //guarda los objetos que quiero detectar

var sprite1; //variable para el label
var canvas1, context1, texture8; // variables para creacion del label



///////////////FUNCIONES////////////////////////////
//funcion principal 
function main() {
    init();
    animate();
}

//ejecutamos la app llamando a main 
main(); //llamado a la funcion main 

function init() {
    ///////CREACION DE UNA ESCENA///////////////////
    scene = new THREE.Scene();
    // mouse = new THREE.Vector2();

    ///////CREACION DE UNA CAMARA///////////////////
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
    //agrego la camara a mi escena 
    scene.add(camera);

    //raycaster
    raycaster = new THREE.Raycaster();

    ///////CREACION LUCES///////////////////
    let lightSphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.1),
        new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        })
    );

0
    //luz principal
    let light = new THREE.PointLight(0xffffff, 1, 100); //creo nueva luz 
    light.position.set(0, 4, 4); //indico la posicion de la luz 
    light.castShadow = true; //activo la capacidad de generar sombras.
    light.shadow.mapSize.width = 4096; //resolucion mapa de sombras ancho 
    light.shadow.mapSize.height = 4096;// resolucion mapa de sombras alto


    lightSphere.position.copy(light);


    //agrego objetos luz a mi escena 
    scene.add(light);
    scene.add(lightSphere);

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


    //Marcador 2
    marker2 = new THREE.Group();
    marker2.name = 'marker2';
    scene.add(marker2); //agregamos el marcador a la escena 

    let markerControls2 = new THREEx.ArMarkerControls(arToolkitContext, marker2, {
        type: 'pattern',
        patternUrl: "data/pattern-marcadores-10.patt",
    })

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
    mesh7.position.y = 1;
    mesh7.position.x = 1.5;
    mesh7.position.z = -0.5;
    //mesh7.position.x = -.6;
    mesh7.name = 'Data rights are human rights'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh8
    mesh8 = new THREE.Mesh(box, matBox03);
    mesh8.position.y = 1.5;
    mesh8.position.x = -0.5;
    mesh8.position.z = 1;
    //mesh8.position.x = -.6;
    mesh8.name = 'Nuestra dignidad peligra'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh9
    mesh9 = new THREE.Mesh(box, matBox04);
    mesh9.position.y = 2;
    mesh9.position.x = -1.5;
    mesh9.position.z = -1.5;
    //mesh9.position.x = -.6;
    mesh9.name = 'Los datos no se esfuman'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh10
    mesh10 = new THREE.Mesh(box, matBox05);
    mesh10.position.y = 2.5;
    mesh10.position.x = 1.5;
    mesh10.position.z = -1;
    //mesh10.position.x = -.6;
    mesh10.name = 'El impuesto son tus datos'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh11
    mesh11 = new THREE.Mesh(box, matBox06);
    mesh11.position.y = 3;
    mesh11.position.x = -1;
    mesh11.position.z = 0.5;
    //mesh11.position.x = -.6;
    mesh11.name = 'Tus datos son valiosos'; //mensaje a mostrar cuando indicamos el mesh con nuestro mouse

    //mesh12
    mesh12 = new THREE.Mesh(box, matBox07);
    mesh12.position.y = 3;
    mesh12.position.x = 0.5;
    mesh12.position.z = -0.5;
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

//////////////FUNCIONES//////////////////////////////////

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
}