import time
import nltk
import pandas as pd
from stop_words import get_stop_words
import multiprocessing as mp
import re
from tqdm import tqdm
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn import metrics

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')
stop_words = get_stop_words('en') 

PATH = os.path.dirname(os.path.realpath(__file__))
    
def tokenize_data(text):
    text = text.lower()
    text = re.sub('[!@#$%^&*-+=_]', '', text)
    text = nltk.word_tokenize(text)
    text = [word for word in text if word not in stop_words]
    text = [word for word in text if len(word) > 2]
    #pbar.update(1)
    return text

def get_vectorizer():
    df = pd.read_csv(PATH + '\\model\\data\\train.csv')
    n = []
    for i in df.truthful:
        n.append(1) if i == 'dec' else n.append(0)
    df['labels'] = n
    vec = TfidfVectorizer()
    doc = [" ".join(i) for i in df.tokens]
    X = vec.fit_transform(doc)  
    return vec

def get_classifier(vectorizer):
    pass