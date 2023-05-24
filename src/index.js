
const todo=document.getElementById("contenedor");
const url="../contenido/datos.json";
let datos;
let comandos=["","",""];

const pantalla=document.createElement("div");
pantalla.classList.add("pantalla");

todo.appendChild(pantalla);

const contenedor=document.createElement("div");
contenedor.classList.add("calculadora");
todo.appendChild(contenedor);

fetch(url)
            .then(response => response.json())
            .then(data => {

                datos=data;

                crearTabla();

            })
            .catch(error => {
                // Manejo de errores en caso de que la solicitud falle
                console.error('Error al cargar el archivo JSON:', error);
            });


function crearBoton(id){
    const btn = document.createElement("button");
    btn.classList.add("btn")
    btn.textContent=datos[id].texto;
    if ((id>9)&&(id!=14) ){
        btn.classList.add("signos");
        if(id==10){
            btn.classList.add("suma");
        }
    } else if(id==14){
        btn.classList.add("igual");
    }
    return btn;
}

function crearTabla(){
    for (let i=0; i<datos.length; i++){
        contenedor.appendChild(crearBoton(i));
    }
}

function operacion(num1,num2,cb){
    return cb(num1,num2);
}

const suma= function(num1,num2){
    return parseInt(num1)+parseInt(num2);
}
const resta= function(num1,num2){
    return parseInt(num1)-parseInt(num2);
}
const multiplicacion= function(num1,num2){
    return parseInt(num1)*parseInt(num2);
}
const division=function(num1,num2){
    if (num2!=0){
        return parseInt(num1)/parseInt(num2);
    } else return"error";
}

let i=0;
contenedor.addEventListener("click",(e)=>{
    const botonClickeado = e.target.closest("button");
    if (botonClickeado){
        switch(botonClickeado.textContent){
            case "+":
                if (i==0){
                    i=1;
                    pantalla.textContent+=botonClickeado.textContent;
                    comandos[i]=suma;
                    i=2;
                }
            break;
            case "-":
                if (i==0){
                    i=1;
                    pantalla.textContent+=botonClickeado.textContent;
                    comandos[i]=resta;
                    i=2;
                }
            break;
            case "*":
                if (i==0){
                    i=1;
                    pantalla.textContent+=botonClickeado.textContent;
                    comandos[i]=multiplicacion;
                    i=2;
                }
            break;
            case "/":
                if (i==0){
                    i=1;
                    pantalla.textContent+=botonClickeado.textContent;
                    comandos[i]=division;
                    i=2;
                }
            break;
            case "=":
                pantalla.textContent=operacion(comandos[0],comandos[2],comandos[1]);
                i=3;
            break;
            default:
                if(i!=3){
                    pantalla.textContent+=botonClickeado.textContent;
                    comandos[i]+=botonClickeado.textContent;
                } else {
                    comandos=["","",""];
                    i=0;
                    pantalla.textContent=botonClickeado.textContent;
                    comandos[i]=botonClickeado.textContent;
                }
            break;
        }
        console.log(`${comandos[0]} & ${comandos[2]} & ${comandos[1]}`);
    }
});