<template>
  <div id="info" />
</template>

<script>
import * as THREE from 'three'
import { StereoEffect } from 'three/examples/jsm/effects/StereoEffect'
export default {
  name: 'Cube',
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let container, camera, scene, renderer, effect

      const spheres = []

      let mouseX = 0; let mouseY = 0

      let windowHalfX = window.innerWidth / 2
      let windowHalfY = window.innerHeight / 2

      document.addEventListener('mousemove', onDocumentMouseMove)

      init()
      animate()

      function init() {
        const main = document.getElementById('info')
        container = document.createElement('div')
        document.body.appendChild(container)
        main.appendChild(container)
        camera = new THREE.PerspectiveCamera(60, 1200 / 600, 1, 100000)
        camera.position.z = 3200

        scene = new THREE.Scene()
        scene.background = new THREE.CubeTextureLoader()
          .setPath(`${process.env.BASE_URL}images/`)
          .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

        const geometry = new THREE.SphereGeometry(100, 32, 16)

        const textureCube = new THREE.CubeTextureLoader()
          .setPath(`${process.env.BASE_URL}images/`)
          .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
        textureCube.mapping = THREE.CubeRefractionMapping
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube, refractionRatio: 0.95 })

        for (let i = 0; i < 500; i++) {
          const mesh = new THREE.Mesh(geometry, material)
          mesh.position.x = Math.random() * 10000 - 5000
          mesh.position.y = Math.random() * 10000 - 5000
          mesh.position.z = Math.random() * 10000 - 5000
          mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 3 + 1
          scene.add(mesh)

          spheres.push(mesh)
        }

        //

        renderer = new THREE.WebGLRenderer()
        renderer.setPixelRatio(window.devicePixelRatio)
        container.appendChild(renderer.domElement)

        effect = new StereoEffect(renderer)
        effect.setSize(1300, 620)

        //

        window.addEventListener('resize', onWindowResize)
      }

      function onWindowResize() {
        windowHalfX = window.innerWidth / 2
        windowHalfY = window.innerHeight / 2

        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()

        effect.setSize(window.innerWidth, window.innerHeight)
      }

      function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 10
        mouseY = (event.clientY - windowHalfY) * 10
      }

      //

      function animate() {
        requestAnimationFrame(animate)

        render()
      }

      function render() {
        const timer = 0.0001 * Date.now()

        camera.position.x += (mouseX - camera.position.x) * 0.05
        camera.position.y += (-mouseY - camera.position.y) * 0.05
        camera.lookAt(scene.position)

        for (let i = 0, il = spheres.length; i < il; i++) {
          const sphere = spheres[ i ]

          sphere.position.x = 5000 * Math.cos(timer + i)
          sphere.position.y = 5000 * Math.sin(timer + i * 1.1)
        }

        effect.render(scene, camera)
      }
    }
  }
}
</script>

<style scoped>

</style>
