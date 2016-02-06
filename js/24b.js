importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({ mainText: "What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9? <br/> This optimized version is roughly 800-2500 times faster than the un-optimized version (depending on your browser)" });

var finds = 1;
var max = 1000000;
var nArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

var correctAnswerHash = "4677b3d9daa3b30a9665e4558f826e04f7833dda886b8ef24f7176519a0db537";
while (finds < 1000000) {
    finds++;
    EulerMath.nextLexographicInArray(nArray);

    if (finds % 100000 == 0) {
        postMessage({ debugText: "Lexographic #" + finds.toLocaleString() + ": " +  nArray.join() });
    }
}

var answerNum = (nArray.join("") * 1);

//show if the answer is correct
postMessage({
    done: true,
    answerNumber: answerNum,
    correctAnswerHash: correctAnswerHash
});