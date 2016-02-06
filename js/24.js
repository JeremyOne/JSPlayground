importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9? <br/> This answer is un-optimized for reference, see the optimized version for comparison" });

var i = 123456789;
var finds = 1;
var lastFind = 0;
var max = 1000000;
var correctAnswerHash = "4677b3d9daa3b30a9665e4558f826e04f7833dda886b8ef24f7176519a0db537";

while(finds < max) {
    i = EulerMath.nextLexographic(i);

    finds++;

    if (EulerMath.rateLimit(100)) {
        postMessage({
            percentComplete: finds / max,
            statusText: "Found: " + i.toLocaleString(),
            debugText: "Lexicographic: " + i
        });

        timer = new Date();
    }
}

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: i,
    correctAnswerHash: correctAnswerHash
});

