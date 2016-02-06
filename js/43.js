importScripts("math.js");
importScripts("sha256.js");

postMessage("Starting...");
postMessage({
    mainText: "For all numbers that include exactly one instance of the digits 0-9, find the sum of all numbers where: <br/> (digits 2-4 mod 2 == 0) and (digits 3-5 mod 3 == 0) and <br/>(digits 4-6 mod 5 == 0) and (digits 5 - 7 mod 7 == 0) and <br/>(digits 6-8 mod 11 == 0) and (digits 7-9 mod 13 == 0) and <br/>(digits 8-10 mod 17 == 0)."
});
var correctAnswerHash = "6512f20c244844b6130204379601855098826afa1b55ff91c293c853ddf67db5";
var answer = 0;
var nArray = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9];
var max = 9876543210;
var match = 0;
var i = 0

//keep running until there are no other options
while (EulerMath.nextLexographicInArray(nArray)) {
    i++;
    
    if (i % 50000 == 0) {
        postMessage({
            statusText: "Checking: " + nArray.join(),
            percentComplete: (nArray.join("") * 1) / max
        });
    }

    if (advCheck(7, 8, 9, 17) &&
        advCheck(6, 7, 8, 13) &&
        advCheck(5, 6, 7, 11) &&
        advCheck(4, 5, 6, 7) &&
        advCheck(3, 4, 5, 5) &&
        advCheck(2, 3, 4, 3) &&
        advCheck(1, 2, 3, 2)) {
        
        match += EulerMath.arrayToNumber(nArray);

        answer += match;

        postMessage({
            debugText: "Match on: " + EulerMath.arrayToNumber(nArray).toLocaleString()
            + " running total: " + match.toLocaleString()
        });
    }

}

//add and devide check      
function advCheck(aIndex, bIndex, cIndex, div) {
    var total = (nArray[aIndex].toString() +
        nArray[bIndex].toString() +
        nArray[cIndex].toString()) * 1
    return total % div == 0;
}


//show if the answer is correct
postMessage({
    done: true,
    answerNumber: match, 
    correctAnswerHash: correctAnswerHash
});