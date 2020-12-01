var nGram = require('n-gram')

function getNGrams(strList){
    var doc = strList.join(" ");
    doc = doc.replace(/[^a-zA-Z ]/g, "");
    doc = doc.toLowerCase();
    
    grams = nGram.bigram(doc.split(' '));
    var dict = {};

    //Fills object with a count of common bigrams
    for (var i = 0; i < grams.length; i++){
        if(grams[i] in dict){
            dict[i]++;
        }
        else{
            grams[i] = 1;
        }
    }
    var sortable = [];
    for (var ele in dict){
        sortable.push([ele, dict[ele]]);
    }
    sortable.sort(function(a, b){
        return b[1] - a[1];
    });
    results = [];
    for (var value in sortable){
        results.push(value[0]);
    }
    return results.slice(0, 5);
}