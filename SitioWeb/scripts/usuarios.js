function login() {
    const miEmail = document.getElementById("txtEmail").value;
    const miPass = document.getElementById("txtPass").value;

    try {
        fetch('http://localhost:3000/usuarios/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: miEmail,
                pass: miPass
            })
        })
            .then(respuesta => respuesta.text())
            .then(data => {
                if (data === "")
                    alert("Login incorrecto");
                else {
                    localStorage.setItem('id', data);
                    window.location.href = "home.html";
                }

            })
            .catch(error => { throw new Error("Error en la solicitud: " + error) })
    } catch (error) {
        console.error(error)
    }

}

function crear() {
    const miEmail = document.getElementById("txtEmail").value;
    const miPass = document.getElementById("txtPass").value;

    const contraseñaValidaciones = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


    if (miPass.match(contraseñaValidaciones)) {
        try {
            fetch('http://localhost:3000/usuarios/create', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: miEmail,
                    pass: miPass
                })
            })
                .then(alert("Usuario creado"))
                .catch(error => { throw new Error("Error en la solicitud: " + error) })
        } catch (error) {
            console.error(error)
        }
    }
    else {
        alert("La contraseña no cumple con los requisitos.")
    }

}