import * as THREE from 'three';


function setScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );

    scene.add( cube );
    camera.position.z = 5;

    var lightmode = 0xefefef, darkmode = 0x323232;
    var isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    renderer.setClearColor( (isDarkMode) ? darkmode : lightmode , 1 );

    function animate( time: any ) {
        var currScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if ( isDarkMode != currScheme ) {
            isDarkMode = currScheme;
            renderer.setClearColor( (isDarkMode) ? darkmode : lightmode , 1 );
        }
        cube.rotation.x = time / 4000;
        cube.rotation.y = time / 2000;
        renderer.render( scene, camera );
    }

    renderer.setAnimationLoop( animate );

    window.addEventListener('resize', () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio(window.devicePixelRatio);

        console.log("window resize");
    })
}

if (document.documentElement.id === 'home') {
    setScene();
}