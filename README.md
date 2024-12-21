# Prueba Técnica: REST API 

Esta es un REST API desarrollado con Express js, implementando el patrón de arquitectura MVC para la separación de la logica y se integró con mongoDB como base de datos principal y se 
consume información de una base de datos PostgreSQL. Se provee un unico endpoint que funciona en un llamado http GET, con el cual se verifica que exista una persona/owner en la base de 
datos postgreSQL, y si existe, se procede a validar que la informacion extraida de postgreSQL se haya o no migrado a la base de datos de mongoDB. En caso, de que la informacion de la 
persona/owner ya se haya migrado, se responde con un error, de lo contrario se procede a realizar la migración de la informacion.


##PRE-REQUISITOS

Antes de configurar la base de datos y ejecutar el proyecto, asegurate de tener instalado:
   * Node js
   * MongoDB
   * PostgreSQL

## DEPENDENCIAS

  * Express ^4.21.2
  * Mongoose ^8.9.2
  * pg ^8.13.1
  * dotenv ^16.4.7

## CONFIGURACION E INSTALACION 

  1. Clonar el repositorio de github e ingresar al repositorio
```
    git clone https://github.com/sebaslozano99/technical_assesment_api.git
    cd technical_assesment_api
```


  2. Instalar dependencioas
```
     npm install
```


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

### DATABASE SCHEMA

![image alt](https://github.com/sebaslozano99/technical_assesment_api/blob/e574f882c89501e7ec5574214e21092c70380a4f/dbSchema.png)


## EJECMPLOS DE SQL QUERIES PARA LLENAR LAS BASES DE DATOS

Copia el las siguientes queries para generar las tables y su respectiva informacion. 

-- Crear table person
```

CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
);
```


-- Insertar informacion en la tabla Person
```

INSERT INTO person (first_name, last_name) VALUES
   ('John', 'Doe'),
   ('Jane', 'Smith'),
   ('Alice', 'Brown'),
   ('Bob', 'Green');
```



-- Crear tabla cars
```

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    person_id INTEGER,
    car VARCHAR(100) NOT NULL,
    FOREIGN KEY(person_id) REFERENCES person(id) ON DELETE CASCADE
);
```


-- Insertar informacion en la tabla cars
```
INSERT INTO cars (person_id, car) VALUES 
    (1, "Mazda 3"), (1, "Nissan Versa"), (2, "Renault Duster"),
    (2, "Chevrolet Spark"), (4, "Chevrolet Camaro"), (3, "Toyota Hilux"),
    (4, "Toyota land cruiser 300"), (4, "Lexus lx 600 luxury"), (4, "Audi R8"),
    (4, "Renault Duster");
```



-- Crear tabla pets{¿
```
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    person_id INTEGER,
    pet_name VARCHAR(40) NOT NULL,
    breed VARCHAR(40) NOT NULL
    FOREIGN KEY(person_id) REFERENCES person(id) ON DELETE CASCADE
);
```

```
INSERT INTO pets (person_id, pet_name, breed) VALUES
    (2, "Zeus", "Husky"), (2, "Max", "Husky"), (3, "Star", "German Shepherd"),
    (3, "Aquiles", "Labrador"), (4, "Thor", "Golden Retriever"), (4, "Iron Man", "Labrador"),
    (4, "Black Widow", "Australian Shepherd"), (4, "Tommy", "German Shepherd"), (1, "Janny", "Beagle"),
    (1, "Terry", "Beagle");
```


## RUN THE APPLICATION
```
   npm start
```
