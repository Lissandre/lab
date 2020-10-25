const canvas = document.querySelector('#_canvas')
/**
 * CANVAS SIZES
 */
canvas.width = 300
canvas.height = 300
/**
 * CONTEXT
 */
const ctx = canvas.getContext('2d')
const scheme = new ColorScheme()
scheme.from_hue(225)
  .scheme('triade')
  .variation('hard')
const colors = scheme.colors()

class Line{
  constructor(_options){
    // Set options
    this.ctx = _options.ctx
    this.canvas = _options.canvas
    this.colors = _options.colors

    // Set up
    this.orientation = Math.random() * Math.PI * 2
    this.startPosition = -200
    this.steps = 100
    this.scale = 100
    this.frequency = 0.1
    this.x = 0
    this.time = 0.4
  }
  draw(){
    this.ctx.beginPath()
    this.ctx.moveTo(0, this.startPosition)
    this.ctx.lineTo(this.canvas.width * 2, this.startPosition)
    // this.ctx.lineTo(this.canvas.width, noise.noise2D(this.frequency * 2, 0.04, 100) * this.scale/10)
    this.ctx.strokeStyle = `#${this.colors[Math.floor(Math.random()*12)]}`
    this.ctx.lineWidth = Math.random() * 15
    this.ctx.stroke()
    this.ctx.closePath()
    this.startPosition += Math.random() * 50
  }
}
const line = new Line({
  ctx: ctx,
  canvas: canvas,
  colors: colors
})

let noise = new SimplexNoise()
ctx.rotate(Math.PI / 4)
for (let i = 0; i < 18; i++) {
  line.draw()
}
ctx.setTransform(1, 0, 0, 1, 0, 0)

// const update = function(){
//   window.requestAnimationFrame(update)
  
// }
// update()
/**
 * DAT.GUI
 */
// let gui = new dat.GUI()
// gui.values = {
//   lines_number : gui.add(conf,'accelerationValue',0,20).step(1).name('Lines Number'),
// }