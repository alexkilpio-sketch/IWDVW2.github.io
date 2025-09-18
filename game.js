// Получаем холст и его 2D-контекст для рисования
const canvas = document.getElementById("renderCanvas");
const ctx = canvas.getContext("2d");

// Настраиваем размер холста
function resizeCanvas() {
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Создаем "машину" как объект с параметрами
let car = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 60,
    color: 'orange',
    speed: 0,
    angle: 0,
    rotationSpeed: 0.05
};

// Функция для рисования машины
function drawCar() {
    ctx.save(); // Сохраняем текущее состояние холста
    ctx.translate(car.x, car.y); // Перемещаем "начало" координат в центр машины
    ctx.rotate(car.angle); // Поворачиваем холст
    ctx.fillStyle = car.color;
    ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
    ctx.restore(); // Восстанавливаем сохраненное состояние
}

// Слушаем нажатия клавиш
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            car.speed = 2; // Увеличиваем скорость
            break;
        case "ArrowDown":
            car.speed = -2; // Двигаемся назад
            break;
        case "ArrowLeft":
            car.rotationSpeed = -0.05; // Влево
            break;
        case "ArrowRight":
            car.rotationSpeed = 0.05; // Вправо
            break;
    }
});

// Слушаем отпускание клавиш, чтобы машина останавливалась
window.addEventListener("keyup", function (event) {
    switch (event.key) {
        case "ArrowUp":
        case "ArrowDown":
            car.speed = 0; // Останавливаемся
            break;
        case "ArrowLeft":
        case "ArrowRight":
            car.rotationSpeed = 0; // Прекращаем поворот
            break;
    }
});

// Основной игровой цикл
function gameLoop() {
    // Очищаем весь холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Обновляем положение и поворот машины
    car.angle += car.rotationSpeed;
    car.x += car.speed * Math.sin(car.angle);
    car.y += car.speed * -Math.cos(car.angle);

    // Рисуем машину
    drawCar();

    // Запускаем следующий кадр
    requestAnimationFrame(gameLoop);
}

// Запускаем игру
gameLoop();




