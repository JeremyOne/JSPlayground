importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "Find the largest palindrome made from the product of two 3-digit numbers. <br/>Note: this computation is too short to show progress" });
var correctAnswerHash = "aa74f52b4c428d89606b411bc165eb81a6266821ecc9b4f30cdb70c5c930f4d9";
var answer = 0;

var min = 100;
var candidate;
var max = 999;

postMessage({ debugText: "Starting..." });

//compute high to low
for (var a = max; a > 0; a--) {

    if ((a * max) < answer) {
        //nothing left to check in A
        break;
    }

    for (var b = max; b > 0; b--) {
        candidate = (a * b);

        if (candidate > answer) {
            if (EulerMath.isPalindrome(candidate)) {
                postMessage({ debugText: "Found better answer than " + answer + ": " + candidate + " (" + a + " * " + b + ")" });
                answer = candidate;
            }
        } else {
            //nothing left to check in B
            break;
        }
    }
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: answer,
    correctAnswerHash: correctAnswerHash
});