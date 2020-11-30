from joblib import load
import pandas as pd
import sys
import sklearn
import mysql.connector
import os
import nltk
from stop_words import get_stop_words
import re


stop_words = get_stop_words('en') 
#python_api api_password420!

def tokenize_data(text):
    text = text.lower()
    text = re.sub('[!@#$%^&*-+=_]', '', text)
    text = nltk.word_tokenize(text)
    text = [word for word in text if word not in stop_words]
    text = [word for word in text if len(word) > 2]
    #pbar.update(1)
    return text

def tknz(col):
    return [tokenize_data(row) for row in col]


def main():
    #First load all the necessary things
    path = os.path.dirname(os.path.realpath(__file__))
    vectorizer = load(path + '\\model\\vectorizer.joblib')
    clf = load(path + '\\model\\linearSVC.joblib')

    squery = 'SELECT * FROM `reviews` WHERE `flag`=2'
    uquery = 'UPDATE `reviews` SET `flag` = %s WHERE `reviewID` = %s'

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
            
            if len(df.reviewID) > 0:

                df['tokens'] = tknz(df.comments)
                doc = [" ".join(i) for i in df.tokens]
                X = vectorizer.transform(doc)
                predictions = clf.predict(X)
                
                for rid, pred in zip(df.reviewID, predictions):
                    vals = (str(pred), str(rid))
                    cursor.execute(uquery, vals)
                connection.commit()
            else:
                print("There are no predictions to make")

    except mysql.connector.Error as e:
        print("except")
        print("Error while connecting to MySQL", e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
            print()
            print("MySQL connection is closed")
if __name__ == "__main__":
    main() #Argument should be a batch json of reviews for any company