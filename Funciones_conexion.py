import oracledb
import sqlite3

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

def registrar_usuario(x1, x2, x3, x4):
    try:
        conn = conexion()
        cur = conn.cursor()

        sql = """INSERT INTO USUARIOS (id_usuario, nombre_usuario, contraseña_usuario, es_admin, esta_activo, email_usuario, id_region) 
                 VALUES (usuario_seq.nextval, :1, :2, 'N', 'N', :3, :4)"""

        cur.execute(sql, (x1, x3, x2, x4))  

        conn.commit()
        cur.close()
        conn.close()
        return "Usuario registrado exitosamente"

    except Exception as e:
        if conn:
            conn.rollback()  
        return f"Error al registrar usuario: {str(e)}"
    
def informacion_usuario(x):
    conn=conexion()
    cur=conn.cursor()
    cur.execute("SELECT nombre_usuario, email_usuario, nombre_region FROM usuarios join regiones using (id_region) WHERE id_usuario = :1", [x])
    
    fila=cur.fetchone()

    cur.close()
    conn.close()

    return fila
    

def listar_emails():
    conn = conexion()
    cur = conn.cursor()

    cur.execute("SELECT email_usuario FROM usuarios")
    filas = cur.fetchall()

    for fila in filas:
        print(f"Email en DB: {repr(fila[0])}")

    cur.close()
    conn.close()

def verificar_usuario(email, password):
    conn = conexion()  
    cur = conn.cursor()

    email_limpio = email.strip().lower()
    print(f"Buscando email: '{email_limpio}' en la base...")

    sql = "SELECT id_usuario, contraseña_usuario, es_admin FROM usuarios WHERE LOWER(TRIM(email_usuario)) = :1"
    cur.execute(sql, [email_limpio])
    resultado = cur.fetchone()  
    print(f"Resultado consulta: {resultado}")

    cur.close()
    conn.close()

    if resultado:
        id_usuario = resultado[0]
        contraseña_bd = resultado[1]
        es_admin = resultado[2]

        es_admin = es_admin.strip() if isinstance(es_admin, str) else es_admin

        if contraseña_bd == password:
            return (id_usuario, es_admin)
        else:
            return False  
    else:
        return None



def obtener_comentarios(x):
    conn=conexion()
    cur=conn.cursor()
    cur.execute("SELECT ID_COMENTARIO, NOMBRE_USUARIO, DESCRIPCION_COMENTARIO FROM COMENTARIOS JOIN USUARIOS USING (ID_USUARIO) WHERE ID_PLANTA = :1", [x])
    
    filas=cur.fetchall()

    cur.close()
    conn.close()

    return filas

def obtener_respuestas(x):
    conn=conexion()
    cur=conn.cursor()
    cur.execute("SELECT NOMBRE_USUARIO, DESCRIPCION_RESPUESTA FROM RESPUESTAS JOIN USUARIOS USING (ID_USUARIO) WHERE ID_COMENTARIO = :1", [x])
    
    filas=cur.fetchall()

    cur.close()
    conn.close()

    return filas

def registrar_comentario(x1, x2, x3):
    try:
        conn = conexion()
        cur = conn.cursor()

        sql = """INSERT INTO COMENTARIOS (id_comentario, id_planta, id_usuario, fecha_publicacion, descripcion_comentario) 
                 VALUES (comentarios_seq.nextval, :1, :2, sysdate, :3)"""

        cur.execute(sql, (x1, x2, x3))  

        conn.commit()
        cur.close()
        conn.close()
        return "Comentario registrado exitosamente"

    except Exception as e:
        if conn:
            conn.rollback()  
        return f"Error al registrar comentario: {str(e)}"
    
def registrar_respuesta(x1, x2, x3):
    try:
        conn = conexion()
        cur = conn.cursor()

        sql = """INSERT INTO RESPUESTAS (id_respuesta, id_comentario, id_usuario, fecha_respuesta, descripcion_respuesta) 
                 VALUES (respuestas_seq.nextval, :1, :2, sysdate, :3)"""

        cur.execute(sql, (x1, x2, x3))  

        conn.commit()
        cur.close()
        conn.close()
        return "Respuesta registrado exitosamente"

    except Exception as e:
        if conn:
            conn.rollback()  
        return f"Error al registrar respuesta: {str(e)}"
    
def registrar_favorito(x1, x2):
    try:
        conn = conexion()
        cur = conn.cursor()

        sql = """INSERT INTO FAVORITOS (id_usuario, id_planta) 
                 VALUES (:1, :2)"""

        cur.execute(sql, (x1, x2))  

        conn.commit()
        cur.close()
        conn.close()
        return "Favorito registrado exitosamente"

    except Exception as e:
        if conn:
            conn.rollback()  
        return f"Error al registrar comentario: {str(e)}"
    
def plantas_favoritas(x):
    conn=conexion()
    cur=conn.cursor()
    cur.execute("SELECT NOMBRE_PLANTA, NOMBRE_CIENTIFICO, NOMBRE_IMAGEN FROM FAVORITOS JOIN PLANTAS USING (ID_PLANTA) JOIN IMAGENES USING (ID_PLANTA) WHERE ID_USUARIO = :1", [x])
    
    filas=cur.fetchall()

    cur.close()
    conn.close()

    return filas



