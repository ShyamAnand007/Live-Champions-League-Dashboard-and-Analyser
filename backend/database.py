import psycopg2 

connection=psycopg2.connect(
    host="localhost",
    database="cl",
    user="postgres",
    password="aids29",
    port="5432"
)

connection.set_client_encoding("UTF8")