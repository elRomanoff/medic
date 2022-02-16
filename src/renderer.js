const direccion = "http://localhost:3000/"

const tableBody = document.getElementById("table-body")
const inputs = document.getElementById("inputs")
const arrInputs = inputs.children
const submiting = document.getElementById("submit")

async function reset() {
    tableBody.innerHTML = ""
    const response = fetch(direccion)
        .then(res => res.json())
        .then((res) => {
            const tableToInsert = document.createDocumentFragment()
            res.forEach(x => {
                const newTable = document.createElement("tr")
                newTable.innerHTML = `
            <td>${x.nombre}</td>
            <td>${x.apellido}</td>
            <td>${x.dni}</td>
            <td>${x.obrasocial}</td>
            <td>${x.carnet}<td>
            `
                tableToInsert.appendChild(newTable)
            })
            tableBody.appendChild(tableToInsert)
        })
}

window.onload = reset()

submiting.addEventListener("click",(e)=>{
    e.preventDefault();
    let validate = true;
    const objToSave = {};
    if(arrInputs[0].value) objToSave.nombre = arrInputs[0].value
    else validate = false;
    if (arrInputs[1].value) objToSave.apellido = arrInputs[1].value
    else validate = false;
    if (arrInputs[2].value) objToSave.dni = arrInputs[2].value
    else validate = false;
    if (arrInputs[3].value) objToSave.obrasocial = arrInputs[3].value
    else validate = false;
    if (arrInputs[4].value) objToSave.carnet = arrInputs[4].value
    else validate = false;

    if(validate) fetch(direccion , {
        
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(objToSave)
        
    }).then(res => {
        console.log(res);
        reset();
    })
})
