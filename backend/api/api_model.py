from joblib import load
import pandas
import sys
import sklearn


def main():
    df = pandas.read_json(sys.argv[1])
    clf = load("model/linearSVC.joblib")
    vec = load("model/vectorizer.joblib")
    predictions = []
    for review in df.comments:
        x = vec.transform(review)
        predictions.append(clf.predict(x))
    return predictions

if __name__ == "__main__":
    main()