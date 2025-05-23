from flask import Flask, jsonify, request
from Funciones_conexion import obtener_planta, obtener_plantas
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
    
if __name__ == "__main__":
    app.run(debug=True)