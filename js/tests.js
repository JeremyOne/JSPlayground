
QUnit.test("SHA256", function (assert) {
    assert.ok(EulerMath !== undefined, "SHA256 loaded");
    assert.equal(Sha256.hash("QUnit"), "6bfe5860b80670412f74330b14b2f74e026de73df1aec518da95ba46486bd1bd", "Hash of 'QUnit'");
    assert.equal(Sha256.hash("Project"), "985959785319747668373cc6dee294b11db782b03cdd90a2851fbdc0637c6b7b", "Hash of 'Project'");
    assert.equal(Sha256.hash("Euler"), "586ca27cfbb81dde884d5f0bbb195ff4b2ff3b2f4304530e5e24194f3a391eda", "Hash of 'Euler'");
});

QUnit.test("EulerMath", function (assert) {
    assert.ok(EulerMath !== undefined, "EulerMath loaded");
});

QUnit.test("EulerMath.getDevisorsSum", function (assert) {
    assert.equal(EulerMath.getDevisorsSum(-1), undefined, "getDevisorsSum for -1 returns undefined");
    assert.equal(EulerMath.getDevisorsSum(999), 521, "999 returns 521");
    assert.equal(EulerMath.getDevisorsSum(99999), 48513, "99999 returns 48513");
});

QUnit.test("EulerMath.getFactors", function (assert) {
    assert.equal(EulerMath.getFactors(-1), undefined, "getFactors for -1 returns undefined");
    assert.deepEqual(EulerMath.getFactors(999), [3, 9, 37], "999 returns [3,9,37]");
    assert.deepEqual(EulerMath.getFactors(99999), [3, 41, 271, 3], "99999 returns [3, 41, 271, 3]");
});

QUnit.test("EulerMath.getNextPrime", function (assert) {
    assert.equal(EulerMath.getNextPrime(-1), undefined, "getNextPrime for -1");
    assert.equal(EulerMath.getNextPrime(0), 2, "getNextPrime for 0");
    assert.equal(EulerMath.getNextPrime(1), 2, "getNextPrime for 1");
    assert.equal(EulerMath.getNextPrime(2), 3, "getNextPrime for 2");
    assert.equal(EulerMath.getNextPrime(999), 1009, "getNextPrime for 999");
    assert.equal(EulerMath.getNextPrime(9999), 10007, "getNextPrime for 9,999");
    assert.equal(EulerMath.getNextPrime(99999), 100003, "99,999 returns 100,003");
    assert.equal(EulerMath.getNextPrime(999999), 1000003, "999,999 returns 1,000,003");
});

QUnit.test("EulerMath.getPrimeFactors", function (assert) {
    assert.equal(EulerMath.getPrimeFactors(-1), undefined, "-1 returns undefined");
    assert.deepEqual(EulerMath.getPrimeFactors(999), [3, 3, 3, 37], "999 returns  [3, 3, 3, 37]");
    assert.deepEqual(EulerMath.getPrimeFactors(9999), [3, 3, 11, 101], "9999 returns [3, 3, 11, 101]");
    assert.deepEqual(EulerMath.getPrimeFactors(600851475143), [71, 839, 1471, 6857], "600,851,475,143 returns [71, 839, 1471, 6857]");
});

QUnit.test("EulerMath.getNextOdd", function (assert) {
    assert.equal(EulerMath.getNextOdd(-3), -1, "-3 returns -1");
    assert.equal(EulerMath.getNextOdd(-2), -1, "-2 returns -1");
    assert.equal(EulerMath.getNextOdd(-1), 1, "-1 returns 1");
    assert.equal(EulerMath.getNextOdd(0), 1, "0 returns 1");
    assert.equal(EulerMath.getNextOdd(1), 3, "1 returns 3");
    assert.equal(EulerMath.getNextOdd(2), 3, "2 returns 3");
    assert.equal(EulerMath.getNextOdd(3), 5, "3 returns 5");
    assert.equal(EulerMath.getNextOdd(4), 5, "4 returns 5");
    assert.equal(EulerMath.getNextOdd(999), 1001, "999 returns 1001");
});

QUnit.test("EulerMath.isNumberPerfect", function (assert) {
    assert.equal(EulerMath.isNumberPerfect(-28), false, "-28 is NOT perfect");
    assert.equal(EulerMath.isNumberPerfect(-1), false, "-1 is NOT perfect");
    assert.equal(EulerMath.isNumberPerfect(0), false, "0 is NOT perfect");
    assert.equal(EulerMath.isNumberPerfect(1), false, "1 is NOT perfect");
    assert.equal(EulerMath.isNumberPerfect(6), true, "6 is perfect");
    assert.equal(EulerMath.isNumberPerfect(28), true, "28 is perfect");
    assert.equal(EulerMath.isNumberPerfect(496), true, "496 is perfect");
    assert.equal(EulerMath.isNumberPerfect(497), false, "497 is NOT perfect");
});

