const tank = document.getElementById("tank");

const fishImages = [
    "https://openmoji.org/data/color/svg/1F41F.svg",
    "https://openmoji.org/data/color/svg/1F420.svg",
    "https://openmoji.org/data/color/svg/1F421.svg",
    "https://openmoji.org/data/color/svg/1F988.svg",
    "https://openmoji.org/data/color/svg/1F99C.svg"
];

const fishCount = 7;
const fishList = [];

class Fish {
    constructor() {
        this.element = document.createElement("img");

        this.element.className = "fish";
        this.element.src =
            fishImages[Math.floor(Math.random() * fishImages.length)];

        this.element.alt = "Swimming fish";
        this.element.tabIndex = 0;

        this.width = 70;
        this.height = 55;

        this.x = Math.random() * (tank.clientWidth - this.width);
        this.y = Math.random() * (tank.clientHeight - this.height);

        this.angle = Math.random() * Math.PI * 2;
        this.normalSpeed = 1 + Math.random() * 1.2;
        this.speed = this.normalSpeed;

        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";

        tank.appendChild(this.element);

        this.element.addEventListener("click", () => {
            this.changeSpeed();
        });

        this.element.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.changeSpeed();
            }
        });

        this.chooseDirection();
    }

    chooseDirection() {
        setTimeout(() => {
            if (Math.random() < 0.7) {
                this.angle = Math.random() * Math.PI * 2;
            }

            this.chooseDirection();
        }, 2000 + Math.random() * 6000);
    }

    changeSpeed() {
        this.speed = this.normalSpeed * 2;

        clearTimeout(this.speedTimer);

        this.speedTimer = setTimeout(() => {
            this.speed = this.normalSpeed;
        }, 3000);
    }

    move() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        const maxX = tank.clientWidth - this.width;
        const maxY = tank.clientHeight - this.height;

        if (this.x <= 0) {
            this.x = 0;
            this.angle = Math.PI - this.angle;
        }

        if (this.x >= maxX) {
            this.x = maxX;
            this.angle = Math.PI - this.angle;
        }

        if (this.y <= 0) {
            this.y = 0;
            this.angle = -this.angle;
        }

        if (this.y >= maxY) {
            this.y = maxY;
            this.angle = -this.angle;
        }

        this.element.style.left = this.x + "px";
        this.element.style.top = this.y + "px";
    }
}

for (let i = 0; i < fishCount; i++) {
    fishList.push(new Fish());
}

function animate() {
    fishList.forEach((fish) => fish.move());
    requestAnimationFrame(animate);
}

animate();
