import oracledb

usuario = "superusuario"
clave = "superusuario"
host = "localhost"
puerto = 1521
servicio = "xepdb1"
dsn = f"{host}:{puerto}/{servicio}"

def conexion():
    return oracledb.connect(user=usuario, password=clave, dsn=dsn)


def obtener_plantas():
    conn=conexion()
    cur=conn.cursor()
    cur.execute("SELECT NOMBRE_PLANTA, NOMBRE_CIENTIFICO, NOMBRE_IMAGEN FROM PLANTAS JOIN IMAGENES USING (ID_PLANTA)")
    
    filas=cur.fetchall()

    cur.close()
    conn.close()

    return filas

def obtener_planta(x):
    conn=conexion()
    cur=conn.cursor()
    cur.execute("SELECT NOMBRE_PLANTA, NOMBRE_CIENTIFICO, DESCRIPCION_PLANTA, CUIDADOS_PLANTA, NOMBRE_IMAGEN FROM PLANTAS JOIN IMAGENES USING (ID_PLANTA) WHERE ID_PLANTA = :1", [x])
    
    fila=cur.fetchone()

    cur.close()
    conn.close()

    return fila

