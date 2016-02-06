importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "What is the largest prime factor of the number 600851475143 ?" });
var correctAnswerHash = "5c09f0554518a413e58e6bc5964ba90655713483d0b2bbc94572ad6b0b4dda28";
var answer = 0;
var candidate = 600851475143;

postMessage({
    debugText: "Finding prime factors of " + candidate.toLocaleString() + ": " + candidate
});

//note most of the heavy lifting is in math.js
var factors = EulerMath.getPrimeFactors(candidate, true);
postMessage({ debugText: "Prime factors are: " + factors.join() });
answer = factors[factors.length-1];

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: answer,
    correctAnswerHash: correctAnswerHash
});