// Set up the canvas
var canvas = document.getElementById("firma");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "#222222";
ctx.lineWith = 2;

//clear canvas
var clearButton = document.getElementById("clear")

clearButton.addEventListener("click", clearCanvas)

function clearCanvas(){
    canvas.width = canvas.width;
}

// Set up mouse events for drawing
var drawing = false;
var mousePos = { x:0, y:0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
    drawing = true;
    lastPos = getMousePos(canvas, e);
    }, false);
canvas.addEventListener("mouseup", function (e) {
    drawing = false;
    }, false);
canvas.addEventListener("mousemove", function (e) {
    mousePos = getMousePos(canvas, e);
    }, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: mouseEvent.clientX - rect.left,
    y: mouseEvent.clientY - rect.top
  };
}

// Get a regular interval for drawing to the screen
window.requestAnimFrame = (function (callback) {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimaitonFrame ||
        function (callback) {
            window.setTimeout(callback, 1000/60);
       };
})();

// Draw to the canvas
function renderCanvas() {
    if (drawing) {
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(mousePos.x, mousePos.y);
      ctx.stroke();
      lastPos = mousePos;
    }
  }
  
// Allow for animation
(function drawLoop () {
requestAnimFrame(drawLoop);
renderCanvas();
})();

  
// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
    }, false);
canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
    }, false);
canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
    }, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
        x: touchEvent.touches[0].clientX - rect.left,
        y: touchEvent.touches[0].clientY - rect.top
    };
}

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    
    
    $boton.addEventListener("click", () => {
        let inputs = document.querySelectorAll("input")
        let array = [... inputs]

        clearButton.style.display = "none"
        $boton.style.display = "none"

        const cedula = document.getElementById("cedula")
        let valueCedula = cedula.value
        const cedula1 = document.getElementById("cedula1")
        console.log(valueCedula)
        cedula1.innerHTML = "<span>" + valueCedula + "</span>"
        array.forEach(function(v){
            let val = v.value
            let element = document.createElement("span")
            element.innerHTML ="<span>" + val + "</span>"
            v.parentNode.replaceChild(element, v)            
            /* this.replace(/<input[^>]*>/g,'<p>').replace(/<\/input>/g,'</p>')  */
        })
        const $elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
        html2pdf()
            .set({
                margin: 0,
                filename: 'documento.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 3, // A mayor escala, mejores gráficos, pero más peso
                    letterRendering: true,
                },
                jsPDF: {
                    unit: "in",
                    format: "a4",
                    orientation: 'portrait' // landscape o portrait
                }
            })
            .from($elementoParaConvertir)
            .save()
            .catch(err => console.log(err));
           
    });
    
});

var datenow =new Date();
var day = document.getElementById("day")
var month = document.getElementById("month")
var year = document.getElementById("year")
var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
day.innerHTML = "<span>" + datenow.getDate() + "</span>"
month.innerHTML = "<span>" + meses[datenow.getMonth()] + "</span>"
year.innerHTML = "<span>" + datenow.getFullYear() + "</span>"

