/*--------------------------------------------------------------------------\
- For creation, running, management and posting messages of a worker thread -
\--------------------------------------------------------------------------*/

var worker = null;
var workerStart;
var working = false;

function loadWorker(url) {
    document.getElementById('debug').innerHTML = "";

    worker = new Worker(url);
    workerStart = new Date();
    working = true;

    worker.onmessage = function (e) {
        updateText(e.data);
    };

    worker.onerror = function (e) {
        var t = ['Line#: ', e.lineno, ' error: ', e.message].join(' ');
        updateText(t, "");
        working = false;
    };
}

function updateText(data) {

    if (typeof data === "string") {
        document.getElementById('status').innerHTML = data;
    } else {
        var hasData = false;

        if (typeof data.percentComplete === "number") {
            if (data.percentComplete > 1) {
                data.percentComplete = 1;
            }
            var p = document.getElementById('percentComplete');
            p.innerHTML = (data.percentComplete * 100).toFixed(2) + "%";
            p.style.width = p.innerHTML;
            fireOnChange(p);
            hasData = true;
        }

        if (typeof data.debugText !== "undefined") {
            addToDebug(data.debugText);
            hasData = true;
        }

        if (typeof data.mainText !== "undefined") {
            document.getElementById('main').innerHTML = data.mainText;
            hasData = true;
        }

        if (typeof data.statusText !== "undefined") {
            var s = document.getElementById('status');
            s.innerHTML = data.statusText;
            fireOnChange(s);
            hasData = true;
        }

        if (typeof data.done !== "undefined") {
            //update button
            document.getElementById('toggleWorkerButton').innerHTML = "Start worker";

            //set percent
            var p = document.getElementById('percentComplete');
            p.innerHTML = "100%";
            p.style.width = p.innerHTML;

            //enable dropdown
            //document.getElementById('workerDropdown').disabled = false;

            if ((typeof data.answerNumber !== "undefined") &&
                (typeof data.correctAnswerHash !== "undefined")) {
                //also provided an answer
                var answerMessage = getAnswerMessage(data.answerNumber, data.correctAnswerHash);
                var answerMessageShort = getAnswerMessageShort(data.answerNumber, data.correctAnswerHash);

                document.getElementById('status').innerHTML = answerMessage;
                addToDebug(answerMessageShort);
                working = false;
            } else if (typeof data.answerNumber !== "undefined") {
                //posted an answer, but no hash
                working = false;
            }

            hasData = true;
        }

        if (hasData == false) {
            addToDebug("Worker message not understood: " + data);
        }
    }
}

function fireOnChange(element) {
    if (typeof element.onchange === "function") {
        element.onchange();
    }
}

function addToDebug(text) {
    var d = document.getElementById('debug');

    if (d.childNodes.length > 1000) {
        d.removeChild(d.lastChild);
    }

    var newItem = document.createElement("div");
    var textnode = document.createTextNode(text);
    newItem.appendChild(textnode);
    d.insertBefore(newItem, d.childNodes[0]);

    fireOnChange(d);
}

function getAnswerMessage(answerNumber, correctAnswerHash) {
    if (typeof Sha256 === "undefined") {
        throw "Sha265.js does not appear to be loaded...";
    }

    var answerHash = Sha256.hash(answerNumber.toString());
    
    var isCorrectMessage;
    if (correctAnswerHash == answerHash) {
        isCorrectMessage = "<span class='correct'>(Answer is correct)</span>";
    } else {
        isCorrectMessage = "<span class='incorrect'>(Answer is NOT correct)</span>";
    }
    
    var friendlyTime;

    var answerMessage = "<table>";
    answerMessage += getHtmlRow("Took ", getFriendlyMills(workerStart));
    answerMessage += getHtmlRow("Computed answer ", answerNumber.toLocaleString());
    answerMessage += getHtmlRow("Correct hash ", correctAnswerHash);
    answerMessage += getHtmlRow("Answer hash ", answerHash);
    answerMessage += getHtmlRow("", isCorrectMessage);
    answerMessage += "</table>";

    return answerMessage;
}

function getHtmlRow(name, value) {
    return "<tr><td>" + name + "</td><td>" + value + "</td></tr>";
}

function getFriendlyMills(startDate) {
    var finishedDate = new Date();
    var mills = finishedDate.getTime() - workerStart.getTime();

    if (mills < 1000) {
        return mills.toLocaleString() + "ms";
    } else if (mills < 60000) {
        return (mills / 1000).toFixed(3) + " seconds";
    } else if (mills < 3600000) {
        return (mills / 60000).toFixed(3) + " minutes";
    } else {
        return (mills / 3600000).toFixed(3) + " hours";
    }
}

function getAnswerMessageShort(answerNumber, correctAnswerHash) {
    if (typeof Sha256 === undefined) {
        throw "Sha265.js does not appear to be loaded...";
    }
    var answerMessage = answerNumber.toLocaleString();
    var answerHash = Sha256.hash(answerNumber.toString());
    
    if (correctAnswerHash == answerHash) {
        answerMessage = "Correct Answer: " + answerMessage;
    } else {
        answerMessage = "Incorrect Answer: " + answerMessage;
    }

    return answerMessage;
}