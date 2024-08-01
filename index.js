document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const input = document.getElementById('numbersInput').value;

    const numbersArray = input.split(',')
        .map(num => num.trim())
        .map(num => parseFloat(num))
        .filter(num => !isNaN(num));

    const duplicates = findDuplicates(numbersArray);

    document.getElementById('result1').textContent = duplicates.length > 0 
        ? `Duplicates: ${duplicates.join(', ')}`
        : 'No duplicates found.';
});

function findDuplicates(arr) {
    const frequency = {};
    const duplicates = new Set();

    for (const num of arr) {
        if (frequency[num]) {
            frequency[num]++;
        } else {
            frequency[num] = 1;
        }
    }

    for (const [num, count] of Object.entries(frequency)) {
        if (count > 1) {
            duplicates.add(Number(num));
        }
    }

    return Array.from(duplicates);
}






document.getElementById('primeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startNumber = parseInt(document.getElementById('startNumber').value, 10);
    const endNumber = parseInt(document.getElementById('endNumber').value, 10);

    if (isNaN(startNumber) || isNaN(endNumber) || startNumber > endNumber) {
        document.getElementById('result').textContent = 'Please enter valid numbers with the start number less than or equal to the end number.';
        return;
    }

    const primes = findPrimesBetween(startNumber, endNumber);

    document.getElementById('result2').textContent = primes.length > 0 
        ? `Prime Numbers: ${primes.join(', ')}`
        : 'No prime numbers found in the given range.';
});

function findPrimesBetween(start, end) {
    const primes = [];
    
    for (let num = start; num <= end; num++) {
        if (isPrime(num)) {
            primes.push(num);
        }
    }

    return primes;
}

function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    
    for (let i = 5; i * i <= number; i += 6) {
        if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    
    return true;
}






document.getElementById('sentenceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const sentence = document.getElementById('sentenceInput').value;

    const sortedSentence = sortWordsByLength(sentence);

    document.getElementById('result3').textContent = sortedSentence;
});

function sortWordsByLength(sentence) {
    const words = sentence.split(/\s+/);

    words.sort((a, b) => a.length - b.length);

    return words.join(' ');
}





document.getElementById('filterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const arrayInput = document.getElementById('arrayInput').value;
    const functionInput = document.getElementById('functionInput').value;

    const array = arrayInput.split(',')
        .map(item => item.trim())
        .map(item => isNaN(item) ? item : Number(item));

    let predicate;
    try {
        predicate = new Function('item', `return ${functionInput}`);
    } catch (error) {
        document.getElementById('result').textContent = 'Invalid function code.';
        return;
    }

    const filteredArray = filterArray(array, predicate);

    document.getElementById('result4').textContent = `Filtered Array: ${filteredArray.join(', ')}`;
});

function filterArray(arr, predicate) {
    if (!Array.isArray(arr)) {
        throw new TypeError('The first argument must be an array.');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('The second argument must be a function.');
    }

    return arr.filter(predicate);
}
