import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const modelUrl = "../../../src/assets/model/car/scene.gltf"
const globalThree = {
    state: {
        camera: null, // 相机
        scene: new THREE.Scene(), // 场景
        light: null, // 灯光
        controls: null,// 控制器
        renderer: null, //渲染器
        loader: null,
        model: null

    },
    // 初始化相机
    initCamera(ele) {
        this.state.camera = new THREE.PerspectiveCamera(
            25,
            ele.clientWidth / ele.clientHeight,
            0.1,
            10000
        )
        const model = this.model
        // 将相机朝向模型
        this.state.camera.lookAt(model.position)
        // 计算相机与模型之间的距离
        const distance = this.state.camera.position.distanceTo(model.position);
        // 调整相机的位置，使得模型在相机的中心位置
        // this.state.camera.position.set(model.position.x, model.position.y, model.position.z + distance);
        this.state.camera.position.set(-20, 3, -20)
        console.log(this.state.camera)
    },
    // 初始化灯光
    initLight() {
        this.state.scene.add(new THREE.AmbientLight('#fff'))
        this.state.light = new THREE.DirectionalLight(0xdfebff, 0.45)
        this.state.light.position.set(50, 200, 100)
        this.state.light.position.multiplyScalar(0.3)
        this.state.scene.add(this.state.light)
    },
    // 初始化控制器
    initControls() {
        this.state.controls = new OrbitControls(this.state.camera, this.state.renderer.domElement)
        this.state.controls.target.set(0, 0, 0)
    },
    // 初始化渲染
    initRenderer(ele) {
        this.state.renderer = new THREE.WebGLRenderer()
        this.state.renderer.setClearColor(0x3e7bff)
        this.state.renderer.setPixelRatio(window.devicePixelRatio) // 为了兼容高清屏幕
        this.state.renderer.setSize(ele.clientWidth, ele.clientHeight)
        ele.appendChild(this.state.renderer.domElement)
        this.aninmae()
    },
    // 动画
    aninmae() {
        this.state.renderer.render(this.state.scene, this.state.camera)
        this.model.rotation.y += 0.001
        window.requestAnimationFrame(() => {
            this.aninmae()
        });
    },
    // 外部模型加载函数
    loadObj(ele) {
        // 加载 glTF 格式的模型
        let loader = new GLTFLoader(); //实例化加载器
        loader.load(
            // 访问CDN
            modelUrl,
            (obj) => {
                console.log(obj, "obj") //打印glft输出对象结构
                this.model = obj.scene
                // 调正最佳位置
                obj.scene.position.set(-3, 0, -4)
                obj.scene.scale.set(1, 1, 1)
                obj.scene.rotation.set(0, 0, 0)
                this.state.scene.add(this.model) //生成的模型添加到场景中
                if (this.model) {
                    this.initCamera(ele)
                    this.initLight()
                    this.initRenderer(ele)
                    this.initControls()
                }
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); //完成响应进度


            }
        );
    },

}
export default globalThree