QUnit.test("EulerMath.isNumberAbundant", function (assert) {
    assert.equal(EulerMath.isNumberAbundant(-12), false, "-12 is NOT abundant");
    assert.equal(EulerMath.isNumberAbundant(0), false, "0 is NOT abundant");
    assert.equal(EulerMath.isNumberAbundant(11), false, "11 is NOT abundant");
    assert.equal(EulerMath.isNumberAbundant(12), true, "12 is abundant");
    assert.equal(EulerMath.isNumberAbundant(70), true, "70 is abundant");
    assert.equal(EulerMath.isNumberAbundant(120), true, "120 is abundant");
});

QUnit.test("EulerMath.isNumberDeficient", function (assert) {
    assert.equal(EulerMath.isNumberDeficient(-1), false, "-1 is NOT deficient");
    assert.equal(EulerMath.isNumberDeficient(1), true, "1 is deficient");
    assert.equal(EulerMath.isNumberDeficient(10), true, "10 is deficient");
    assert.equal(EulerMath.isNumberDeficient(11), true, "11 is deficient");
    assert.equal(EulerMath.isNumberDeficient(12), false, "12 is NOT deficient");
    assert.equal(EulerMath.isNumberDeficient(48), false, "48 is NOT deficient");
    assert.equal(EulerMath.isNumberDeficient(49), true, "49 is deficient");
    assert.equal(EulerMath.isNumberDeficient(50), true, "50 is deficient");
});

QUnit.test("EulerMath.isPalindrome", function (assert) {
    assert.equal(EulerMath.isPalindrome(1), true, "1 is palindrome");
    assert.equal(EulerMath.isPalindrome(101), true, "101 is palindrome");
    assert.equal(EulerMath.isPalindrome(1001), true, "1001 is palindrome");
    assert.equal(EulerMath.isPalindrome(1010), false, "1010 is NOT palindrome");
    assert.equal(EulerMath.isPalindrome(11011), true, "11011 is palindrome");
    assert.equal(EulerMath.isPalindrome(123454321), true, "123454321 is palindrome");
    assert.equal(EulerMath.isPalindrome(2173904391), false, "2173904391 is NOT palindrome");
});

QUnit.test("EulerMath.nextLexographic", function (assert) {
    assert.throws(
      function () {
          EulerMath.nextLexographic(1);
      },
      /Number was to large or small/,
      "1 throws error"
    );

    assert.equal(EulerMath.nextLexographic(123456789), 123456798, "123456789 returns 123456798");
    assert.equal(EulerMath.nextLexographic(123456798), 123456879, "123456798 returns 123456879");
    assert.equal(EulerMath.nextLexographic(123456879), 123456897, "123456879 returns 123456897");

    assert.throws(
      function () {
          EulerMath.nextLexographic(9876543210);
      },
      /Number was to large or small/,
      "9876543210 throws error"
    );
});

QUnit.test("EulerMath.nextLexographicInArray", function (assert) {
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

    EulerMath.nextLexographicInArray(numbers);
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 9, 0, 8], "0-9 Permutation 1");

    EulerMath.nextLexographicInArray(numbers);
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 7, 9, 8, 0], "0-9 Permutation 2");

    EulerMath.nextLexographicInArray(numbers);
    assert.deepEqual(numbers, [1, 2, 3, 4, 5, 6, 8, 0, 7, 9], "0-9 Permutation 3");

    var letters = ["a", "b", "c"];

    EulerMath.nextLexographicInArray(letters);
    assert.deepEqual(letters, ["a", "c", "b"], "a-c Permutation 1");

    EulerMath.nextLexographicInArray(letters);
    assert.deepEqual(letters, ["b", "a", "c"], "a-c Permutation 2");

    assert.equal(EulerMath.nextLexographicInArray(letters), true, "Returns true for valid permutation");
    assert.deepEqual(letters, ["b", "c", "a"], "a-c Permutation 3");

    var invalidNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    assert.equal(EulerMath.nextLexographicInArray(invalidNumbers), false, "Returns false for invalid permutation");

});

QUnit.test("EulerMath.arrayToNumber", function (assert) {
    assert.equal(EulerMath.arrayToNumber([1, 2, 3, 4, 5]), 12345, "12345");
    assert.equal(EulerMath.arrayToNumber([0, 2, 3, 4, 5]), 2345, "2345");
    assert.equal(EulerMath.arrayToNumber([0, 0, 3, 4, 5]), 345, "345");
});

QUnit.test("EulerMath.isSumOfAny", function (assert) {
    var toSum = [11, 13, 17];

    assert.equal(EulerMath.isSumOfAny(-1, toSum), false, "-1 is NOT a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(0, toSum), false, "0 is NOT a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(21, toSum), false, "21 is NOT a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(22, toSum), true, "22 is a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(23, toSum), false, "23 is NOT a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(24, toSum), true, "24 is a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(29, toSum), false, "29 is NOT a sum of [11, 13, 17]");
    assert.equal(EulerMath.isSumOfAny(30, toSum), true, "30 is a sum of [11, 13, 17]");
});


QUnit.test("EulerMath.rateLimit", function (assert) {
    //if for some reason all tests pass in less than 10ms, this first test will fail
    assert.equal(EulerMath.rateLimit(10), true, "Not limited (first call)");
    assert.equal(EulerMath.rateLimit(10), false, "Limited (second call)");
});