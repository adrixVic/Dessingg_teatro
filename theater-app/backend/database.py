import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

class Database:
    def __init__(self):
        load_dotenv()
        
        self.host = os.getenv('DB_HOST')
        self.user = os.getenv('DB_USER')
        self.password = os.getenv('DB_PASSWORD')
        self.database = os.getenv('DB_NAME')
        self.port = int(os.getenv('DB_PORT', 3306))
        self.connection = None
        self.connect()
    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database,
                port=self.port
            )
            if self.connection.is_connected():
                print(" Conexión establecida con la base de datos.")
        except Error as e:
            print(f" Error de conexión a la base de datos: {e}")
            self.connection = None

    def fetch_one(self, query, params=None):
        if not self.connection:
            print(" No hay conexión activa.")
            return None
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        return cursor.fetchone()

    def fetch_all(self, query, params=None):
        if not self.connection:
            print(" No hay conexión activa.")
            return []
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        return cursor.fetchall()

    def execute(self, query, params=None):
        if not self.connection:
            print(" No hay conexión activa.")
            return
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        self.connection.commit()

print("DB_HOST:", os.getenv('DB_HOST'))  # <-- Esto debe mostrar "127.0.0.1"