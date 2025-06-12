-- 1. Crear la base de datos solo una vez
CREATE DATABASE IF NOT EXISTS teatros;

-- 2. Usar la base de datos (¡IMPORTANTE!)
USE teatros;

-- 3. Crear tablas (ahora sí funciona sin error 1046)

CREATE TABLE teatro (
    idTeatro INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    PRIMARY KEY (idTeatro)
);

CREATE TABLE funcion (
    idFuncion INT NOT NULL AUTO_INCREMENT,
    fechaHora DATETIME NOT NULL,
    nombreObra VARCHAR(100) NOT NULL,
    estado VARCHAR(50),
    idTeatro INT NOT NULL,
    PRIMARY KEY (idFuncion),
    FOREIGN KEY (idTeatro) REFERENCES teatro(idTeatro)
);

CREATE TABLE usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    CI VARCHAR(20) NOT NULL UNIQUE,
    direccion VARCHAR(150),
    telefono VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (idUsuario)
);

CREATE TABLE asiento (
    idAsiento INT NOT NULL AUTO_INCREMENT,
    fila VARCHAR(10) NOT NULL,
    numero INT NOT NULL,
    estado ENUM('libre', 'ocupado') DEFAULT 'libre',
    idFuncion INT NOT NULL,
    PRIMARY KEY (idAsiento),
    FOREIGN KEY (idFuncion) REFERENCES funcion(idFuncion)
);

CREATE TABLE reserva (
    idReserva INT NOT NULL AUTO_INCREMENT,
    fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    idUsuario INT NOT NULL,
    idAsiento INT NOT NULL,
    idFuncion INT NOT NULL,
    PRIMARY KEY (idReserva),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idAsiento) REFERENCES asiento(idAsiento),
    FOREIGN KEY (idFuncion) REFERENCES funcion(idFuncion)
);