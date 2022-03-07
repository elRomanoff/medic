import methods from "./methods.js";

let dir = ""
let usingNode
const pages = document.querySelector(".page")

function enter(e){
    const keyName = e.key;
    if(keyName == "Enter"){
        const fakeEvent ={
            target: usingNode.firstChild.childNodes[1]
        }
        updateDelete(fakeEvent)
        document.removeEventListener('keydown', enter);
    }
}

function updateDelete(e){
    {
        if (e.target.classList[1] === "eliminar") {
            e.stopPropagation()
            fetch("http://localhost:3000/deletebyid/" + e.target.parentNode.classList[0], {
                method: "DELETE"
            })
                .then(res => res.text())
                .then(res => {
                    alert(res)
                    reset(dir)
                })
        }
        else if (e.target.classList[1] === "editar") {
            e.target.nextElementSibling.classList.remove("hidden")
            let next = e.target.parentNode.nextElementSibling;
            e.target.remove()

            //convertir los td en inputs para actualizar
            while (next) {
                const input = document.createElement("input");
                input.setAttribute("type", "text");
                input.addEventListener("click", (e) => e.stopPropagation())
                input.value = next.innerHTML
                next.innerHTML = ""
                next.appendChild(input);
                next = next.nextElementSibling;
            };
            usingNode = this

            //focus on the first input
            this.firstElementChild.nextElementSibling.firstElementChild.focus()

            //convierte en textArea los <p> extras para actualizarlos
            next = this.nextElementSibling.firstElementChild.nextElementSibling.children;
            let nextArray = Array.from(next)

            nextArray.forEach(x=>{
                let arrFinished = methods.transformer(x.innerHTML)
                const input = document.createElement("textarea")
                input.value = arrFinished[0];
                input.classList.add("bigger")
                input.classList.add(arrFinished[1])
                x.parentNode.appendChild(input)
                x.remove()
            })
            document.addEventListener('keydown', enter);
        }
        else if (e.target.classList[1] === "check"){
            document.removeEventListener('keydown', enter);
            e.target.classList.add("hidden")

            const icon = document.createElement("img")
            icon.classList.add("icon","editar")
            icon.src = "./media/editar.png"
            e.target.parentNode.insertBefore(icon, e.target)

            let next = e.target.parentNode.nextElementSibling;

            let arrToUpdate = []
            while(next){
                let text = next.firstChild.value;
                arrToUpdate.push(text);
                next.innerHTML = next.firstElementChild.value;
                next = next.nextElementSibling;
            }
            let editedList = e.target.parentNode.parentNode.nextElementSibling.children[1].children
            const editedArr = Array.from(editedList)
            
            editedArr.forEach(x =>{
                const text = x.value
                arrToUpdate.push(text)

                const textReturn = document.createElement("p")
                textReturn.innerHTML = `${x.classList[1]} ${text}`
                x.parentNode.appendChild(textReturn)
                x.remove()
            })
            
            fetch("http://localhost:3000/" + e.target.parentNode.classList[0], {
        
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(arrToUpdate),
                method: "PUT"
            }).then(x => x.json()).then(res => console.log(res))
        }
    }
}


function reset(direccion, page) {

    function createLink(num) {
        const link = document.createElement("a");
        link.innerHTML = num;
        link.addEventListener("click", () => {
            reset(direccion, "page/" + num)
        })
        return link
    }
    pages.innerHTML = ""
    fetch(direccion + "count").then(res =>res.json())
    .then(x =>{
        if(x[0] > 10){
            if (pages.classList[1] === "hidden") pages.classList.remove("hidden");
            if(x[0] > 70){
                let pageNumber
                if(!page) pageNumber = 0;
                else{
                    const splitted = page.split("")
                    pageNumber = splitted[splitted.length]
                }
                
                const link1 = createLink(pageNumber);
                const link2 = createLink(pageNumber +1);
                const link3 = createLink(pageNumber +2);
                const link4 = createLink(x[0]/10 + 1)
                const link5 = createLink(x[0]/10)
                const link6 = createLink(x[0]/10 - 1)
                const fragment = document.createElementFragment()
                fragment.appendChild(link1, link2, link3, link4, link5, link6)
                pages.appendChild(fragment);
            }
            else {
                   for (let i = 1; i < (x[0] / 10 + 1);i++) {
                    const link = createLink(i)
                    pages.appendChild(link)
                }
            }
         
        }
    })
    
    
    if(!page) page = ""
    dir = direccion
    const tableBody = document.getElementById("table-body")
    tableBody.innerHTML = ""

        fetch(direccion + page)
            .then(res => res.json())
            .then((res) => {
                const tableToInsert = document.createDocumentFragment()
                res.forEach(x => {   
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
                        newTable.addEventListener("click", (e) =>{e.stopPropagation(); message.classList.toggle("hidden")})
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
                <td>${methods.upperCase(x.nombre)}</td>
                <td>${methods.upperCase(x.apellido)}</td>
                <td>${x.dni}</td>
                <td>${methods.upperCase(x.obrasocial)}</td>
                <td>${x.carnet}</td>
                `
                    tableToInsert.appendChild(newTable)
                    tableToInsert.appendChild(messageTable)
                })
                tableBody.appendChild(tableToInsert)
            }
            )

}

export default reset