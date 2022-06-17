document.getElementById('formularioNotas').addEventListener('submit', saveNotas);

/* FUNCION PARA AGREGAR NOTAS*/
function saveNotas(e){

    let tituObt = document.getElementById('titulo').value;
    let descObt = document.getElementById('descripcion').value;

    const datosObt = {
        tituObt,
        descObt
    };

    if (localStorage.getItem('datosObt') === null){
        let notasArray = [];
        notasArray.push(datosObt);
        localStorage.setItem('datosObt', JSON.stringify(notasArray));
    }
    
    else{
        let notas = JSON.parse(localStorage.getItem('datosObt'));
        notas.push(datosObt);
        localStorage.setItem('datosObt', JSON.stringify(notas));
    }
    getNotas();
    document.getElementById('formularioNotas').reset();
    e.preventDefault();
}

/* FUNCION PARA VER LAS NOTAS GUARDADAS */
function getNotas(){
    let obtNotas = JSON.parse(localStorage.getItem('datosObt'));
    let verNotas = document.getElementById('all-notas');

    verNotas.innerHTML = '';

    for(let i = 0; i < obtNotas.length; i++){
        let tituloN = obtNotas[i].tituObt;
        let descN = obtNotas[i].descObt;

        verNotas.innerHTML += `<div class="card mb-3 border-primary">
        <div class="card">
        <div class="card-header">
        <p class="text-left">Título: ${tituloN}</p>
        </div>
        <div class="card-body">
        <p>${descN}</p>
        <a class="btn btn-outline-danger"  onclick="deleteNotas('${tituloN}')">Eliminar</a>
        </div>
        </div>
        </div>`
    }
}

/*FUNCION PARA ELIMINAR NOTAS*/
function deleteNotas(tituloN){
    let notaBorr = JSON.parse(localStorage.getItem('datosObt'));
    for(let i = 0; i < notaBorr.length; i++){
        if(notaBorr[i].tituObt == tituloN){
            notaBorr.splice(i, 1);
        }
    }
    localStorage.setItem('datosObt', JSON.stringify(notaBorr));
    getNotas();
}
getNotas();