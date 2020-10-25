const canvas = document.querySelector('#_canvas')
/**
 * CANVAS SIZES
 */
canvas.width = window.innerWidth
canvas.height = window.innerHeight
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  //draw()
})
/**
 * CONTEXT
 */
const ctx = canvas.getContext('2d')
/**
 * IMAGE
 */
const image = new Image()
image.src = './image.jpg'

image.onload = () => {
  print()
  //let imageLeft = canvas.width/2 - image.width/2
  //let imageTop = canvas.height/2 - image.height/2
  //ctx.drawImage(image, imageLeft, imageTop)
}

function print() {
  let h = 0
  let w = 0
  let imageLeft = canvas.width/2 - image.width/2
  let imageTop = canvas.height/2 - image.height/2
  ctx.drawImage(image, imageLeft, imageTop)
  const imageDataSource = ctx.getImageData(imageLeft, imageTop, image.width, image.height)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'multiply'
  for (let i = 0; i < imageDataSource.data.length; i+=24) {
    let rMoyenne = Math.round(((imageDataSource.data[i] + imageDataSource.data[i+4] + imageDataSource.data[i+8] + imageDataSource.data[i+12] + imageDataSource.data[i+16] + imageDataSource.data[i+20])/6)/255)*255
    let gMoyenne = Math.round(((imageDataSource.data[i+1] + imageDataSource.data[i+5] + imageDataSource.data[i+9] + imageDataSource.data[i+13] + imageDataSource.data[i+17] + imageDataSource.data[i+21])/6)/255)*255
    let bMoyenne = Math.round(((imageDataSource.data[i+2] + imageDataSource.data[i+6] + imageDataSource.data[i+10] + imageDataSource.data[i+14] + imageDataSource.data[i+18] + imageDataSource.data[i+22])/6)/255)*255

    ctx.strokeStyle = `rgb(${rMoyenne}, ${gMoyenne}, ${bMoyenne})`
    ctx.lineWidth = 1
    //console.log(i%(image.width))
    if(i%(image.width*4)===4){
      w = 0
      h += 10
    }else{
      w += 10
    }
    ctx.strokeRect(w, h, 20, 20)
  }
}

const update = function(){
  window.requestAnimationFrame(update)
}
update()
/**
 * DAT.GUI
 */
// let gui = new dat.GUI()
// gui.values = {
//   lines_number : gui.add(conf,'accelerationValue',0,20).step(1).name('Lines Number'),
// }