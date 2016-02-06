postMessage("Starting...");
postMessage({ mainText: "Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers." });

importScripts("math.js");
importScripts("sha256.js");

//find some perfect numbers
var candidate = 0;
var max = 20161; //Euler says all integers greater than 28123 can be written as the sum of two abundant numbers - the actual is 20,161
var abundantNumbers = [];
var answer = 0;
var correctAnswerHash = "42e2552a2f589e021824339e2508629ffa00b3489ea467f47e77a1ea97e735c9";

//find all abundant numbers
postMessage({ debugText: "Finding all abundant numbers" });
for (var a = 12; a < max; a++) {
    if (EulerMath.isNumberAbundant(a)) {
        abundantNumbers.push(a);
    }
}
postMessage({ debugText: "Found " + abundantNumbers.length + " abundant numbers: " + abundantNumbers.join(", ")});

//throw "End early";

while (candidate < max) {
    candidate++;

    if (!EulerMath.isSumOfAny(candidate, abundantNumbers)) {
        postMessage({
            debugText: "Is not an abundant sum: " + candidate,
            percentComplete: candidate / max
        });
        answer += candidate;
    }

    if (candidate % 50 == 0) {
        postMessage({
            statusText: "Checking: " + candidate,
            percentComplete: candidate / max
        });
    }
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: answer,
    correctAnswerHash: correctAnswerHash
});

