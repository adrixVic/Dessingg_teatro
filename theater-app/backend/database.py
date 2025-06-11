import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

class Database:
    def __init__(self):
        load_dotenv()  # Cargar variables desde .env
        self.connection = None
        self.host = os.getenv("DB_HOST")
        self.user = os.getenv("DB_USER")
        self.password = os.getenv("DB_PASSWORD")
        self.database = os.getenv("DB_NAME")

    def connect(self):
        try:
            self.connection = mysql.connector.connect(
                host=self.host,
                user=self.user,
                password=self.password,
                database=self.database
            )
            if self.connection.is_connected():
                print(" Connected to the database")
        except Error as e:
            print(f" Connection failed: {e}")

    def close(self):
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print(" Connection closed")

    def execute_query(self, query, params=None):
        try:
            cursor = self.connection.cursor()
            cursor.execute(query, params)
            self.connection.commit()
            print(" Query executed successfully")
        except Error as e:
            print(f" Error executing query: {e}")
        finally:
            cursor.close()

    def fetch_one(self, query, params=None):
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        result = cursor.fetchone()
        cursor.close()
        return result

    def fetch_all(self, query, params=None):
        cursor = self.connection.cursor()
        cursor.execute(query, params)
        result = cursor.fetchall()
        cursor.close()
        return result
