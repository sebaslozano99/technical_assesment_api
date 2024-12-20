#Prueba Técnica: Desarrollo de CRUD con API REST  

Esta es un REST API desarrollado con Express js, implementando el patrón de arquitectura MVC para la separación de la logica y se integró con mongoDB como base de datos principal y se 
consume información de una base de datos PostgreSQL. Se provee un unico endpoint que funciona en un llamado http GET, con el cual se verifica que exista una persona/owner en la base de 
datos postgreSQL, y si existe, se procede a validar que la informacion extraida de postgreSQL se haya o no migrado a la base de datos de mongoDB. En caso, de que la informacion de la 
persona/owner ya se haya migrado, se responde con un error, de lo contrario se procede a realizar la migración de la informacion.

##DEPENDENCIAS

  * Express ^4.21.2
  * Mongoose ^8.9.2
  * pg ^8.13.1
  * dotenv ^16.4.7

##CONFIGURACION E INSTALACION 

  1. Clonar el repositorio de github e ingresar al repositorio
    git clone https://github.com/sebaslozano99/technical_assesment_api.git
    cd technical_assesment_api

  2. Instalar dependencioas
     npm install

  3. Añadir variables de entorno (Crea un archivo .env en la raíz del proyecto y configura las siguientes variables:)
     DB_USER=ingresar nombre de usuario de tu PostgreSQL base de datos
     DB_HOST=ingresar el hostname de tu PostgreSQL base de datos (ingresar "localhost" si se va a ejecutar localmente)
     DB_PASSWORD=ingresar contraseña de tu PostgreSQL base de datos
     DB_PORT=ingresar el numero de puerto de tu PostgreSQL base de datos (numero predeterminado es 5432, usualmente)
     DB_NAME=ingresar el nombre de tu base de datos en PostgreSQL 
     PORT=ingresa el numero de puerto en que deseas la aplicacion de Express js sea ejecutada
  
