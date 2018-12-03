import React, { Component } from "react";
import * as THREE from "three";
import Cube from "./helpers/Cube";

class Scene extends Component {
  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);

    // Cubes
    let i = 0;
    while (i < 3) {
      const cube = this.cubes[i];
      const freq = this.analyser.getFrequencyData()[i + 2];
      if (cube) {
        cube.position.y = freq / 50;
        cube.rotation.x += freq / 3000;
        cube.rotation.y += freq / 3000;
        cube.rotation.z += freq / 3000;
      }

      i++;
    }
  };

  componentDidMount() {
    // Viewport Dimensions
    this.width = this.mount.clientWidth;
    this.height = this.mount.clientHeight;

    // Setup
    this.setup();

    // Scene
    this.camera.position.z = 4;
    this.camera.position.x = 2;
    this.camera.position.y = 2.5;
    this.renderer.setClearColor("#000000");
    this.renderer.setSize(this.width, this.height);

    // Mount scene
    this.mount.appendChild(this.renderer.domElement);
    this.start();

    // Add cubes to scene
    this.cubes = this.createCubes(this.scene);

    // Make cube bounce to music
    this.analyzeAudio();
  }

  createCubes = scene => {
    const cubes = [];
    // Create cubes
    let i = 0;
    while (i < 3) {
      const cubeInstance = new Cube();
      const cube = cubeInstance.create();
      scene.add(cube);
      cube.position.x = i * 2;
      cubes.push(cube);
      i++;
    }

    return cubes;
  };

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    return (
      <div
        style={{ width: "100vw", height: "100vh" }}
        ref={mount => (this.mount = mount)}
      />
    );
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  setup = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  };

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  analyzeAudio = () => {
    // create an AudioListener and add it to the camera
    var listener = new THREE.AudioListener();
    this.camera.add(listener);

    // create an Audio source
    var sound = new THREE.Audio(listener);

    // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load(
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3",
      function(buffer) {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.5);
        sound.play();
      }
    );

    // create an AudioAnalyser, passing in the sound and desired fftSize
    this.analyser = new THREE.AudioAnalyser(sound, 32);
  };
}

export default Scene;
