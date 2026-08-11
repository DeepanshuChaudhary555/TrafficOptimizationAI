import psycopg
from config import DB_CONFIG


try:
    connection = psycopg.connect(**DB_CONFIG)

    print("PostgreSQL connection successful!")

    with connection.cursor() as cursor:
        cursor.execute("SELECT current_database();")
        database = cursor.fetchone()[0]

        cursor.execute("SELECT current_user;")
        user = cursor.fetchone()[0]

    print("Database:", database)
    print("User:", user)

    connection.close()

except Exception as error:
    print("PostgreSQL connection failed:")
    print(error)