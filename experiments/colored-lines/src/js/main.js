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

let noise = new SimplexNoise()
// à chaque image : 60fps
let time = 0
const update = () => {
  requestAnimationFrame(update)
  time += .01
  ctx.globalAlpha = 0.2
  ctx.fillSyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = 1
  noisefunc()
  
}
requestAnimationFrame(update)

/**
 * LINES
 */
let distance = 1
let oldMouseX = 0
let oldMouseY = 0
function noisefunc(){
  ctx.rotate(Math.PI / 4)
  let steps = 40
  let scale = 100
  let frequency = 0.1
  for (let i = 0; i < 30; i++) {
    if(colors.length === 0){
      setcolor()
      settranslate()
      setwidths()
    }
    ctx.save()
    ctx.translate(-4, trValue[i]-200)
    ctx.beginPath()
    ctx.strokeStyle = colors[i]
    ctx.moveTo(0, noise.noise3D(0, time, 1000) * scale)
    for(let x = 0; x < steps; x++) {
      ctx.lineTo(x / steps * canvas.width*2, noise.noise2D(x * frequency + time * 2, time+i/15, 100) * scale / 10)
    }
    ctx.lineWidth = widths[i]
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
/**
 * WIDTHS
 */
let widths = []
function setwidths(){
  for (let w = 0; w <30; w++) {
    widths.push(Math.random()*8)
  }
}
/**
 * TRANSLATE
 */
let trValue = []
function settranslate(){
  for (let w = 0; w <30; w++) {
    if(trValue[0]){
      trValue.push(Math.random()*40+trValue[w-1])
    }
    else {
      trValue.push(Math.random()*50)
    }
  }
}
/**
 * COLORS
 */
let colors = []
const scheme = new ColorScheme()
scheme.from_hue(225)
  .scheme('triade')
  .variation('hard')
const colorsList = scheme.colors()
function setcolor(){
  for (let u = 0; u <30; u++) {
    let color = `#${colorsList[Math.floor(Math.random()*12)]}`
    colors.push(color)
  }
}