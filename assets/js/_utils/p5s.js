class Particle {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(1,8);
    this.xSpeed = random(-0.05,0.09);
    this.ySpeed = random(-0.01,0.07);
  }

  createParticle() {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.x,this.y,this.r);
  }

  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }

  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(255,255,255,0.04)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }
}

let particles = [];

function setup() {
  var clientHeight = document.getElementById('nav-wrapper').clientHeight;
  var clientWidth = document.getElementById('nav-wrapper').clientWidth;

  var cnv = createCanvas(clientWidth, clientHeight);
  cnv.parent("sidebar");
  background(0);
  for(let i = 0;i<width/8;i++){
    particles.push(new Particle());
  }
}

function windowResized() {
  var clientHeight = document.getElementById('nav-wrapper').clientHeight;
  var clientWidth = document.getElementById('nav-wrapper').clientWidth;
  resizeCanvas(clientWidth, clientHeight);
}

function draw() {
  background('#0f0f0f');
  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}

