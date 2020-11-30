from joblib import load
import pandas
import sys
import sklearn


def main(arg1):
    print(arg1)
    df = pandas.read_json(arg1)
    clf = load("model/linearSVC.joblib")
    vec = load("model/vectorizer.joblib")
    predictions = []
    print("we got to the first part")
    for review in df.comments:
        #print(df.comments[review])
        print("hello")
        x = vec.transform(review)
        predictions.append(clf.predict(x))
    df["flag"] = predictions
    send_back = df.to_json()
    print(send_back)
    sys.stdout.flush()

if __name__ == "__main__":
    main(sys.argv[1]) #Argument should be a batch json of reviews for any company