import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const modelUrl = "../../../src/assets/model/car/scene.gltf"

const globalThree = {
    state: {
        camera: null, // 相机
        scene: null, // 场景
        light: null, // 灯光
        controls: null,// 控制器
        renderer: null, //渲染器
        loader: null,

    },
    // 初始化场景
    initScene() {
        this.state.scene = new THREE.Scene()
    },
    // 初始化相机
    initCamera(ele) {
        this.state.camera = new THREE.PerspectiveCamera(
            45,
            ele.clientWidth / ele.clientHeight,
            0.1,
            5000
        )
        this.state.camera.position.set(0, 0, 30)
    },
    // 初始化灯光
    initLight() {
        this.state.scene.add(new THREE.AmbientLight(0x999999))
        this.state.light = new THREE.DirectionalLight(0xdfebff, 0.45)
        this.state.light.position.set(50, 200, 100)
        this.state.light.position.multiplyScalar(0.3)
        this.state.scene.add(this.state.light)
    },
    // 初始化控制器
    initControls(ele) {
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
        window.requestAnimationFrame(() => {
            this.aninmae()
        });
    },
    // 外部模型加载函数
    loadObj() {
        // 加载 glTF 格式的模型
        let loader = new GLTFLoader(); //实例化加载器
        loader.load(
            // 访问CDN
            modelUrl,
            (obj) => {
                console.log(obj, "obj") //打印glft输出对象结构
                // mesh.scale.set(10, 10, 10);
                console.log(obj);
                const root = obj.scene
                this.state.scene.add(root) //生成的模型添加到场景中
                console.log(this.state.scene)
            },
            function (xhr) {
                console.log((xhr.loaded / xhr.total) * 100 + "% loaded"); //完成响应进度
            }
        );
    },
    init(ele) {
        this.initScene()
        this.initCamera(ele)
        this.initLight()
        this.initRenderer(ele)
        this.initControls(ele)
        this.loadObj()
    }

}
export default globalThree