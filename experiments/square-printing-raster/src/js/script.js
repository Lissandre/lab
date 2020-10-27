const canvas = document.querySelector('#_canvas')
const tempcanvas = document.querySelector('#_tempcanvas')
/**
 * CANVAS SIZES
 */
canvas.width = window.innerWidth
canvas.height = window.innerHeight
tempcanvas.width = window.innerWidth
tempcanvas.height = window.innerHeight
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  tempcanvas.width = window.innerWidth
  tempcanvas.height = window.innerHeight
  tempctx.clearRect(0,0,tempcanvas.width, tempcanvas.height)
  // drawImage()
  //draw()
})
/**
 * CONTEXT
 */
const ctx = canvas.getContext('2d')
const tempctx = tempcanvas.getContext('2d')
/**
 * IMAGE
 */
// const image = new Image()
// image.src = './image.jpg'

// image.onload = function() {
//   drawImage()
//   printDraw()
//   update()
// }

// function drawImage(){
//   tempctx.drawImage(image, 0, 0)
// }
// Prefer camera resolution nearest to 1280x720.
let constraints = { audio: false, video: { width: 1920, height: 1080 } }; 

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  let video = document.querySelector('video')
  video.srcObject = mediaStream
  video.onloadedmetadata = function(e) {
    video.play()
  }
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end
function printDraw() {
  const imageDataSource = tempctx.getImageData(0, 0, video.width, video.height)
  let h = 0
  let w = 0
  // ctx.globalCompositeOperation = 'multiply'
  for (let i = 0; i < imageDataSource.data.length; i+=44 ){
    let rMoyenne = Math.round(((imageDataSource.data[i] + imageDataSource.data[i+8] + imageDataSource.data[i+16] + imageDataSource.data[i+24] + imageDataSource.data[i+32] + imageDataSource.data[i+40])/6)/255)*255
    let gMoyenne = Math.round(((imageDataSource.data[i+1] + imageDataSource.data[i+9] + imageDataSource.data[i+17] + imageDataSource.data[i+25] + imageDataSource.data[i+33] + imageDataSource.data[i+41])/6)/255)*255
    let bMoyenne = Math.round(((imageDataSource.data[i+2] + imageDataSource.data[i+10] + imageDataSource.data[i+18] + imageDataSource.data[i+26] + imageDataSource.data[i+34] + imageDataSource.data[i+42])/6)/255)*255

    ctx.strokeStyle = `rgb(${rMoyenne}, ${gMoyenne}, ${bMoyenne})`
    ctx.lineWidth = 3
    // console.log((i+43)%(image.width*4))
    if(((i+43)%(video.width*4))<=43){
      w = 0
      h += 10
      i += imageDataSource.data.length/video.height*5
    }else{
      w += 10
    }
    ctx.strokeRect(w+Math.round(Math.random()*4-2), h+Math.round(Math.random()*4-2), 20, 20)
  }
}

const update = function(){
  setTimeout(update, 1000/30)
  ctx.clearRect(0,0,canvas.width, canvas.height)
  tempctx.clearRect(0,0,tempcanvas.width, tempcanvas.height)
  tempctx.drawImage(video, 0, 0, video.width, video.height)
  printDraw()
}
update()
/**
 * DAT.GUI
 */
// let gui = new dat.GUI()
// gui.values = {
//   lines_number : gui.add(conf,'accelerationValue',0,20).step(1).name('Lines Number'),
// }