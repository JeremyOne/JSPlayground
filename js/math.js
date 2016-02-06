/*----------------------------------------------------------------------\
- Various math functions that are used often in Project Euler questions -
\----------------------------------------------------------------------*/

var EulerMath = {}

EulerMath.getDevisorsSum = function (candidate) {
    if (candidate < 2) {
        return undefined;
    }

    //find all the divisors
    var devisor = 2;
    var devisorSum = 1;

    while (devisor < candidate) {
        var m = (candidate % devisor);

        if (m == 0) {
            //we can divide evenly
            devisorSum += devisor;
        }

        devisor++;
    }

    return devisorSum;
}

EulerMath.getFactors = function (candidate) {

    if ((candidate < 2) || (EulerMath.isPrime(candidate))) {
        //can't factorize primes or small numbers
        return undefined;
    }

    var factors = [];

    for (var i = 2; i < candidate; i++) {
        if ((candidate % i) == 0) {
            //we can divide evenly, so this is a factor
            factors.push(i);

            //reduce the candidate by the factor
            candidate = (candidate / i);
        }
    }

    factors.push(candidate);

    return factors;
}

EulerMath.getPrimeFactors = function (candidate, postStatus) {
    if ((candidate < 2) || (EulerMath.isPrime(candidate))) {
        //can't factorize primes or small numbers
        return undefined;
    }

    var factors = [];
    var count = 0;

    for (var i = 2; i < candidate;) {
        if ((candidate % i) == 0) {
            //we can divide evenly, so this is a factor
            factors.push(i);

            //reduce the candidate by the factor
            candidate = (candidate / i);
        } else {
            //only advance if needed
            i = EulerMath.getNextPrime(i)
        }

        count++;
        if (postStatus && (count % 1000 == 0)) {
            postMessage({ debugText: i });
        }
    }

    if (EulerMath.isPrime(candidate)) {
        //the final reduction is prime, so this is a valid factorization
        factors.push(candidate);
        return factors;
    } else {
        //failed to find prime factors
        return undefined;
    }

}

EulerMath.getNextPrime = function (candidate) {

    if (candidate < 0) {
        return undefined;
    } else if (candidate < 2) {
        return 2;
    }

    //get the next odd number
    candidate = EulerMath.getNextOdd(candidate);

    //loop until a prime is found
    while (EulerMath.isPrime(candidate) == false) {
        candidate = EulerMath.getNextOdd(candidate);
    }

    //we found a prime! So easy!
    return candidate;
}

//Gets the next odd number
EulerMath.getNextOdd = function (candidate) {
    if (candidate % 2 == 0) {
        return candidate += 1;
    } else {
        return candidate += 2;
    }
}

//checks if the given number is a prime number
EulerMath.isPrime = function (candidate) {
    //don't need to computer for even numbers, or 2 or less
    if (candidate < 2) {
        return false;
    } else if (candidate == 2) {
        return true;
    } else if (candidate % 2 == 0) {
        return false;
    }

    var max = Math.ceil(candidate / 2);

    //brute force all possible divisors up to half of the candidate
    for (var devisor = 2; devisor < max; devisor++) {
        if (candidate % devisor == 0) {
            //found a divisor, so this is not prime
            return false;
        }
    }

    return true;
}

//Check if a number is the exact sum of its proper divisors
EulerMath.isNumberPerfect = function (candidate) {
    if (candidate < 0) {
        return false;
    }
    var devisorSum = EulerMath.getDevisorsSum(candidate);
    return (devisorSum == candidate);
}

//Check if a number's sum of divisors is greater than itself
EulerMath.isNumberAbundant = function (candidate) {
    if (candidate < 0) {
        return false;
    }
    var devisorSum = EulerMath.getDevisorsSum(candidate);
    return (devisorSum > candidate);
}

//Check if a number's sum of divisors is less than itself
EulerMath.isNumberDeficient = function (candidate) {
    if (candidate < 0) {
        return false;
    } else if (candidate < 11) {
        return true;
    }
    var devisorSum = EulerMath.getDevisorsSum(candidate);
    return (devisorSum < candidate);
}

