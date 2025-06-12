from flask import Flask, request, jsonify
from flask_cors import CORS
from database import Database

app = Flask(__name__)
CORS(app)  # Permitir peticiones del frontend

db = Database()
db.connect()

@app.route('/api/registro', methods=['POST'])
def registrar_usuario():
    data = request.json
    query = """
    INSERT INTO usuarios (nombre, correo, ci, direccion, telefono, contrasena)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (
        data['nombre'], data['correo'], data['ci'],
        data['direccion'], data['telefono'], data['contrasena']
    )
    try:
        db.execute_query(query, params)
        return jsonify({"mensaje": "Registro exitoso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    correo = data['correo']
    contrasena = data['contrasena']

    query = "SELECT * FROM usuarios WHERE correo = %s AND contrasena = %s"
    usuario = db.fetch_one(query, (correo, contrasena))

    if usuario:
        return jsonify({"mensaje": "Login exitoso", "usuario": usuario}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401

if __name__ == '__main__':
    app.run(debug=True)