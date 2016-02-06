importScripts("math.js");
importScripts("worker.js");
importScripts("sha256.js");

postMessage("Starting...");

var i = 36;
var max = 10000000;

postMessage({ mainText: "This variation on #36 finds numbers with more than one palindrome expressed in base-2 through base-36 (1-10,000,000)" });

var lastMatch = [];
var lastMatchString = [];
var iString;

while (i < max) {
    i++;

    var matches = 0;
    var englishMatch = false;
    var pal = "";

    for (var b = 2; b <= 36; b++) {
        if (EulerMath.isPalindrome(i, b)) {
            matches++;
            pal += "b" + b + ":" + i.toString(b) + ", ";
        }
    }

    if (matches > 1) {
        lastMatch[matches] = i;
        lastMatchString[matches] = "Highest " + (matches.toLocaleString() + " match palindrome is for: " + i.toLocaleString() + " (" + pal + ")");

        if (EulerMath.rateLimit(50, 0)) {
            postMessage({ debugText: "Found palindrome in: " + i.toLocaleString() + " (" + pal + ")" });
        }
    }

    if (EulerMath.rateLimit(100, 1) || i == max) {
        var status = "";

        for (var m = 2; m < lastMatch.length; m++) {
            if (lastMatchString[m] !== "undefined"){
                status += lastMatchString[m] + "<br/>";
            }
        }

        postMessage({
            statusText: status,
            percentComplete: i / max
        });
    }
}

postMessage({
    debugText: "Done.",
    done: true,
    answerNumber: i
});