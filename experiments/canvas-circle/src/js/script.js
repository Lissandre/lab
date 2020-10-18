const canvas = document.querySelector('#_canvas')
/**
 * CANVAS SIZES
 */
canvas.width = window.innerWidth
canvas.height = window.innerHeight
document.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})
/**
 * CONTEXT
 */
const ctx = canvas.getContext('2d')
/**
 * PARTICLE CLASS
 */
class Particle{
  constructor(_options){
    // Set options
    this.ctx = _options.ctx
    this.canvas = _options.canvas
    this.size = _options.size
    this.accelerationValue = _options.accelerationValue

    // Set up
    this.lifespan = 10
    this.x = this.canvas.width / 2
    this.oldx = this.canvas.width / 2
    this.y = this.canvas.height / 2
    this.oldy = this.canvas.height / 2
    this.acceleration = 0
    this.direction = Math.random() * Math.PI * 2
    this.color = `rgb(${255*(this.acceleration*0.002)}, 0, ${255*(1-(this.acceleration*0.002))})`

    this.draw()
    this.update()
  }
  draw(){
    this.ctx.save()
    this.ctx.translate(this.x, this.y)

    this.ctx.beginPath()
    this.ctx.globalAlpha = this.lifespan-8.8 >= 0 ? this.lifespan-8.8 : 0
    this.ctx.fillStyle = this.color
    this.ctx.arc(0, 0, this.size, 0, Math.PI * 2, true)
    this.ctx.fill()
    this.ctx.closePath()

    this.ctx.restore()
    this.update()
  }
  update(){
    this.acceleration += this.accelerationValue
    this.lifespan -= 0.001

    this.oldx = this.x
    this.oldy = this.y

    this.color = `rgb(${255*(this.acceleration*0.002)}, 0, ${255*(1-(this.acceleration*0.002))})`
    this.x += Math.cos(this.acceleration + this.size + 2) * this.acceleration/2
    this.y += Math.sin(this.acceleration + this.size + 2) * this.acceleration/2
  }
}
let mouseX, mouseY, size
document.addEventListener('mousemove', (e)=>{
  mouseX = e.clientX
  mouseY = e.clientY
  size = Math.sqrt((mouseX-canvas.width/2)**2+(mouseY-canvas.height/2)**2)/50
})
/**
 * PARTICLES OPTIONS
 */
let conf = {
  accelerationValue: 0.5,
}
/**
 * REQUEST ANIMATION FRAME
 */
let particleList = []
function setParticles(){
  const particle = new Particle({
    ctx: ctx,
    canvas: canvas,
    size: size,
    accelerationValue: conf.accelerationValue,
  })
  particleList.push(particle)
  particleList = particleList.filter(particle => particle.lifespan >= 0)
  particleList.forEach(particle => {
    particle.draw()
  })
}
const update = function(){
  window.requestAnimationFrame(update)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  setParticles()
}
update()
/**
 * DAT.GUI
 */
let gui = new dat.GUI()
gui.values = {
  particle_acceleration : gui.add(conf,'accelerationValue',-5,5).step(0.1).name('Particles Acceleration')
}