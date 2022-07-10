/**
 * @WorkShopI: Este script obtiene las funcionalidades de adminUsuario.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */


/**
 * Elementos de Administrar Usuarios
*/
let inputUs=document.getElementById('inputUs');
let inputNombreUs=document.getElementById('inputNombreUs');
let inputCelUs=document.getElementById('inputCelUs');
let inputDireccionUs=document.getElementById('inputDireccionUs');
let inputRolUs=document.getElementById('inputRolUs');
let inputPassUs=document.getElementById('inputPassUs');

let btnNuevoUs = document.getElementById("btnNuevoUs");
let btnModificarUs = document.getElementById("btnModificarUs");

let avisoNuevoUs = document.getElementById("avisoNuevoUs");

let tablaUs = document.getElementById("tablaUs");



/**
 * Funcion agregar usuarios a tabla usuarios
*/
const addNewListaUsuarios = () => {
    tablaUs.innerHTML = "";
    let tr;

    usuarios.forEach((element,i) => {
        tr = document.createElement('tr');
        tr.setAttribute("id",i);

        tr.innerHTML = `<td>${i+1}</td>
                        <td>${element.usuario}</td>
                        <td>${element.nombre}</td>
                        <td>${element.cel}</td>
                        <td>${element.direccion}</td>
                        <td>${element.rol}</td>
                        <td> </td>
                        <td>
                            <a class="btn btn-danger btn-circle btn-sm" onClick="deleteClick(${i})">
                                 <i class="fas fa-trash"></i>
                            </a>
                        </td>`;
                        
        
        tablaUs.appendChild(tr);
    });
}

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

usuarios.length > 0 && addNewListaUsuarios(); //if(usuarios.length > 0) addNewListaUsuarios();

/**
 * Resetear inputs
*/
const resetInputs = () =>{
    inputUs.value ="";
    inputNombreUs.value ="";
    inputCelUs.value ="";
    inputDireccionUs.value ="";
    inputRolUs.value ="";
    inputPassUs.value ="";
}

/**
 * Crear nuevos usuarios
*/
class listaUsuarios{
    constructor(usuario,nombre,cel,direccion,rol,pass){
        this.usuario=usuario;
        this.nombre=nombre;
        this.cel=cel;
        this.direccion=direccion;
        this.rol=rol;
        this.pass=pass;
    }
}

const addUs = () =>{
    let usuario=inputUs.value;
    let nombre=inputNombreUs.value;
    let cel=inputCelUs.value;
    let direccion=inputDireccionUs.value;
    let rol=inputRolUs.value;
    let pass=inputPassUs.value;

    if(usuario !== '' && nombre !== '' && rol !== '' && pass !== ''){
        let nuevoUsuario = new listaUsuarios(usuario,nombre,cel,direccion,rol,pass);
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        avisoNuevoUs.innerHTML = "Nuevo usuario registrado con éxito";
        setTimeout(() => {avisoNuevoUs.innerHTML = ""}, 3000);
        addNewListaUsuarios();
        addDoc();
        resetInputs();
        inicialize();
    }else{
        avisoNuevoUs.innerHTML = "Debe completar los campos de usuario, nombre, rol y password obligatoriamente";
        setTimeout(() => {avisoNuevoUs.innerHTML = ""}, 3000);
        resetInputs();
    }
    
}

/**
 * Botones
*/
btnNuevoUs.onclick = (e) =>{
    e.preventDefault(); // Evita que se recargue la página
    let usuario=inputUs.value;
    const buscado = usuarios.find(usuarioBus=>usuarioBus.usuario===usuario);
    if (buscado){
        avisoNuevoUs.innerHTML = "El usuario ya existe";
        setTimeout(() => {avisoNuevoUs.innerHTML = ""}, 3000);
        resetInputs();
    } else{
        addUs();
    } 
}

btnModificarUs.onclick = (e) =>{
    e.preventDefault(); // Evita que se recargue la página

    let usuario=inputUs.value;
    let nombre=inputNombreUs.value;
    let cel=inputCelUs.value;
    let direccion=inputDireccionUs.value;
    let rol=inputRolUs.value;
    let pass=inputPassUs.value;

    const buscado = usuarios.find(usuarioBus=>usuarioBus.usuario===usuario);
    if (buscado){
        if(nombre !== ''){buscado.nombre = nombre;}
        if(cel !== ''){buscado.cel = cel;}
        if(direccion !== ''){buscado.direccion = direccion;}
        if(rol !== "Seleccione" && rol !== ''){buscado.rol = rol;}
        if(pass !== ''){buscado.pass = pass;}
        localStorage.setItem("usuarios",JSON.stringify(usuarios));
        addNewListaUsuarios()
        avisoNuevoUs.innerHTML = "Usuario modificado con éxito";
        setTimeout(() => {avisoNuevoUs.innerHTML = ""}, 3000);
        resetInputs();
    } else {
        avisoNuevoUs.innerHTML = "El usuario no existe";
        setTimeout(() => {avisoNuevoUs.innerHTML = ""}, 3000);
        resetInputs();
    }
}

deleteClick = (index) =>{
    let deletedUs = usuarios.splice(index, 1); 
    //localStorage.removeItem(index);
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    addNewListaUsuarios(); 
    inicialize(); // actualiza los elementos del Dashboard
}