EulerMath.reverseString = function (s) {
    return s.split('').reverse().join('');
}

//check if a number is a palindrome (same in reverse and forward order)
EulerMath.isPalindrome = function (number, base) {

    //make into a char array
    var nArray = number.toString(base).split('');
    var r = 0;
    var l = nArray.length - 1;

    //read from the outside in
    while (r < l) {
        if (nArray[l] != nArray[r]) {
            //does not match
            return false;
        }

        r++;
        l--;
    }

    return true;
}

//gets the next number that contains one of each digit 0-9, this is an inefficient method
EulerMath.nextLexographic = function (lastNumber) {

    if (lastNumber >= 9876543210 || lastNumber < 99999999) {
        throw "Number was to large or small";
    }

    while (lastNumber < 9999999999) {
        lastNumber++;

        var iString = lastNumber.toString();

        if (iString.length == 9) { iString = "0" + iString; }

        if (iString.indexOf("9") > -1 && iString.indexOf("8") > -1 &&
            iString.indexOf("7") > -1 && iString.indexOf("6") > -1 &&
            iString.indexOf("5") > -1 && iString.indexOf("4") > -1 &&
            iString.indexOf("3") > -1 && iString.indexOf("2") > -1 &&
            iString.indexOf("1") > -1 && iString.indexOf("0") > -1) {

            return lastNumber;
        }
    }

    return lastNumber;
}

//Generates lexicographic numbers in order, works with any numbers in an array, this is much more efficient than EulerMath.nextLexographic();
EulerMath.nextLexographicInArray = function (nArray) {
    //Adapted from info found at: https://en.wikipedia.org/wiki/Permutation#Generation_in_lexicographic_order
    var aLength = nArray.length;
    var position1 = -1;
    var position2 = -1;

    //find the part of the number we will keep
    for (var k = 0; k < aLength; k++) {
        if (nArray[k] < nArray[k + 1]) {
            position1 = k;
        }
    }

    if (position1 == -1) {
        //if the search found nothing, there are no more permutations to be had
        return false;
    }

    //find the swap point
    for (var l = 0; l < aLength; l++) {
        if (nArray[position1] < nArray[l]) {
            position2 = l;
        }
    }

    //swap (splice) 1 and 2
    nArray[position1] = nArray.splice(position2, 1, nArray[position1])[0];

    //reverse the rest
    position1++;
    position2 = aLength - 1;
    while (position1 < position2) {
        nArray[position1] = nArray.splice(position2, 1, nArray[position1])[0];
        position2--;
        position1++;
    }

    return true;
}

//checks if the number is the sum of two other abundant numbers
EulerMath.isSumOfAny = function (candidate, arrayToCheck) {
    var aLength = arrayToCheck.length;

    for (var a = 0; a < aLength; a++) {
        for (var b = 0; b < aLength; b++) {
            var abSum = (arrayToCheck[a] + arrayToCheck[b]);
            if (abSum == candidate) {
                return true;
            } else if (abSum > candidate) {
                //nothing else to find in this loop, the incremented result will always be more than the candidate
                break;
            }
        }
    }

    return false;
}

EulerMath.arrayToNumber = function (nArray) {
    return (nArray.join("") * 1);
}

//A function useful for limiting the rate of messages posted
//returns false until specified milliseconds have elapsed, then returns true and resets it's own timer
EulerMath.rateTimer = [new Date()];
EulerMath.rateLimit = function (mills, timerNumber) {

    //if a timer number is defined, make sure we have a date for it
    if (!isNaN(timerNumber)) {
        while (EulerMath.rateTimer.length <= timerNumber) {
            EulerMath.rateTimer.push(new Date());
        }
    } else {
        timerNumber = 0;
    }

    if ((new Date()) - EulerMath.rateTimer[timerNumber] > mills) {
        EulerMath.rateTimer[timerNumber] = new Date();
        return true;
    } else {
        return false;
    }
}