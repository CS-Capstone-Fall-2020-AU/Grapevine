import mysql.connector
import pandas as pd

query = 'SELECT * FROM `reviews`'


try:
        connection = mysql.connector.connect(
            host= 'localhost',
            port= 3306,
            user= 'root',
            password= 'mysql',
            database= 'grapevinedatabase'
        )
        if connection.is_connected():
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)
            #do the actual processing we care about
            df = pd.read_sql(query, connection)
            uquery = 'UPDATE `reviews` SET `flag` = 2'
            cursor.execute(uquery)
            connection.commit()

except mysql.connector.Error as e:
    print("except")
    print("Error while connecting to MySQL", e)
finally:
    if (connection.is_connected()):
        cursor.close()
        connection.close()
        print()
        print("MySQL connection is closed")