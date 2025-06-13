from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from database import Database

app = Flask(__name__)
CORS(app)

db = Database()

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/login')
def login_page():
    return render_template("login.html")

@app.route('/funciones')
def funciones():
    return render_template('funciones.html')

@app.route("/asientos")
def asientos():
    return render_template("asientos.html")


@app.route('/api/registro', methods=['POST'])
def registrar_usuario():
    data = request.json
    print("📥 Datos recibidos:", data)

    query = """
    INSERT INTO usuario (nombre, correo, ci, direccion, telefono, contrasena)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (
        data.get('nombre'), data.get('correo'), data.get('ci'),
        data.get('direccion'), data.get('telefono'), data.get('contrasena')
    )
    try:
        db.execute(query, params)
        print("✅ Registro insertado")
        return jsonify({"mensaje": "Registro exitoso"}), 200
    except Exception as e:
        print("❌ Error SQL:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    correo = data.get('correo')
    contrasena = data.get('contrasena')

    query = "SELECT * FROM usuario WHERE correo = %s AND contrasena = %s"
    usuario = db.fetch_one(query, (correo, contrasena))

    if usuario:
        return jsonify({"mensaje": "Login exitoso", "usuario": usuario}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401

if __name__ == '__main__':
    app.run(debug=True)