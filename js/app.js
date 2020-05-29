// Define globals
var canvas = document.getElementsByTagName("canvas");
var context;
var color = "#" + Math.floor(Math.random() * 16777215).toString(16);

// Add event listeners to canvases for drawing
for (var i = 0; i < canvas.length; i++) {
  context = canvas[i].getContext("2d");
  // Draw with the mouse inside the canvas
  document.addEventListener("mousemove", mouseDraw(context, canvas[i]), false);
  // Change color when single clicked
  document.addEventListener("click", changeColor(context), false);
  // Draw with touch device inside canvas
  document.addEventListener("touchmove", touchDraw(context, canvas[i]), false);
}

// Clear the drawing when double clicked
document.addEventListener("dblclick", clear, false);

// Draw over the picture
function mouseDraw(context, canvas) {
  return function (e) {
    var pos = getMousePosition(e, canvas);

    context.fillRect(pos.x, pos.y, 4, 4);
  };
}

// Calculate mouse position inside canvas
// Required to get the correct mouse coordinates
function getMousePosition(e, canvas) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return {
    x: (e.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
    y: (e.clientY - rect.top) * scaleY, // been adjusted to be relative to element
  };
}

// Clear the drawing
function clear() {
  for (var i = 0; i < canvas.length; i++) {
    context = canvas[i].getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
}

// Change the color
function changeColor(context) {
  return function (e) {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    context.fillStyle = color;
  };
}

// Draw on touch devices
function touchDraw(context, canvas) {
  return function (e) {
    pos = getTouchPosition(e, canvas);

    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
      clientX: touch.clientX,
      clientY: touch.clientY,
    });
    canvas.dispatchEvent(mouseEvent);

    // Change the color of the brush
    context.fillStyle = "#000000";
    context.fillRect(pos.x, pos.y, 4, 4);
  };
}

// Touch position
function getTouchPosition(e, canvas) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

  return {
    x: (e.touches[0].clientX - rect.left) * scaleX,
    y: (e.touches[0].clientY - rect.top) * scaleY,
  };
}
