var contentElement = document.getElementById('land');
let offsetX = 0;
let offsetY = 0;
let offsetZ = 0;
let speed = 50;
let translateX = -7200;
let translateY = -2400;
let currentPositionX = 0;
let previousPositionX = 0;
let currentPositionY = 0;
let previousPositionY = 0;
let isMovingX = false;
let isMovingY = false;
const smoothSpeed = 0.5; // Adjust this value for smoother/faster camera movement
var _startX = 0;
var _startY = 0;
var _offsetX = 0;           
var _offsetY = 0;
var _dragElement;
document.onmousedown = OnMouseDown;
document.onmouseup = OnMouseUp;
let zoom = 1;
let canZoom = true;

// Prevent middle button to open a new tab
window.addEventListener("auxclick", (event) => {
  if (event.button === 1) event.preventDefault();
});

function OnMouseDown(event){

  if(event.button == 1){

    event.preventDefault();
    
  }

  if (event.button != 1)
      return;

  document.onmousemove = OnMouseMove;
  _startX = event.clientX;
  _startY = event.clientY;
  _offsetX = document.getElementById('land').offsetLeft;
  _offsetY = document.getElementById('land').offsetTop;
  _dragElement = document.getElementById('land');

}



function OnMouseMove(event){
  _dragElement.style.left = (_offsetX + event.clientX - _startX) + 'px';
  _dragElement.style.top = (_offsetY + event.clientY - _startY) + 'px';
}

function OnMouseUp(event){
  document.onmousemove = null;
  _dragElement=null;
}

setTimeout(initCameraPosition, 2000);

// Atualiza as posições dos elementos
const elements = document.querySelectorAll('.element');
elements.forEach(element => {
    element.style.left = `${Math.floor(Math.random() * 8000)}px`;
    element.style.top = `${Math.floor(Math.random() * 2000)}px`;
});


window.addEventListener('keydown', (event) => {
    contentElement = document.getElementById('land');
    UpdateTransform(contentElement);

  });



function UpdateTransform(element){

  let targetOffsetX = offsetX;
  let targetOffsetY = offsetY;
  let targetOffsetZ = offsetZ;

  switch (event.key) {
    case 'w':
      if (offsetY < -100) targetOffsetY += speed;
      break;
    case 'a':
      if (offsetX < -2600) targetOffsetX += speed;
      break;
    case 's':
      if (offsetY > -2200) targetOffsetY -= speed;
      break;
    case 'd':
      if (offsetX > -3800) targetOffsetX -= speed;
      break;
  }

  // Apply smoothing (lerping)
  offsetX = lerp(offsetX, targetOffsetX, smoothSpeed);
  offsetY = lerp(offsetY, targetOffsetY, smoothSpeed);
  offsetZ = lerp(offsetZ, targetOffsetZ, smoothSpeed);

  element.style.transform = `scale(${zoom}) translate(${offsetX}px, ${offsetY}px) translateZ(${offsetZ}px)`;

}

window.addEventListener('wheel', function(event)
{
 if (event.deltaY < 0)
 {

  if(canZoom == false)
     return;

  zoomIn();

  // updateVignetteSize(-5);

  let vignette = document.getElementById('vignette');


    
 }
 else if (event.deltaY > 0)
 {
  if(canZoom == false)
    return;

  zoomOut();

  let vignette = document.getElementById('vignette');

  // updateVignetteSize(5);

 }
});



function setVignetteSize(vignetteSize = 15){

  vignetteLevel = vignetteSize;

  vignette.style = `background: radial-gradient(circle, rgba(247,247,247,0) 0%, rgba(36,36,36,1) ${vignetteLevel}%, rgba(0,0,0,1) 100%);`

}

function updateVignetteSize(vignetteSize = 0){

  vignetteLevel += vignetteSize;

  vignette.style = `background: radial-gradient(circle, rgba(247,247,247,0) 0%, rgba(36,36,36,1) ${vignetteLevel}%, rgba(0,0,0,1) 100%);`

}

function zoomIn()
{
  if(zoom > 1.2)
    return;

  var Page = document.getElementById('zoom-container');
  zoom += 0.1;
  Page.style.transform = `scale(${zoom})`;

}

function zoomOut()
{
  if(zoom < 0.4)
    return;

  var Page = document.getElementById('zoom-container');
  zoom -= 0.1;
  Page.style.transform = `scale(${zoom})`;

}
  
  // Linear interpolation function
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }
  

  function handleMouseMove(event) {
        if (previousPositionX && previousPositionY) {
            const newX = event.clientX;
            const newY = event.clientY;
            let speed = 50;

            let directionX = previousPositionX - newX;
            let directionY = previousPositionY - newY;

          
            if (Math.abs(directionX) > Math.abs(directionY)) {
                isMovingX = true;
                isMovingY = false;
            } else {
                isMovingX = false;
                isMovingY = true;
            }

            if (isMovingX) {

                if (directionX > 0)
                  translateX -= speed;
                else
                  translateX += speed;

      
                contentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }

            if (isMovingY) {

                if (directionY > 0)
                  translateY -= speed;
                else
                  translateY += speed;
               
                contentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
        }

        previousPositionX = event.clientX;
        previousPositionY = event.clientY;

}


function initPosition(){

  offsetX = translateX;
  offsetY = translateY;
  contentElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`

}

function initCameraPosition(){

    contentElement = document.getElementById('land');

    contentElement.onmouseover = function(){

          canZoom = true;
      
      }
      
      
      contentElement.onmouseout = function(){
      
        canZoom = false;
      
      }
  
   
    initPosition();

}