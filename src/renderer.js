//variables globales
let direccion = "http://localhost:3000/"

//modulos
import {reset} from "./reset.js";

//tabla obras sociales
const arrObrasSociales = [];
const inputObraSocial = document.getElementById("obrasocial");

//elementos
const arrInputs = document.querySelectorAll(".input")
const arrTextArea = document.querySelectorAll(".textarea")

const submiting = document.getElementById("submit")

const buscando = document.getElementById("buscando");
const buscador = document.getElementById("buscador");


//inicio del programa
fetch(direccion + "get/obrassociales").then(x => x.json()).then(res =>{
    res.forEach(x =>{
        if(x.nombre){
            arrObrasSociales.push(x.nombre);
            inputObraSocial.innerHTML += `<option value="${x.nombre}">`
        }
        
    })
})
window.onload = reset(direccion)


// AL AGREGAR UN PACIENTE
submiting.addEventListener("click",(e)=>{
    e.preventDefault();
    let validate = true;
    const objToSave = {};

    if(arrInputs[0].value) objToSave.nombre = arrInputs[0].value
    else validate = false;
    if (arrInputs[1].value) objToSave.apellido = arrInputs[1].value
    else validate = false;
    if (arrInputs[2].value) objToSave.dni = arrInputs[2].value
    if (arrInputs[3].value) {
        if(!arrObrasSociales.includes(arrInputs[3].value)) {
        const seleccion = confirm("Esa obra social no se encuentra en la base de datos. Querés registrarla?");
        if(!seleccion) validate = false;
        else {
            fetch("http://localhost:3000/obrassociales/" + arrInputs[3].value,
                    {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: "POST"
                }).then(x => x.json()).then(x => alert(x.result));
            arrObrasSociales.push(arrInputs[3].value)
            inputObraSocial.innerHTML += `<option value="${arrInputs[3].value}">`
        }
    }
        objToSave.obrasocial = arrInputs[3].value
    }
    if (arrInputs[4].value) objToSave.carnet = arrInputs[4].value
    if(arrTextArea[0].value) objToSave.diagnostico = arrTextArea[0].value
    if(arrTextArea[1].value) objToSave.antecedentes = arrTextArea[1].value
    if(arrTextArea[2].value) objToSave.tratamiento = arrTextArea[2].value;
 

    if (validate) {
        fetch("http://localhost:3000/", {

            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(objToSave)

        }).then(res => {
            reset(direccion);
        })
        //BORRA LOS DATOS DE LA PANTALLA
        arrInputs.forEach(x => x.value = "");
        arrTextArea.forEach(x => x.value = "")
    }
})

//BUSCAR UN PACIENTE

const rNombre = document.getElementById("r1")
const rApellido  = document.getElementById("r2")
const rDni = document.getElementById("r3")
const rObraSocial = document.getElementById("r4")
const rCarnet = document.getElementById("r5")

buscador.addEventListener("click", (e) =>{
    e.preventDefault();
    if(rNombre.checked) {
        let direc = ""
        if(buscando.value){
            direc = direccion + `campos/nombre/${buscando.value}`
        }else{
            direc = direccion +`orden/nombre/`
        }
        console.log(direc)
        reset(direc)
    }    
    if (rApellido.checked) {
        let direc = ""
        if(buscando.value){
            direc = direccion + `campos/apellido/${buscando.value}`
        }else{
            direc = direccion +`orden/apellido/`
        }
        reset(direc)
    }
    if (rDni.checked) {
        let direc = ""
        if(buscando.value){
            direc = direccion + `campos/dni/${buscando.value}`
        }else{
            direc = direccion +`orden/dni/`
        }
        reset(direc)
    }
    if (rObraSocial.checked) {
        let direc = ""
        if(buscando.value){
            direc = direccion + `campos/obrasocial/${buscando.value}`
        }else{
            direc= direccion + `orden/obrasocial/`
        }
        reset(direc)
    }
    if (rCarnet.checked) {
        let direc = ""
        if(buscando.value){
            direc = direccion + `campos/carnet/${buscando.value}`
        }else{
            direc = direccion +`orden/carnet/`
        }
        reset(direc)
    }

})