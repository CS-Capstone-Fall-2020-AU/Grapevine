import pandas as pd
from os import listdir, path



def build_positive(p):
    p = p + 'positive_polarity/'
    t = p + 'truthful/'
    pos_true = listdir(t)
    f = p + 'deceptive/'
    pos_false = listdir(f)
    tru = []
    dec = []

    for x in pos_true:
        n = open(path.join(t, x), 'r')
        tru.append((n.read(), 'pos', 'true'))
        n.close()
    for x in pos_false:
        n = open(path.join(f, x), 'r')
        dec.append((n.read(), 'pos', 'dec'))
        n.close()   

    return dec + tru


def build_negative(p):
    p = p + 'negative_polarity/'
    t = p + 'truthful/'
    pos_true = listdir(t)
    f = p + 'deceptive/'
    pos_false = listdir(f)
    tru = []
    dec = []

    for x in pos_true:
        n = open(path.join(t, x), 'r')
        tru.append((n.read(), 'neg', 'true'))
        n.close()
    for x in pos_false:
        n = open(path.join(f, x), 'r')
        dec.append((n.read(), 'neg', 'dec'))
        n.close()
    
    return dec + tru

def main():
    dirname = path.dirname(__file__)
    p = path.join(dirname, 'raw/')
    temp = build_positive(p) + build_negative(p)
    cols = ['text', 'polarity', 'truthful']
    df = pd.DataFrame(temp, columns= cols)
    df.to_csv('spam_review_data.csv')


if __name__ == '__main__':
    main()