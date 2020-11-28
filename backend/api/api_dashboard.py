import pandas as pd
import sys
import math
import json

def get_avg_rating(ratings):
    rating = {
        "A": 4,
        "B": 3,
        "C": 2,
        "D": 1,
        "F": 0
    }
    avg_rating = 0
    for i in ratings:
        avg_rating += rating.get(i)
    avg_rating = avg_rating / len(ratings)
    avg_rating = math.round(avg_rating)
    avg_rating = rating.keys()[rating.values().index(avg_rating)]
    return avg_rating

def get_avg_rating_by_role(df):
    roles = []
    ratings = []
    for index in range(len(df.role)):
        roles.append(df.role)
        ratings.append(df.internshipRatings)
    #construct a dictionary of ratings keyed by roles
    dic = {}
    for key, value in zip(roles, ratings):
        if key not in dic:
            dic[key] = [value]
        else:
            dic[key].append(value)
    #get the average ratings in a new dictionary
    group_ratings = {role: get_avg_rating(dic[role]) for role in dic.keys()}
    return group_ratings 


def main(arg1):
    df = pd.read_json(arg1)
    avg_overall_rating = get_avg_rating(df.internshipRatings)
    group_ratings = get_avg_rating_by_role(df)
    json_return = json.dumps(group_ratings, sort_keys= True)
    #Two event listeners are needed
    #print(avg_overall_rating) #first thing returned is the overall rating
    print(group_ratings) #second thing returned is a json object of ratings grouped by role
    sys.stdout.flush()
    




if __name__ == "__main__":
    main(sys.argv[1]) #Argument should be a json of reviews for a single company