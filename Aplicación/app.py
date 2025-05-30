from flask import Flask, jsonify, request
from Funciones_conexion import obtener_planta, obtener_plantas, registrar_usuario, verificar_usuario, obtener_comentarios, obtener_respuestas, registrar_comentario, informacion_usuario, registrar_favorito, plantas_favoritas, registrar_respuesta, cantidad_usuarios, cantidad_plantas, cantidad_planta_estacion, cantidad_region
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/obtener_planta", methods=["GET"])
def planta():
    id_planta = request.args.get('id')
    fila = obtener_planta(id_planta)
    
    if fila:
        planta = {
            "nombre": fila[0],
            "nombre_cientifico": fila[1],
            "descripcion": fila[2],
            "cuidados": fila[3],
            "imagen_url": f"../../fotos/plantas/{fila[4]}"  
        }
        return jsonify(planta)
    else:
        return jsonify({"error": "Planta no encontrada"}), 404

@app.route("/obtener_plantas", methods=["GET"])
def obtener_todas_las_plantas():
    filas = obtener_plantas()
    
    productos = []

    for fila in filas:
        productos.append({
            "nombre": fila[0],
            "nombre_cientifico": fila[1],
            "imagen_url": f"../fotos/plantas/{fila[2]}",
            "pagina_url": f"../paginas-perfiles/pagina-{fila[0]}/index.html"
        })

    return jsonify(productos)

@app.route("/registro", methods=["POST"])
def registro():
    datos = request.json

    try:
        nombre = datos["nombre"]
        email = datos["email"]
        password = datos["password"]
        region_id = datos["region_id"]

        registrar_usuario(nombre, email, password, region_id)  

        return jsonify({"mensaje": "Registro exitoso"}), 200  
    
    except KeyError as e:
        return jsonify({"error": f"Falta el campo: {str(e)}"}), 400  
    
    except Exception as e:
        return jsonify({"error": "Error interno en el servidor", "detalle": str(e)}), 500
    
@app.route("/login", methods=["POST"])
def login():
    datos = request.json
    print(f"Intentando login con email: '{datos.get('email')}', password: '{datos.get('password')}'")

    email = datos["email"]
    password = datos["password"]

    # 👇 Limpieza y normalización
    print("Email original recibido:", repr(email))
    email = email.strip().lower()
    print("Email después de limpiar y pasar a minúsculas:", repr(email))

    resultado = verificar_usuario(email, password)

    if resultado is False:
        return jsonify({"mensaje": "Contraseña incorrecta"}), 401
    elif resultado is None:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404
    else:
        id_usuario, es_admin = resultado
        return jsonify({
            "mensaje": "Inicio de sesión exitoso",
            "id_usuario": id_usuario,
            "es_admin": es_admin
        }), 200


@app.route("/obtener_comentarios", methods=["GET"])
def comentarios():
    id_planta = int(request.args.get('id'))
    filas = obtener_comentarios(id_planta)
    
    comentarios = []

    for fila in filas:
        comentarios.append({
            "id_comentario": fila[0],
            "usuario": fila[1],
            "descripcion": fila[2]
        })
    
    return jsonify(comentarios)

@app.route("/obtener_respuestas", methods=["GET"])
def respuestas():
    id_comentario = int(request.args.get('id'))
    filas = obtener_respuestas(id_comentario)
    
    respuestas = []

    for fila in filas:
        respuestas.append({
            "usuario": fila[0],
            "descripcion": fila[1]
        })
    
    return jsonify(respuestas)

@app.route("/informacion_usuario", methods=["GET"])
def informacion():
    id_usuario = int(request.args.get('id'))
    fila = informacion_usuario(id_usuario)

    if fila:
        usuario = {
            "nombre": fila[0],
            "email": fila[1],
            "region": fila[2] 
        }
        return jsonify(usuario), 200
    else:
        return jsonify({"error": "Planta no encontrada"}), 404

@app.route("/comentar", methods=["POST"])
def comentar():
    datos = request.json

    try:
        id_planta = datos["id_planta"]
        id_usuario = datos["id_usuario"]
        descripcion = datos["descripcion"]

        registrar_comentario(id_planta, id_usuario, descripcion)  

        return jsonify({"mensaje": "Registro de comentario exitoso"}), 200  
    
    except KeyError as e:
        return jsonify({"error": f"Falta el campo: {str(e)}"}), 400  
    
    except Exception as e:
        return jsonify({"error": "Error interno en el servidor", "detalle": str(e)}), 500
    
@app.route("/responder", methods=["POST"])
def responder():
    datos = request.json

    try:
        id_comentario = datos["id_comentario"]
        id_usuario = datos["id_usuario"]
        descripcion = datos["descripcion"]

        registrar_respuesta(id_comentario, id_usuario, descripcion)  

        return jsonify({"mensaje": "Registro de comentario exitoso"}), 200  
    
    except KeyError as e:
        return jsonify({"error": f"Falta el campo: {str(e)}"}), 400  
    
    except Exception as e:
        return jsonify({"error": "Error interno en el servidor", "detalle": str(e)}), 500
    
@app.route("/agregar_favorito", methods=["POST"])
def agregar_favorito():
    datos = request.json

    try:
        id_planta = datos["id_planta"]
        id_usuario = datos["id_usuario"]

        registrar_favorito(id_usuario, id_planta)  

        return jsonify({"mensaje": "Registro de favorito exitoso"}), 200  
    
    except KeyError as e:
        return jsonify({"error": f"Falta el campo: {str(e)}"}), 400  
    
    except Exception as e:
        return jsonify({"error": "Error interno en el servidor", "detalle": str(e)}), 500

@app.route("/plantas_favoritas", methods=["GET"])
def favoritas():
    id_usuario = int(request.args.get('id'))
    filas = plantas_favoritas(id_usuario)
    
    favoritos = []

    for fila in filas:
        favoritos.append({
            "nombre": fila[0],
            "nombre_cientifico": fila[1],
            "imagen_url": f"../fotos/plantas/{fila[2]}",
            "pagina_url": f"../paginas-perfiles/pagina-{fila[0]}/index.html"
        })
    
    return jsonify(favoritos)

@app.route("/cantidadUsuarios", methods=["GET"])
def cantidadUsuarios():
    fila = cantidad_usuarios()

    if fila:
        total = {
            "total": fila[0] 
        }
        return jsonify(total)
    else:
        return jsonify({"error": "Error en la consulta"}), 404
    
@app.route("/cantidadPlantas", methods=["GET"])
def cantidadPlantas():
    fila = cantidad_plantas()

    if fila:
        total = {
            "total": fila[0] 
        }
        return jsonify(total)
    else:
        return jsonify({"error": "Error en la consulta"}), 404
    
@app.route("/cantidadEstacion", methods=["GET"])
def cantidadEstaciones():
    id_estacion = request.args.get('id')
    fila = cantidad_planta_estacion(id_estacion)

    if fila:
        total = {
            "total": fila[0] 
        }
        return jsonify(total)
    else:
        return jsonify({"error": "Error en la consulta"}), 404
    
@app.route("/cantidadRegion", methods=["GET"])
def cantidadRegion():

    resultado = []
    try:
        for i in range(1000, 1006):
            resultado.append(cantidad_region(i))
        
        return jsonify(resultado)
    except KeyError as e:
        return jsonify({"error": "Total no encontrado"}), 404 


    
if __name__ == "__main__":
    app.run(debug=True)