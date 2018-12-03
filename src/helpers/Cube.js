import * as THREE from "three";

class Cube {
  create() {
    const geometry = new THREE.BoxGeometry(0, 0, 0);
    const material = new THREE.MeshBasicMaterial({ color: "#00ff00" });
    const cube = new THREE.Mesh(geometry, material);

    return cube;
  }
}

export default Cube;
