import os
import psycopg2

from dotenv import load_dotenv

load_dotenv()


def connect():

    try:

        conn = psycopg2.connect(
            os.getenv("DATABASE_URL")
        )

        return conn

    except Exception as e:

        print("Database connection error:")
        print(e)

        return None