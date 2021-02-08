// Set up the canvas
var firmas = document.querySelectorAll('#firma')
let clearPaciente = document.getElementById('clearp')
let clearAnest = document.getElementById('cleara')

firmas.forEach(element=>{
    renderCanvasId(element)
} )

 //clear canvas
if(clearPaciente)clearPaciente.addEventListener("click", clearFirmaPaciente)

function clearFirmaPaciente(){
    firmas[0].width = firmas[0].width;
}
if(clearAnest)clearAnest.addEventListener("click", clearFirmaAnest)

function clearFirmaAnest(){
    firmas[1].width = firmas[1].width;
}

function renderCanvasId(canvas){
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#222222";
    ctx.lineWith = 2;   

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
}

document.addEventListener("DOMContentLoaded", () => {
    // Escuchamos el click del botón
    const $boton = document.querySelector("#btnCrearPdf");
    
    if($boton){
        $boton.addEventListener("click", () => {
            let inputs = document.querySelectorAll("input")
            let array = [... inputs]
            let deleteStyle = document.getElementById('container')
    
            let alergia1 = document.getElementById('alergia1')
            let alergia2 = document.getElementById('alergia2')
            let alergia3 = document.getElementById('alergia3')
    
            if(alergia1){
                if(alergia1.value == ''){
                    alergia1.value = ' **********'
                }
            }
            if(alergia2){
                if(alergia2.value == ''){
                    alergia2.value = ' **********'
                }
            }
            if(alergia3){
                if(alergia3.value == ''){
                    alergia3.value = ' **********'
                }
            }
    
            let displayFirmas = document.getElementById('firmas')
            console.log(displayFirmas)
            displayFirmas.style.display = "flex"
            displayFirmas.style.flexDirection = "space-between"
    
            deleteStyle.classList.remove('container')
    
            clearPaciente.style.display = "none"
            if(clearAnest) clearAnest.style.display = "none"
            $boton.style.display = "none"
            firmas.forEach(firma=>firma.style.border = 'none')
    
            const cedula = document.getElementById("cedula")
            if (cedula)var valueCedula = cedula.value
            const cedula1 = document.getElementById("cedula1")
            cedula1.innerHTML = "<span>" + valueCedula + "</span>"
            array.forEach(function(v){
                let val = v.value
                let element = document.createElement("span")
                element.innerHTML ="<span>" + val + "</span>"
                v.parentNode.replaceChild(element, v)            
                /* this.replace(/<input[^>]*>/g,'<p>').replace(/<\/input>/g,'</p>')  */
            })
            const elementoParaConvertir = document.body; // <-- Aquí puedes elegir cualquier elemento del DOM
            html2pdf()
                .set({
                    margin: [15, 20, 30, 15],
                    filename: valueCedula +'.pdf',
                    image: {
                        type: 'jpeg',
                        quality: 1
                    },
                    html2canvas: {                   
                        scale: 3, // A mayor escala, mejores gráficos, pero más peso
    /*                     //width: elementoParaConvertir.offsetWidth,
                        windowWidth: elementoParaConvertir.offsetWidth * 5, */
                        letterRendering: true,
                    },
                    isToggleStyle: true,
                    useCORS: true,
                    useDefaultFoot: true,
                    
                    jsPDF: {
                        orientation: 'p',
                        unit: 'mm',
                        format: 'a4',
                        putOnlyUsedFonts:true,
                        floatPrecision: 16
                    },
                    pagebreak: {
                        after: '.next-page'
                    }
                })
                .from(elementoParaConvertir)
                .save()
                .catch(err => console.log(err));
               
        });
    }
    
});

var datenow =new Date();
var day = document.getElementById("day")
var month = document.getElementById("month")
var year = document.getElementById("year")

var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
if (day)day.innerHTML = "<span>" + datenow.getDate() + "</span>"
if(month)month.innerHTML = "<span>" + meses[datenow.getMonth()] + "</span>"
if(year)year.innerHTML = "<span>" + datenow.getFullYear() + "</span>"

let date = document.getElementById('date')
if(date) date.innerHTML = "<span>" + formatDate(datenow) + "<span>"

function formatDate(date) {
    let d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

let time = document.getElementById("time")

if(time) time.innerHTML = "<span>" + formatAMPM(datenow) + "<span>"

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

 /* onclone: (element) => {
                        const svgElements = Array.from(element.querySelectorAll('svg'));
                        console.log(svgElements)
                        svgElements.forEach(s => {
                            const bBox = s.getBBox();
                            s.setAttribute("x", 0);
                            s.setAttribute("y", 0);
                            s.setAttribute("width", bBox.width);
                            s.setAttribute("height", bBox.height);
                        })
                    }, */