import mysql.connector
from mysql.connector import Error
 
def create_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
 
    return connection
 
def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print("Query executed successfully")
    except Error as e:
        print(f"The error '{e}' occurred")
 
# Replace the following placeholders with your actual database credentials
host_name = "localhost"
user_name = "root"
user_password = "Aayush187@"
db_name = "flask_logging_db"
 
# Create a connection to the database
connection = create_connection(host_name, user_name, user_password, db_name)
 
# Example query to create a table
create_table_query = """
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT,
    name TEXT NOT NULL,
    age INT,
    gender TEXT,
    nationality TEXT,
    PRIMARY KEY (id)
);
"""
 
# Execute the query
execute_query(connection, create_table_query)