postMessage("Starting...");
postMessage({ mainText: "This test counts to a 1,200,000,000 in a WebWorker, posts messages, then throws an exception as a test" });

//do some basic counting
var i = 0;
var max = 1200000000;
var correctAnswerHash = "5d5590fbaa0b3a0fadafd0ccf0f44e56d4843fe72083e743f7581b0e402829fd";

while (i < max) {
    i++;

    if (i % 1000000 == 0) {
        var percentComplete = i / max;
        postMessage({
            debugText: i.toString(),
            percentComplete: percentComplete
        });
    }
    if (i % 100000000 == 0) {
        postMessage("Milestone: " + i);
    }
}

postMessage({
    done: true,
    statusText: "Done!",
    debugText: "Done!",
    answerNumber: i,
    correctAnswerHash: correctAnswerHash
});

throw " - this is a test exception, ignore";