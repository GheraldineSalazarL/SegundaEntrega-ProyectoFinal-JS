/**
 * @WorkShopI: Este script obtiene del Dashboard.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */

/**
 * Elementos del Dashboard
 */
 let totalUser = document.getElementById("totalUser");
 //let totalEst = document.getElementById("totalEst");
 let totalGrup = document.getElementById("totalGrup");
 //let totalReport = document.getElementById("totalReport");

 const inicialize = ()=>{
    let totalUsList = getTotalUs();
    let totalGrupList = getTotalGrup();

    /*
    let totalEstList = getTotalES();
    let totalReportList = getTotalReport(); */

    if(totalUsList===0){
        totalUser.innerHTML = 0;
    }else{
        totalUser.innerHTML = localStorage.getItem('totalUser');
    }
    
    if(totalGrupList===0){
        totalGrup.innerHTML = 0;
    }else{
        totalGrup.innerHTML = localStorage.getItem('totalGrup');
    }
   
}

const getTotalUs =()=>{
    let total = JSON.parse(localStorage.getItem("usuarios"));
    if(total !== null){
        localStorage.setItem('totalUser',total.length);
        return total.length;
    }else{
        return 0;
    }
}

const getTotalGrup =()=>{
    let total = JSON.parse(localStorage.getItem("grupos"));
    if(total !== null){
        localStorage.setItem('totalGrup',total.length);
        return total.length;
    }else{
        return 0;
    }
}

inicialize();