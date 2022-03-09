import {reset, updateDelete} from "./reset.js"
import methods from "./methods.js"

//this function builds the main table

const builder = (x, tableToInsert) =>{
    const messageTable = document.createDocumentFragment()
    const message = document.createElement("tr")
    message.classList.add("hidden", "message-container")
    const closer = document.createElement("th")
    closer.innerHTML = "X"
    closer.classList.add("message-close")
    closer.addEventListener("click", (e) => e.target.parentNode.classList.add("hidden"))
    const content = document.createElement("th")
    content.setAttribute("colspan", "7")
    content.classList.add("message")
    content.innerHTML = `<p>Diagnóstico: ${x.diagnostico} </p> <p>Antecedentes: ${x.antecedentes}</p> <p>Tratamiento: ${x.tratamiento}</p>`

    message.appendChild(closer);
    message.appendChild(content)
    messageTable.appendChild(message)

    const newTable = document.createElement("tr")
    newTable.classList.add("tr")
    newTable.addEventListener("click", (e) => { e.stopPropagation(); message.classList.toggle("hidden") })
    const deleteTd = document.createElement("td")
    deleteTd.classList.add(x.id)
    const icon1 = document.createElement("img");
    const icon2 = document.createElement("img");
    const icon3 = document.createElement("img")

    icon1.src = "./media/eliminar.png"
    icon2.src = "./media/editar.png"
    icon3.src = "./media/check.jpg"
    icon1.classList.add("icon", "eliminar")
    icon2.classList.add("icon", "editar")
    icon3.classList.add("icon", "check", "hidden")


    deleteTd.appendChild(icon1)
    deleteTd.appendChild(icon2)
    deleteTd.appendChild(icon3)



    newTable.appendChild(deleteTd)
    newTable.addEventListener("click", updateDelete)
    newTable.innerHTML += ` 
                <td>${methods.firstToUpperCase(x.nombre)}</td>
                <td>${methods.firstToUpperCase(x.apellido)}</td>
                <td>${x.dni}</td>
                <td>${methods.firstToUpperCase(x.obrasocial)}</td>
                <td>${x.carnet}</td>
                `
    tableToInsert.appendChild(newTable)
    tableToInsert.appendChild(messageTable)
}

export default builder