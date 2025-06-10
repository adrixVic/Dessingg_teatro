<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro</title>
</head>
<body>
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulario de Registro</title>
 
</head>
<body>

  <form action="#" method="post">
    <h2>Registro de Usuario</h2>

    <label for="nombre">Nombre completo:</label>
    <input type="text" id="nombre" name="nombre" required>

    <label for="correo">Correo electrónico:</label>
    <input type="email" id="correo" name="correo" required>

    <label for="ci">Carnet de Identidad:</label>
    <input type="text" id="ci" name="ci" required>

    <label for="direccion">Dirección:</label>
    <input type="text" id="direccion" name="direccion" required>

    <label for="telefono">Teléfono:</label>
    <input type="tel" id="telefono" name="telefono" pattern="[0-9]{8}" required>

    <label for="contrasena">Contraseña:</label>
    <input type="password" id="contrasena" name="contrasena" 
           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{12,}" 
           title="Debe contener al menos 12 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos" 
           required>

    <button type="submit">Registrarse</button>
  </form>

</body>
</html>
  
</body>
</html>