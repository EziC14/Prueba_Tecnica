                                    Documentación de Ejecución de la Aplicación

Para el proyecto se utilizo:

    Node.js
    Express
    MySQL
    JS Nativo
    HTML and CSS
    JWT

Para probar el sistema seguir estos pasos:

    1. Clonar el repositorio. En él encontrarás todos los archivos necesarios para poner en marcha el sistema.
    2. Descargar "ScriptMySQL.sql", donde encontrarás todo el script para la base de datos.
    3. Abrir el repositorio clonado con Visual Studio Code.
    4. Busca en la carpeta API el archivo "connection.js". Ahí debes modificar y agregar las credenciales que tengas registradas en MySQL.
    5. Abrir la terminal y dirigirse a la carpeta "API".
    6. Una vez ubicado ahí, utiliza el siguiente comando: "node index.js". Este comando iniciará la conexión a la base de datos.
    7. Por último, con ayuda de la extensión "Live Server" de Visual Studio, inicia el proyecto en "login.html".

Por si existe un problema al usar "node index.js"

    Utilizaremos el siguiente comando en una consulta de MySQL "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';"
    
