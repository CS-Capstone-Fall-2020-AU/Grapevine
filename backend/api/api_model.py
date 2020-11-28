from joblib import load
import pandas as pd
import sys
import sklearn
import mysql.connector
import os
def train_model():
    pass

def main():
    #First load all the necessary things
    path = os.path.dirname(os.path.realpath(__file__))
    vectorizer = load(path + '\\model\\vectorizer.joblib')
    clf = load(path + '\\model\\linearSVC.joblib')

    squery = 'SELECT * FROM `reviews` WHERE `flag`=2'
    uquery = ''
    #TEST FOR THE LOADED FITTED MODELS INITIALLY
    #string = ["This is a test review to be vectorized to see if the vectorizer works from joblib"]
    #print(type(vectorizer.transform(string)))
    #print(clf.predict(vectorizer.transform(string)))

    print()
    try:
        connection = mysql.connector.connect(
            host= 'localhost',
            port= 3306,
            user= 'root',
            password= 'mysql',
            database= 'grapevinedatabase'
        )
        if connection.is_connected():
            #Get Database info and confirm connection
            db_Info = connection.get_server_info()
            print("Connected to MySQL Server version ", db_Info)
            cursor = connection.cursor()
            cursor.execute("select database();")
            record = cursor.fetchone()
            print("You're connected to database: ", record)
            #do the actual processing we care about
            df = pd.read_sql(squery, connection)

            predictions = []
            for review in df.comments:
                x = vectorizer.transform(review)
                predictions.append(clf.predict(list(x)))
            predictions = [predictions[0] for _ in predictions]
            #Send an update function replace flag with the predictions integers
            connection._execute_query(uquery)



    except mysql.Error as e:
        print("except")
        print("Error while connecting to MySQL", e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print("MySQL connection is closed")
if __name__ == "__main__":
    main() #Argument should be a batch json of reviews for any company