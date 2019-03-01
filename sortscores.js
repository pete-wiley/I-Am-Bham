// SOLUTION 1
// - - - - - - - - - - - - - - - - intializing variables - - - - - - - - - - - - - - - 
function scoreSort (obj) {                          //takes in an object
    let names = Object.keys(obj)                    //names is an array that contains the names from the passed in object
    let scores = Object.scores(obj)                 //scores is an array that contains the scores from the passed in object
    let newNames = []                               //newNames is an array that will be returned at the end
    let newScores = []                              //newScores is an array that will be returned at the end
    // - - - - - - - - - - - - - - checking for duplicate names and adding their scores- - - - - - - - - - - - - - -
    for (i = 0; i < names.length; i++) {            //loop through the names and use var i
        for (j = 0; j < names.length; j++) {        //loop through names again, nested in first loop, use var j
            if (names[i] == names[j] && i != j) {   //if there are duplicate names and they are not the same index
                scores[i] = scores[i] + scores[j]   //add scores tgether at index of i
                scores.splice(scores[j], 1)         //remove score with index of j
                names.splice(names[j], 1)           //remove name with index of j
            }
        }
    }
    // - - - - - - - - - - - - - - sort scores with names - - - - - - - - - - - - - - -
    for (i = 0; i < scores.length; i++) {           //loop through scores
        index = scores.indexOf(Math.min(...scores)) //let index equal the index of the lowest CURRENT score (lowest score will change as loop runs)
        newNames.push(names[index])                 //push name with lowest current score to newNames
        names.splice(names[index], 1)               //remove name with lowest current score from original names array
        newScores.push(scores[index])               //push lowest current score to newScores
        scores.splice(scores[index], 1)             //remove lowest current score from original scores array
    }
    // - - - - - - - - - - - - - - - are names with the same score alphabetically sorted?  - - - - - - - - - - - - - -
    for (i = 0; i < scores.length; i++) {           //loop through scores
        if (scores[i] == scores[i + 1]) {           //if one score is the same as the next adjacent score
            if (names[i] > names[i + 1]) {          //if names arent already sorted alphabetically
                temp = names[i]                     //swap the names
                names[i] = names[i + 1]
                names[i + 1] = temp
            }
        }
    }
    return newNames + newScores                     //give back names and scores sorted and with matching indexes
}

//---------------------------------------------------------------
//SOLUTION 2
function scoreSort2 (obj) {
    // - - - - - - - - - - - - initializing variables - - - - - - - - - - - - -
    let result = []                                    //result is an array of objects that will be returned at the end
    let newObj = {}                                    //newObj is obj with duplicates removed and the duplicates names scores added
    let names = Object.keys(obj)                       //names is an array that contains the names from the passed in object
    let scores = Object.scores(obj)                    //scores is an array that contains the scores from the passed in object
    for (i = 0; i < names.length; i++) {               //loop through the names and use var i
        for (j = 0; j < names.length; j++) {           //loop through names again, nested in first loop, use var j
            if (names[i] == names[j] && i != j) {      //if there are duplicate names and they are not the same index
                scores[i] = scores[i] + scores[j]      //add scores tgether at index of i
                scores.splice(scores[j], 1)            //remove score with index of j
                names.splice(names[j], 1)              //remove name with index of j
            }
            newObj.names[i] = scores[i]                //adding names and scores to newObj
        }
    }
    // - - - - - - - - - - - - - make array of objects - - - - - - - - - - - -
    for (x in newObj) {                                //loop through newObj
        result.push({                                  //push names/scores as objects to result array
            name : x,                                  //names here
            score : obj[x]                             //scores here
        })
    }
    // - - - - - - - - - - - - - sort numerically, and if needed, alphabetically - - - - - - - - - - -
    result.sort(function(a, b) {b.score - a.score})    //sort scores in descending order
    for (i = 0; i = result.length; i++) {              //loop through result
        if (result[i].name == result[i + 1].name) {    //if two adjacent names are the same
            temp = result[i]                           //swap them
            result[i] = result[i + 1]
            result [i + 1] = temp
        }
    }
    return result                                      //give back array of objects
}