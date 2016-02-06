importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "Find the sum of all Fibonacci numbers that are less than 4,000,000" });

var sum = 0;
var fCounter1 = 1;
var fCounter2 = 1;
var fCounter3 = 1;
var max = 4000000;
var i = 0;

var correctAnswerHash = "1f5882e19314ac13acca52ad5503184b3cb1fd8dbeea82e0979d799af2361704";

while (fCounter1 <= max) {
    i++;
    fCounter1 = (fCounter2 + fCounter3);
    fCounter3 = fCounter2;
    fCounter2 = fCounter1;

    if ((fCounter1 % 2) == 0) {
        sum += fCounter1;
        postMessage({
            debugText: "Even Fibonacci: " + fCounter1,
            percentComplete: fCounter1 / max
        });
    } else {
        postMessage({
            debugText: "Odd Fibonacci: " + fCounter1,
            percentComplete: fCounter1 / max
        });
    }
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: sum,
    correctAnswerHash: correctAnswerHash
});