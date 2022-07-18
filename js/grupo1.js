/**
 * @WorkShopI: Este script obtiene del Dashboard.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */

function cargarEstudiantes(){
    console.log(fetch('data/data.js'))

 let listado = document.getElementById('tablaEst');
 fetch('data/data.js')
  .then((res) => res.json())
  .then(data => {
    data.forEach((data)=>{
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>${data.id}</td>
                        <td>${data.first_name}</td>
                        <td>${data.last_name}</td>
                        <td>${data.email}</td>
                        <td>${data.gender}</td>`;
        listado.append(tr);
    });
    });
}

cargarEstudiantes();