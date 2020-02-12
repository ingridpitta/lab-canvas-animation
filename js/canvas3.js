class CanvasField {
  constructor(width, height, background, backgroundSpeed) {
    this.canvas = document.createElement("canvas");
    this.width = width;
    this.height = height;
    this.background = background;
    this.backgroundPosition = 0;
    this.backgroundSpeed = backgroundSpeed;
    this.context;
  }

  createCanvas = () => {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.children[0]);
  };

  clearCanvas = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  drawBackground = () => {
    this.context.drawImage(
      this.background,
      this.backgroundPosition,
      0,
      this.canvas.width,
      this.canvas.height
    );
    this.context.drawImage(
      this.background,
      this.backgroundPosition + this.canvas.width,
      0,
      this.canvas.width,
      this.canvas.height
    );
  };

  moveBackground = () => {
    this.backgroundPosition -= this.backgroundSpeed;

    if (this.backgroundPosition <= -this.canvas.width) {
      this.backgroundPosition = 0;
    }
  };
}

class Player {
  constructor(x, y, speed, color, size, context) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
    this.size = size;
    this.context = context;
  }

  drawPlayer = () => {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.size, this.size);
  };

  movePlayer = key => {
    switch (key) {
      case 38:
        this.y -= this.speed;
        break;
      case 40:
        this.y += this.speed;
        break;
      case 39:
        this.x += this.speed;
        break;
      case 37:
        this.x -= this.speed;
        break;
      default:
        break;
    }
  };
}

class Game {}

function animation(canvas) {
  canvas.clearCanvas();
  canvas.drawBackground();
  canvas.moveBackground();

  window.requestAnimationFrame(animation);
}

window.onload = () => {
  const image = new Image();
  image.src = "../assets/img/field.jpg";

  image.onload = () => {
    const canvas = new CanvasField(800, 400, image, 1);
    canvas.createCanvas();

    const player = new Player(0, 0, 5, "yellow", 25, canvas.context);

    let frames = 0;

    function animation() {
      canvas.clearCanvas();
      canvas.drawBackground();
      player.drawPlayer();
      canvas.moveBackground();

      frames + -1;

      const animationFrame = window.requestAnimationFrame(animation);
      if (frames >= 300) {
        window.cancelAnimationFrame(animationFrame);
      }
    }

    animation();

    window.onkeydown = e => {
      player.movePlayer(e.keyCode);
    };
  };
};
