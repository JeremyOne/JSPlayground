importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "Find the sum of all the multiples of 3 or 5 below 1000." });
var correctAnswerHash = "c0b20f4665d0388d564f0b6ecf3edc9f9480cb15fff87198b95701d9f5fe1f7b";
var answer = 0;

var candidate = 3;
var max = 1000;

while (candidate < max) {
    if ((candidate % 3 == 0) || (candidate % 5 == 0)) {
        postMessage({
            debugText: "Found multiple of 3 or 5: " + candidate,
            percentComplete: candidate / max
        });

        answer += candidate;
    }

    candidate++;
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: answer,
    correctAnswerHash: correctAnswerHash
});