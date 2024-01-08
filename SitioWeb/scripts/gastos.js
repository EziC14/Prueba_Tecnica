const idUsuario = localStorage.getItem('id');

const input = document.getElementById('fotoComprobante');
let urlImagenCadena = ''; 

input.addEventListener('change', function() {
    const archivoSeleccionado = input.files[0];

    if (archivoSeleccionado) {
        const lector = new FileReader();

        lector.onload = function(evento) {
            const urlImagen = evento.target.result;

            urlImagenCadena = urlImagen;

            const img = document.createElement('img');
            img.src = urlImagen;
            document.body.appendChild(img);
        };

        lector.readAsDataURL(archivoSeleccionado);
    }
});

function misGastos() {
    const id = idUsuario;
    try {
        fetch(`http://localhost:3000/verGastos/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(respuesa => respuesa.json())
        .then(data => cargarGastos(data))
        .catch(error => { throw new Error("Error en la solicitud: " + error) })
    } catch (error) {
        console.error(error)
    }
}

function mostrarImagenEnOtraPestana(urlImagen) {
    const nuevaPestana = window.open();
    nuevaPestana.document.body.innerHTML = `<img src="${urlImagen}" alt="Comprobante">`;
}

function cargarGastos(data) {
    const tabla = document.createElement('table');
    tabla.className = "tabla-gastos";

    const encabezados = ['RUC','Categoría', 'Fecha', 'Monto', 'Comprobante', 'Acciones'];
    const encabezadosRow = document.createElement('tr');

    encabezados.forEach(encabezado => {
        const th = document.createElement('th');
        th.textContent = encabezado;
        encabezadosRow.appendChild(th);
    });

    tabla.appendChild(encabezadosRow);

    data.forEach(item => {
        const fila = document.createElement('tr');
        
        const rucCell = document.createElement('td');
        rucCell.textContent = item.ruc;
        fila.appendChild(rucCell);

        const categoriaCell = document.createElement('td');
        categoriaCell.textContent = item.categoria;
        fila.appendChild(categoriaCell);

        const fechaCell = document.createElement('td');
        const fechaTexto = item.fecha.substring(0, 10);
        fechaCell.textContent = fechaTexto;
        fila.appendChild(fechaCell);

        const montoCell = document.createElement('td');
        montoCell.textContent = "$" + item.monto;
        fila.appendChild(montoCell);

        const imagenCell = document.createElement('td');
        const imagen = document.createElement('img');
        imagen.src = item.fotoComprobante;
        imagen.alt = "Comprobante";
        imagenCell.appendChild(imagen);
        fila.appendChild(imagenCell);

        const verBtnCell = document.createElement('td');
        const verBtn = document.createElement('button');
        verBtn.textContent = 'Ver';
        verBtn.className = 'boton-ver'; 
        verBtn.onclick = function() {
            mostrarImagenEnOtraPestana(item.fotoComprobante);
        };
        verBtnCell.appendChild(verBtn);
        fila.appendChild(verBtnCell);
    
        tabla.appendChild(fila);
    });

    const contenedor = document.getElementById('div-gastos');
    contenedor.appendChild(tabla);
}

function redirigir() {    
    window.location.href = 'visualizarGastos.html';
}

function validarFormulario() {
    const monto = document.getElementById('monto').value;
    const categoria = document.getElementById('categoria').value;
    const ruc = document.getElementById('ruc').value;
    const fotoComprobante = document.getElementById('fotoComprobante').value;
    const fecha = document.getElementById('fecha').value;

    if (monto === '' || categoria === '' || ruc === '' || fotoComprobante === '' || fecha === '') {
        return false;
    }
    return true;
}

function crear() {

    const monto = document.getElementById('monto').value;
    const categoria = document.getElementById('categoria').value;
    const ruc = document.getElementById('ruc').value;
    const fecha = document.getElementById('fecha').value;
    const id = idUsuario;
    if (validarFormulario()) {
        try {
            fetch(`http://localhost:3000/gastos/create/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "origin": "http://localhost:3000"
                },
                body: JSON.stringify({
                    monto: monto,
                    categoria: categoria,
                    ruc: ruc,
                    foto: urlImagenCadena,
                    fecha: fecha
                })
            })
            .then(alert("Registro de Gasto fue Creado"))
            .catch(error => { throw new Error("Error en la solicitud: " + error) })
    } catch (error) {
        console.error(error)
    }
    }else{
        alert('Por favor, complete todos los campos.');
    }
}



