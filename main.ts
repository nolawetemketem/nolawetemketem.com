import * as THREE from 'three';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCXFGM0cBCxtlWi-FRPpIjaPv8Y7kM5fOc",
//   authDomain: "nolawetemketem-d1765.firebaseapp.com",
//   databaseURL: "https://nolawetemketem-d1765-default-rtdb.firebaseio.com",
//   projectId: "nolawetemketem-d1765",
//   storageBucket: "nolawetemketem-d1765.firebasestorage.app",
//   messagingSenderId: "1015309488484",
//   appId: "1:1015309488484:web:97bbf7b69e7c5ee0072a71",
//   measurementId: "G-0GKFP35NBB"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

var src: string;

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

if (window.location.pathname === "/" || window.location.pathname.endsWith("index.html")) {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("DOMContentLoaded");
        // setScene();

        const mediaScroller = document.querySelector(".fade-in");
        if (mediaScroller && !sessionStorage.getItem("hasAnimated")) {
            // Add the class to trigger the animation
            mediaScroller.classList.add("fade-in");
            // Set storage flag so it won't fire again this session
            sessionStorage.setItem("hasAnimated", "true");
        }
      
        const mediaElements = document.getElementsByClassName("media-element");
        for (var mediaElement of mediaElements) {
           
            var mediaElementAsImage = (mediaElement as HTMLImageElement);
            mediaElementAsImage.style.viewTransitionName = ``;
            mediaElementAsImage.onclick = function() {

                (this as HTMLImageElement).style.viewTransitionName = `media-content`;
                var src = (this as HTMLImageElement).src;
                console.log(`card's src: ${src}`);
                var match = src.match(/\/assets\/projects\/(.*)\.([a-z])*/);

                if (match && match[1]) {
                    // console.log(`match[0]: ${match[0]}`);
                    // console.log(`match[1]: ${match[1]}`);
                    window.location.assign(`/about?v=${match[1]}`);
                } else {
                    window.location.assign(`/about?v=/assets/icons/kebero.svg`);
                }
            };
        }
        // const startBtn = (document.getElementById("start-btn") as HTMLButtonElement);
        // const toggleMuteBtn = (document.getElementById("toggle-mute-btn") as HTMLButtonElement);
        // const audioPlayer = (document.getElementById("audio-player") as HTMLAudioElement);
        // toggleMuteBtn.onclick = function() { 
        //     console.log("OnClick");
        //     audioPlayer.muted = !audioPlayer.muted;
        //     /* animate mute and unmuted states */
        // };
        //
        // startBtn.onclick = function() {
        //     audioPlayer.play();
        // }
    });
      document.addEventListener("animationstart", function() {
        const mediaElements = document.getElementsByClassName("media-element");
        for (var mediaElement of mediaElements) {
            var mediaElementAsImage = (mediaElement as HTMLImageElement);
            mediaElementAsImage.style.viewTransitionName = ``;
        }
    });
}

if (window.location.pathname.endsWith("about")) {
    document.addEventListener("DOMContentLoaded", () => {
        // document.getElementsByName("")
        // var html = document.getElementById("html");
        // if (html) html.style.backgroundColor = "";
        // console.log(`html: ${html}`);
        var params : URLSearchParams = new URLSearchParams(window.location.search);
        var media = params.get('v');
        // console.log(`media: ${media}`);
        
        if (media && params) {
            var viewport : HTMLVideoElement = (document.getElementById("video-player") as HTMLVideoElement);
            //  console.log(`viewport: ${viewport}`);

            if (viewport && viewport.src) {
                if (media == "adventuretime" || media == "octavia" ) {
                    viewport.src = `assets/projects/${media}.mov`;
                } else {
                    viewport.src = `assets/projects/${media}.mp4`;
                }

            //  console.log(`viewport.src: ${viewport.src}`);
                viewport.onclick = function goFullscreen() {
                    // Target the video element
                    // Use the standard requestFullscreen method
                    if (viewport.requestFullscreen) {
                        viewport.requestFullscreen();
                    } 
                }
            }
        }
        const backBtn = document.getElementById("back-btn");
        if (backBtn) {
            backBtn.onclick = function() {
                // history.back();
                window.location.assign(`/`);
                // console.log("Navigating back to index");
            };
        }
    });
}

console.log("EOF");