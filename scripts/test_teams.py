import psycopg2 

connection=psycopg2.connect(
    host="localhost",
    database="cl",
    user="postgres",
    password="aids29",
    port="5432"
)

print("Database connection success")
connection.close()