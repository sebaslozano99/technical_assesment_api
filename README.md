# Prueba Técnica: Desarrollo de CRUD con API REST  

Esta es un REST API desarrollado con Express js, implementando el patrón de arquitectura MVC para la separación de la logica y se integró con mongoDB como base de datos principal y se 
consume información de una base de datos PostgreSQL. Se provee un unico endpoint que funciona en un llamado http GET, con el cual se verifica que exista una persona/owner en la base de 
datos postgreSQL, y si existe, se procede a validar que la informacion extraida de postgreSQL se haya o no migrado a la base de datos de mongoDB. En caso, de que la informacion de la 
persona/owner ya se haya migrado, se responde con un error, de lo contrario se procede a realizar la migración de la informacion.

## DEPENDENCIAS

  * Express ^4.21.2
  * Mongoose ^8.9.2
  * pg ^8.13.1
  * dotenv ^16.4.7

## CONFIGURACION E INSTALACION 

  1. Clonar el repositorio de github e ingresar al repositorio
    git clone https://github.com/sebaslozano99/technical_assesment_api.git
    cd technical_assesment_api

  2. Instalar dependencioas
     npm install

  3. Añadir variables de entorno (Crea un archivo .env en la raíz del proyecto y configura las siguientes variables:)
     - DB_USER=ingresar nombre de usuario de tu PostgreSQL base de datos
     - DB_HOST=ingresar el hostname de tu PostgreSQL base de datos (ingresar "localhost" si se va a ejecutar localmente)
     - DB_PASSWORD=ingresar contraseña de tu PostgreSQL base de datos
     - DB_PORT=ingresar el numero de puerto de tu PostgreSQL base de datos (numero predeterminado es 5432, usualmente)
     - DB_NAME=ingresar el nombre de tu base de datos en PostgreSQL 
     - PORT=ingresa el numero de puerto en que deseas la aplicacion de Express js sea ejecutada

  
## CONFIGURACION DE LA BASE DE DATOS POSTGRESQL

Este proyecto utiliza una base de datos relacional (postgreSQL) que contiene 3 tablas (person, cars, pets). Se maneja una relación one-to-many, de manera que una persona puede tener
uno o mas vehiculos (cars) y uno o mas mascotas (pets).

### TABLAS DE LA BASE DE DATOS

1. **Person**:
   - Esta tabla contiene informacion basica de una persona.
   -  Columnas:
      - id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY
      - first_name: VARCHAR(40),
      - last_name: VARCHAR(40)
   - Tabla de ejemplo:
     
      id | first_name | last_name
     ----+------------+------------
       1 | Amy        | Johnson
       2 | Peter      | Carter
       3 | Jennifer   | Strickland
       4 | Tom        | Hill


2. **Cars**
   - Esta tabla contiene la informacion de los vehiculos pertenecientes a cada una de las personas en la tabla "Person".
   - Columnas:
     - id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY
     - person_id: INT FOREIGN KEY,
     - car: VARCHAR(100)
   - Tabla de ejemplo:
     
      id | person_id |       car
     ----+-----------+------------------
       1 |         1 | Mazda 3
       2 |         1 | Nissan Versa
       3 |         2 | Renault Duster
       4 |         2 | Chevrolet Spark
       5 |         4 | Chevrolet Camaro


3. **Pets**
   - Esta tabla contiene la informacion de las mascotas pertenecientes a cada una de las personas en la tabla "Person".
   - Columnas:
     - id: INT NOT NULL AUTO_INCREMENT PRIMARY KEY
     - person_id: INT FOREIGN KEY,
     - pet_name: VARCHAR(40) NOT NULL
     - breed: VARCHAR(40) NOT NULL
   - Tabla de ejemplo:
  
      id | person_id | pet_name |      breed
     ----+-----------+----------+------------------
       1 |         2 | Zeus     | Husky
       2 |         2 | Max      | Husky
       3 |         3 | Star     | German Shepherd
       4 |         3 | Aquiles  | Labrador
       5 |         4 | Thor     | Golden Retriever




