importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2." });
var correctAnswerHash = "9480c0160719234b57defc0681c0949a175ffb3ff4a3bf5e8163ac843f383f35";

var i = 1;
var max = 1000000;
var matchCount = 0;
var matchSum = 0;

var iString;

while (i < max) {
    if (EulerMath.isPalindrome(i, 10) && EulerMath.isPalindrome(i, 2)) {
        postMessage({ debugText: "Found palindrome: " + i });
        matchSum += i;
        matchCount++;
    }

    i++;

    if ((i % 10000) == 0) {
        postMessage({
            statusText: "Checking: " + i,
            percentComplete: i / max
        });
    }
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: matchSum,
    correctAnswerHash: correctAnswerHash
});


