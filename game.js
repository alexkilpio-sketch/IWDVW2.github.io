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

    // Создаем "землю" (д... Читать далее