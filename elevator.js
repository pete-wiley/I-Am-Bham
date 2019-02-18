let unsortedFloorQueue = [7, 5, 8, 3, 5, 1]                                                     //array of requests to and from certain floors

let elevator = {
    currentFloor: 2,                                                                            //the floor the elevator is currently at
    sortedFloorQueue: [3, 4, 5],                                                                //floors sorted based on direction elevator is headed
    sfq1: [],                                                                                   //array to help with floor sorting (see "use" function on line 57)
    sfq2: [],                                                                                   //array to help with floor sorting (see "use" function on line 57)
    nextFloor: sortedFloorQueue[0],                                                             //nextFloor is the next floor the elevator is queued to stop at/the currently first element in the sortedFloorQueue array
    doorStatus: "Closed",                                                                       //let you know if the door is open or closed
    moveUp: function (currentFloor, nextFloor) {                                                //function when the elevator is moving up
        for (i = currentFloor; i < nextFloor + 1; i++) {                                        //loop from current floor to next floor stop
            currentFloor = i                                                                    //current floor becomes i
            if (currentFloor != nextFloor) {                                                    //if the current floor is not the next floor...
                console.log("Ding! Passing by floor " + currentFloor)                           //console.log that the elevator is not stopping
            }
            if (currentFloor == nextFloor) {                                                    //all of the following if statements are for if the elevator stops, repeated for grammatical correctness
                if (currentFloor == 1) {
                    console.log("Stopping at 1st floor!")
                } else if (currentFloor == 2) {
                    console.log("Stopping at 2nd floor!")
                } else if (currentFloor == 3) {
                    console.log("Stopping at 3rd floor!")
                } else {
                    console.log("Stopping at " + currentFloor + "th floor!")
                }
                doorStatus = "Open"                                                             //open the door
                sortedFloorQueue.shift()                                                        //remove the first element from the sortedFloorQueue array
                doorStatus = "Closed"                                                           //close the door
            }
        }
        console.log("Sorted Floor Queue: " + sortedFloorQueue)                                  //just making sure it works 

    },
    moveDown: function (currentFloor, nextFloor) {                                              //function that happens when the elevator is moving down; essentially the same as moveUp, but reversed
        for (i = currentFloor; i > nextFloor - 1; i--) {                                        //loop goes down instead of up
            currentFloor = i                                                                    //rest of the function is copied and pasted from before
            if (currentFloor != nextFloor) {                                                    
                console.log("Ding! Passing by floor " + currentFloor)
            }
            if (currentFloor == nextFloor) {
                if (currentFloor == 1) {
                    console.log("Stopping at 1st floor!")
                } else if (currentFloor == 2) {
                    console.log("Stopping at 2nd floor!")
                } else if (currentFloor == 3) {
                    console.log("Stopping at 3rd floor!")
                } else {
                    console.log("Stopping at " + currentFloor + "th floor!")
                }
                doorStatus = "Open"
                sortedFloorQueue.shift()
                doorStatus = "Closed"
            }
        }
        console.log("Sorted Floor Queue: " + sortedFloorQueue)
    },
    use: function () {                                                                          //function that is called when the elevator wants to be used
        if (unsortedFloorQueue.length != 0) {                                                   //if the unsortedFloorQueue is not empty...
            if (nextFloor > currentFloor) {                                                     //if the next floor is higher than the floor we are currently on... (going up)
                for (i = 0; i < unsortedFloorQueue.length + 1; i++) {                           //loop through the unsortedFloorQueue
                    if (unsortedFloorQueue[i] > currentFloor) {                                 //if unsortedFloorQueue[i] > currentFloor, it will get 1st priority since we are headed up anyway; these items will be first in the sortedFloorQueue
                        sfq1.push(unsortedFloorQueue[i])                                        //sfq1 are the floors that get priority based on elevator direction...
                        sfq1.sort(function (a, b) { return a - b })                             //and they will be ascending
                    } else if (unsortedFloorQueue[i] < currentFloor) {                          //if unsortedFloorQueue[i] < currentFloor, it will get 2nd priority, these items will come after sfq1 in sortedFloorQueue
                        sfq2.push(unsortedFloorQueue[i])                                        //sfq2 are the floors that get 2nd priority based on elevator direction...
                        sfq2.sort(function (a, b) { return b - a })                             // and they will be descending
                    }
                }
                sortedFloorQueue = sortedFloorQueue.concat(sfq1, sfq2)                          //concat sfq1 and sfq2 to sortedFloorQueue
                moveUp()                                                                        //run moveUp
            } else if (nextFloor < currentFloor) {                                              //else if the next floor is lower than the current floor... (going down; else if, not else, because if all requests have been fufilled, then nothing should happen)
                for (i = 0; i < unsortedFloorQueue.length + 1; i++) {                           //same as before
                    if (unsortedFloorQueue[i] > currentFloor) {
                        sfq1.push(unsortedFloorQueue[i])
                        sfq1.sort(function (a, b) { return a - b })
                    } else if (unsortedFloorQueue[i] < currentFloor) {
                        sfq2.push(unsortedFloorQueue[i])
                        sfq2.sort(function (a, b) { return b - a })
                    }
                }
                sortedFloorQueue = sortedFloorQueue.concat(sfq2, sfq1)                          //sfq2 comes first this time, then sfq1, because we're going down
                moveDown()                                                                      //run moveDown000
            }
        }
        console.log(sortedFloorQueue)                                                           //just to make sure things work
    }
}

elevator.use()                                                                                  //use the elevator