export function startBackgroundAnimation() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let WIDTH, HEIGHT;
    const stars = [];
    const dots = [];
    const params = { maxDistFromCursor: 50, dotsSpeed: 0.5, backgroundSpeed: 0.2, fadeSpeed: 0.01 };

    let mouseMoving = false;
    let mouseX, mouseY;

    // Set up canvas size
    function setCanvasSize() {
        WIDTH = window.innerWidth;
        HEIGHT = window.innerHeight;
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
    }

    // Star class (for background stars)
    class Star {
        constructor(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 2) + 1;
            const alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
            this.color = `rgba(255, 255, 255, ${alpha})`;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        move() {
            this.y -= 0.15 + params.backgroundSpeed / 100;
            if (this.y <= -10) this.y = HEIGHT + 10;
            this.draw();
        }
    }

    // Dot class (for geometric pattern)
    class Dot {
        constructor(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 3) + 1;
            this.speed = params.dotsSpeed;
            this.a = 1; // Start with full opacity
            this.fadeSpeed = params.fadeSpeed; // How fast the dot fades
            this.color = `rgba(255, 255, 255, ${this.a})`;
            this.dir = Math.random() * 360;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.a})`; // Apply alpha
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        link() {
            const previousDot1 = getPreviousDot(this.id, 1);
            const previousDot2 = getPreviousDot(this.id, 2);
            if (!previousDot1) return;

            ctx.strokeStyle = `rgba(255, 255, 255, ${this.a / 4})`; // Fade link with alpha
            ctx.beginPath();
            ctx.moveTo(previousDot1.x, previousDot1.y);
            ctx.lineTo(this.x, this.y);
            if (previousDot2) ctx.lineTo(previousDot2.x, previousDot2.y);
            ctx.stroke();
        }

        move() {
            this.x += Math.cos(degToRad(this.dir)) * this.speed;
            this.y += Math.sin(degToRad(this.dir)) * this.speed;

            // Fade out the dot gradually
            this.a -= this.fadeSpeed;
            if (this.a <= 0) {
                this.die();
            } else {
                this.draw();
                this.link();
            }
        }

        die() {
            const index = dots.indexOf(this);
            if (index > -1) {
                dots.splice(index, 1); // Remove the dot from the array
            }
        }
    }

    // Helper functions
    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    function getPreviousDot(id, stepBack) {
        if (id === 0 || id - stepBack < 0) return null;
        return dots[id - stepBack];
    }

    // Initialize stars and set up animation
    function init() {
        for (let i = 0; i < 80; i++) {
            stars.push(new Star(i, Math.random() * WIDTH, Math.random() * HEIGHT));
        }
        animate();
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        stars.forEach(star => star.move());
        if (mouseMoving) {
            createDots();
        }

        dots.forEach(dot => dot.move()); // Move and fade out dots

        requestAnimationFrame(animate);
    }

    // Create new dots at mouse position
    function createDots() {
        if (dots.length === 0) {
            dots.push(new Dot(0, mouseX, mouseY));
        } else {
            const previousDot = getPreviousDot(dots.length, 1);
            const diffX = Math.abs(previousDot.x - mouseX);
            const diffY = Math.abs(previousDot.y - mouseY);

            if (diffX > params.maxDistFromCursor || diffY > params.maxDistFromCursor) {
                dots.push(new Dot(dots.length, mouseX, mouseY));
            }
        }
    }

    // Mouse movement event listener
    window.onmousemove = function (e) {
        mouseMoving = true;
        mouseX = e.clientX;
        mouseY = e.clientY;
    };

    // Stop dots creation if mouse stops moving
    window.onmouseout = function () {
        mouseMoving = false;
    };

    // Resize event listener
    window.addEventListener('resize', setCanvasSize);

    setCanvasSize(); // Set initial canvas size
    init(); // Initialize stars and start animation
}
