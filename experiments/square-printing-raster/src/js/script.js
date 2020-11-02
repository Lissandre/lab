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
let constraints = { audio: false, video: { width: window.innerHeight * (16/9), height: window.innerHeight } }; 

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  let video = document.querySelector('video')
  video.width = constraints.video.width
  video.height = constraints.video.height
  video.srcObject = mediaStream
  video.onloadedmetadata = function(e) {
    video.play()
  }
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end
function printDraw() {
  const imageDataSource = tempctx.getImageData(0, 0, video.width, video.height)
  let h = -20
  let w = -20
  // ctx.globalCompositeOperation = 'multiply'
  for (let i = 0; i < imageDataSource.data.length; i+=44 ){
    let rMoyenne = Math.round(((imageDataSource.data[i] + imageDataSource.data[i+8] + imageDataSource.data[i+16] + imageDataSource.data[i+24] + imageDataSource.data[i+32] + imageDataSource.data[i+40])/6)/255)*255
    let gMoyenne = Math.round(((imageDataSource.data[i+1] + imageDataSource.data[i+9] + imageDataSource.data[i+17] + imageDataSource.data[i+25] + imageDataSource.data[i+33] + imageDataSource.data[i+41])/6)/255)*255
    let bMoyenne = Math.round(((imageDataSource.data[i+2] + imageDataSource.data[i+10] + imageDataSource.data[i+18] + imageDataSource.data[i+26] + imageDataSource.data[i+34] + imageDataSource.data[i+42])/6)/255)*255

    ctx.strokeStyle = `rgb(${rMoyenne}, ${gMoyenne}, ${bMoyenne})`
    ctx.lineWidth = squareSize / 6
    // console.log((i+43)%(image.width*4))
    if(((i+44)%(video.width*4))===44){
      w = 0
      i += imageDataSource.data.length/video.height*5
      if(squareSize === 8){
        h += 6
      } else {
        h += squareSize -2
      }
    }else{
      if(squareSize === 8){
        w += squareSize/2
      } else {
        w += squareSize/2 + 2
      }
    }
    ctx.strokeRect(w+Math.round(Math.random()*4-2), h+Math.round(Math.random()*4-2), squareSize, squareSize)
  }
}
let squareSize
if (video.width > video.height){
  squareSize = 20
} else {
  squareSize = 8
}
const update = function(){
  setTimeout(update, 1000/30)
  ctx.clearRect(0,0,canvas.width, canvas.height)
  tempctx.clearRect(0,0,tempcanvas.width, tempcanvas.height)
  tempctx.drawImage(video, 0, 0, video.width, video.height)
  printDraw()
}
update()