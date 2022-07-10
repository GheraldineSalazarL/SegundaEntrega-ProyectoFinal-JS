/**
 * @WorkShopI: Este script obtiene las funcionalidades de adminGrupo.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */


/**
 * Elementos de Administrar de Grupo
*/
let btnNuevoGrup = document.getElementById("btnNuevoGrup");

let btnEditarGrup = document.getElementById("btnEditarGrup");
let btnEliminarGrup = document.getElementById("btnEliminarGrup");

let inputCodGrup=document.getElementById('inputCodGrup');
let inputNombreGrup=document.getElementById('inputNombreGrup');
let opcionDoc=document.getElementById('opcionDoc');
let btnCrearGrup = document.getElementById("btnCrearGrup");

let btnModificarGrup = document.getElementById("btnModificarGrup");


const addNewGrupo = () => {
    cardGrupos.innerHTML = "";
    let card;

    grupos.forEach((element,i) => {
        card = document.createElement('card');
        card.setAttribute("id",i);

        card.innerHTML = `<div class="p-2 mb-4" >
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body pt-2 pb-2 pr-4 pl-4">
                                    <div class="row no-gutters align-items-center pb-2">
                                        <div class="col mr-2">
                                            <div class="h8 font-weight-bold text-info text-uppercase mb-1" id="nombreGrupo">${element.codGrupo} </div>
                                            <div class="text-xs mb-0 font-weight-bold text-gray-800" id="numEstud">${element.nombreGrupo}</div>
                                            <div class="text-xs mb-0 font-weight-bold text-gray-800" id="numEstud">${element.docGrupo}</div>
                                            <div class="text-xs mb-0 font-weight-bold text-gray-800" id="numEstud">${element.numeroEstudiantes}</div>
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa-solid fa-address-book fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    <a class="btn btn-danger btn-circle btn-sm" onClick="deleteClickGrup(${i})">
                                 <i class="fas fa-trash"></i>
                            </a>
                                </div>
                            </div>
                        </div>`;
                        
        cardGrupos.appendChild(card);
    });
}
let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

grupos.length > 0 && addNewGrupo(); //if(grupos.length > 0) addNewGrupo();

/**
 * Resetear inputs
*/
const resetInputsgrup = () =>{
    inputCodGrup.value ="";
    inputNombreGrup.value ="";
    opcionDoc.value ="";
    inputCodGrupE.value ="";
    inputNombreGrupE.value ="";
    opcionDoc2.value ="";
}

/**
 * Crear nuevos grupos
*/
class listaGrupos{
    constructor(codGrupo,nombreGrupo, docGrupo, numeroEstudiantes){
        this.codGrupo=codGrupo;
        this.nombreGrupo=nombreGrupo;
        this.docGrupo=docGrupo;
        this.numeroEstudiantes=numeroEstudiantes;
    }
}
const addGrup = () =>{
    let codGrupo=inputCodGrup.value;
    let nombreGrupo=inputNombreGrup.value;
    let docGrupo=opcionDoc.value;
    let numeroEstudiantes=""; //Luego agrego numero de estudiantes

    if(codGrupo !== '' && nombreGrupo !== '' && docGrupo !== ''){
        let nuevoGrupo = new listaGrupos(codGrupo,nombreGrupo, docGrupo, numeroEstudiantes);
        grupos.push(nuevoGrupo);
        localStorage.setItem("grupos", JSON.stringify(grupos));
        avisoNuevoGrup.innerHTML = "Nuevo grupo registrado con éxito";
        setTimeout(() => {avisoNuevoGrup.innerHTML = ""}, 3000);
        addNewGrupo();
        resetInputsgrup();
        //inicialize();
    }else{
        avisoNuevoGrup.innerHTML = "Debe completar todos los campos";
        setTimeout(() => {avisoNuevoGrup.innerHTML = ""}, 3000);
        resetInputsgrup();
    }
}

/**
 * Botones
*/
let section = true;
formNuevoGrupo.className = 'oculto';
formEditarGrupo.className = 'oculto';
const manageSection = ()=>{
    section = !section;
    
    switch (section) {
        case true:
            formNuevoGrupo.className = 'oculto';
            formEditarGrupo.className = 'visible';
            break;
        case false:
            formNuevoGrupo.className = 'visible';
            formEditarGrupo.className = 'oculto';
            break;
    }

}
btnNuevoGrup.onclick = manageSection;
btnEditarGrup.onclick = manageSection;


btnCrearGrup.onclick = (e) =>{
    e.preventDefault(); // Evita que se recargue la página
    let codGrupo=inputCodGrup.value;
    const buscadog = grupos.find(grupoBus=>grupoBus.codGrupo===codGrupo);
    if (buscadog){
        avisoNuevoGrup.innerHTML = "El grupo ya existe";
        setTimeout(() => {avisoNuevoUs.innerHTML = ""}, 3000);
        resetInputsgrup();
    } else{
        addGrup();
    } 
}

btnModificarGrup.onclick = (e) =>{
    e.preventDefault(); // Evita que se recargue la página
    let inputCodGrupE=document.getElementById('inputCodGrupE');
    let inputNombreGrupE=document.getElementById('inputNombreGrupE');
    let opcionDoc2=document.getElementById('opcionDoc2');

    let codGrupo=inputCodGrupE.value;
    let nombreGrupo=inputNombreGrupE.value;
    let docGrupo=opcionDoc2.value;
    console.log(codGrupo);
    const buscadoGrup= grupos.find(grupoBus=>grupoBus.codGrupo===codGrupo);
    console.log(buscadoGrup);
    if (buscadoGrup){
        if(nombreGrupo !== ''){buscadoGrup.nombreGrupo = nombreGrupo;}
        if(docGrupo !== "Seleccione" && docGrupo !== ''){buscadoGrup.docGrupo = docGrupo;}
        localStorage.setItem("grupos",JSON.stringify(grupos));
        addNewGrupo()
        avisoNuevoGrupE.innerHTML = "Grupo editado con éxito";
        setTimeout(() => {avisoNuevoGrup.innerHTML = ""}, 3000);
        resetInputsgrup();
    } else {
        avisoNuevoGrupE.innerHTML = "El grupo no existe";
        setTimeout(() => {avisoNuevoGrup.innerHTML = ""}, 3000);
        resetInputsgrup();
    }
}

deleteClickGrup = (index) =>{
    let deletedGrup = grupos.splice(index, 1); 
    localStorage.setItem("grupos",JSON.stringify(grupos));
    addNewGrupo(); 
   //inicialize(); // actualiza los elementos del Dashboard
}

// /**
//  * Listado docentes
// */

const addDoc = () => {
   
    opcionDoc.innerHTML = "";
    let option;
    let filtrado = usuarios.filter(usuarioFil=>usuarioFil.rol==="Docente");
    filtrado.forEach((element,i) => {
        option = document.createElement('option');
        option.setAttribute("value",`${element.nombre}`);
        console.log(option.value);
        option.innerHTML = `${element.nombre}`;
        opcionDoc.appendChild(option);
        console.log(option);
    });
}
const addDoc2 = () => {
   
    opcionDoc2.innerHTML = "";
    let option;
    let filtrado = usuarios.filter(usuarioFil=>usuarioFil.rol==="Docente");
    filtrado.forEach((element,i) => {
        option = document.createElement('option');
        option.setAttribute("value",element.nombre);
        option.innerHTML = `${element.nombre}`;
        opcionDoc2.appendChild(option);
    });
}
usuarios.length > 0 && addDoc();// if(usuarios.length > 0) addDoc();
usuarios.length > 0 && addDoc2();//if(usuarios.length > 0) addDoc2();