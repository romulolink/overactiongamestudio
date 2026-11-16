var contentElement = document.getElementById('land');
let offsetX = 0;
let offsetY = 0;
let offsetZ = 0;
let speed = 50;
let isMiddleMouseDown = false;
let translateX = 0;
let translateY = 0;
let previousClientX = 0;

setTimeout(initCameraPosition, 2000);

// Atualiza as posições dos elementos
const elements = document.querySelectorAll('.element');
elements.forEach(element => {
    element.style.left = `${Math.floor(Math.random() * 8000)}px`;
    element.style.top = `${Math.floor(Math.random() * 2000)}px`;
});


window.addEventListener('keydown', (event) => {
    contentElement = document.getElementById('land');
  
    const smoothSpeed = 0.5; // Adjust this value for smoother/faster camera movement
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
      case 'q':
        targetOffsetZ -= speed;
        break;
      case 'e':
        targetOffsetZ += speed;
        break;
    }
  
    // Apply smoothing (lerping)
    offsetX = lerp(offsetX, targetOffsetX, smoothSpeed);
    offsetY = lerp(offsetY, targetOffsetY, smoothSpeed);
    offsetZ = lerp(offsetZ, targetOffsetZ, smoothSpeed);
  
    contentElement.style.transform = `translate(${offsetX}px, ${offsetY}px) translateZ(${offsetZ}px)`;
  });
  
  // Linear interpolation function
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }
  

function handleMouseMove(event) {
    if (isMiddleMouseDown) {
    
        console.log("previousClientX:" + previousClientX)


        if(previousClientX > 0)
          translateX = offsetX +=10;
        if(previousClientX < 0)
          translateX = offsetX -=10 ;

          translateY = offsetY++;

          previousClientX = previousClientX - event.clientX;

        contentElement.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
}

function handleMouseUp() {
    if (isMiddleMouseDown) {
        isMiddleMouseDown = false;

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }
}

function initCameraPosition(){

    contentElement = document.getElementById('land');
    offsetX = -3240;
    offsetY = -1100;
    contentElement.style.transform = `translate(${offsetX}px, ${offsetY}px)`

    
  contentElement.addEventListener('mousedown', (event) => {
    if (event.button === 1) {
        isMiddleMouseDown = true;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
  });

}