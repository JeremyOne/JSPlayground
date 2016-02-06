importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "Find the smallest positive number that is evenly divisible by all of the numbers from 1 to 20." });
var correctAnswerHash = "1ba90ab11bfb2d2400545337212b0de2a5c7f399215175ade6396e91388912b1";
var answer = 0;
var candidate = 2520; //starting point from question
var maxFound = 0;

while (answer == 0) {

    modfor:
    for (var i = 2; i <= 20; i++) {

        if (candidate % i != 0) {

            if (i > maxFound) {
                maxFound = i;
            }

            //break for loop as soon as we can for the next candidate
            break modfor;
        }

        if (i == 20) {
            //we found the answer!
            answer = candidate;
        }
        
    }

    candidate += 20; //add max factor

    if (candidate % 10000000 == 0) {
        postMessage({ debugText: "Finished checking candidate: " + candidate.toLocaleString() });
    }
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: answer,
    correctAnswerHash: correctAnswerHash
});