// Получаем элемент canvas из HTML-файла
const canvas = document.getElementById("renderCanvas");

// Создаем движок Babylon.js
const engine = new BABYLON.Engine(canvas, true);

// Создаем сцену
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    
    // Устанавливаем цвет фона (голубое небо)
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.9);

    // Добавляем свободную камеру, которой можно управлять
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    // Добавляем источник света
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // Создаем "землю" (дорогу)
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 50, height: 50 }, scene);
    const groundMaterial = new BABYLON.StandardMaterial("groundMat", scene);
    groundMaterial.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    ground.material = groundMaterial;

    // Создаем простой "автомобиль" (коробка для начала)
    const car = BABYLON.MeshBuilder.CreateBox("car", { width: 1.5, height: 1, depth: 3 }, scene);
    car.position.y = 0.5; // Немного приподнимаем над землей
    
    // Добавляем материал (цвет) для машины
    const carMaterial = new BABYLON.StandardMaterial("carMat", scene);
    carMaterial.diffuseColor = new BABYLON.Color3(1, 0.5, 0); // Оранжевый цвет
    car.material = carMaterial;

    // Логика простого движения
    const moveSpeed = 0.1;

    // Слушаем нажатия клавиш для управления машиной
    window.addEventListener("keydown", function (event) {
        // Логика движения машины
        switch (event.key) {
            case "ArrowUp":
                car.position.z += moveSpeed;
                break;
            case "ArrowDown":
                car.position.z -= moveSpeed;
                break;
            case "ArrowLeft":
                car.rotation.y -= 0.1;
                break;
            case "ArrowRight":
                car.rotation.y += 0.1;
                break;
        }
    });

    return scene;
};

// Создаем сцену
const scene = createScene();

// Запускаем цикл рендеринга для отрисовки сцены
engine.runRenderLoop(function () {
    scene.render();
});

// Обрабатываем изменение размера окна
window.addEventListener("resize", function () {
    engine.resize();
});