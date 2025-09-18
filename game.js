// Получаем элемент canvas из HTML-файла
const canvas = document.getElementById("renderCanvas");

// Создаем движок Babylon.js
const engine = new BABYLON.Engine(canvas, true);

// Создаем сцену
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    
    // Устанавливаем цвет фона (голубое небо)
    scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.9);

    // Добавляем камеру, которая прикреплена к автомобилю
    const camera = new BABYLON.FollowCamera("carCamera", new BABYLON.Vector3(0, 5, -10), scene, car);
    camera.radius = 5; // Насколько далеко камера от машины
    camera.heightOffset = 2; // Насколько высоко камера над машиной
    camera.rotationOffset = 180; // Поворачивает камеру на 180 градусов, чтобы она смотрела вперёд
    camera.cameraAcceleration = 0.05; // Насколько быстро камера догоняет машину
    camera.maxCameraSpeed = 5; // Максимальная скорость движения камеры

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

// Логика движения
    const moveSpeed = 0.1;
    const rotationSpeed = 0.05;

    // Слушаем нажатия клавиш
    window.addEventListener("keydown", function (event) {
        // Получаем вектор, указывающий "вперёд" для машины
        const forward = car.forward;
        // Получаем вектор, указывающий "назад" для машины
        const backward = forward.scale(-1);

        switch (event.key) {
            case "ArrowUp":
                // Двигаем машину вперёд в её собственном направлении
                car.position.addInPlace(forward.scale(moveSpeed));
                break;
            case "ArrowDown":
                // Двигаем машину назад
                car.position.addInPlace(backward.scale(moveSpeed));
                break;
            case "ArrowLeft":
                // Поворачиваем машину влево
                car.rotation.y -= rotationSpeed;
                break;
            case "ArrowRight":
                // Поворачиваем машину вправо
                car.rotation.y += rotationSpeed;
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


