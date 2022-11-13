var items = 10;
var time = 20;
var arr = []
const divWidth = document.getElementById('barcontainer').offsetWidth



var speedOutput = document.getElementById("speed")
var speedSlider = document.getElementById('speed-slider').oninput = function () {
    var value = document.getElementById('speed-slider').value
    time = value
    speedOutput.innerHTML = time;
}

var sizeOutput = document.getElementById("size")
var sizeSlider = document.getElementById('size-slider').oninput = function () {
    var value = document.getElementById('size-slider').value
    items = value
    sizeOutput.innerHTML = items;
    init();
}

init();

function drawArr(array) {
    barcontainer.innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = array[i] + "%";
        bar.style.width = (divWidth / array.length) + "px";
        bar.style.marginLeft = .1 * (divWidth / array.length) + "px"
        bar.style.marginRight = .1 * (divWidth / array.length) + "px"
        bar.style.backgroundColor = "red";
        barcontainer.appendChild(bar);
    }
}

function init() {
    arr = []
    for (let i = 0; i < items; i++) {
        arr[i] = i + 1
    }
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    drawArr(arr);
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

async function bubbleSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - 1 - i; j++) {
            await delay(time);
            if (array[j] > array[j + 1]) {
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
            drawArr(array)
        }
    }
}

function play() {
    bubbleSort(arr);
}



async function mergesort(array, low, high) {
    //Delay promise
    let midpoint = Math.floor((low + high) / 2);
    //Sorting sections
    if (midpoint - low > 1) {
        await mergesort(array, low, midpoint);
    }
    if (high - midpoint > 1) {
        await mergesort(array, midpoint, high);
    }
    //Merging data
    let left = [];
    let right = [];
    for (let i = low; i < midpoint; i++) {
        left.push(array[i]);
    }
    for (let i = midpoint; i < high; i++) {
        right.push(array[i]);
    }
    let merged = merge(left, right);
    //Overwritting with new data
    for (let i = low; i < high; i++) {
        array[i] = merged[i - low];
        drawArr(array);
        await delay(time);
    }
}
//Merges arrays
function merge(arr1, arr2) {
    let merged = [];
    //Repeating until one is empty
    while (arr1.length > 0 && arr2.length > 0) {
        //Selecting smaller
        if (arr1[0] < arr2[0]) {
            merged.push(arr1[0]);
            arr1.splice(0, 1);
        }
        else {
            merged.push(arr2[0]);
            arr2.splice(0, 1);
        }
    }
    //Everything else just gets added
    if (arr1.length == 0) {
        for (let i = 0; i < arr2.length; i++) {
            merged.push(arr2[i]);
        }
    }
    else if (arr2.length == 0) {
        for (let i = 0; i < arr1.length; i++) {
            merged.push(arr1[i]);
        }
    }
    return merged;
}

function play3() {
    mergesort(arr, 0, arr.length);
}

async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i; j > 0; j--) {
            await delay(time);
            if (array[j] < array[j - 1]) {
                const temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
            else {
                break;
            }
            drawArr(array)
        }

    }
}

function play1() {
    insertionSort(arr);
}

async function selectionsort(array) {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i; j < array.length; j++) {
            await delay(time);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            drawArr(arr);
        }

        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }
}

function play2() {
    selectionsort(arr);
}

async function cocktailSort(arr) {
    var i, left = 0, right = arr.length - 1, temp;
    while (left < right) {
        for (i = left; i < right; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                drawArr(arr);
                await delay(time);
            }
        }
        right--;
        for (i = right; i > left; i--) {
            if (arr[i - 1] > arr[i]) {
                var temp = arr[i-1];
                arr[i-1] = arr[i];
                arr[i] = temp;
                drawArr(arr);
                await delay(time);
            }
        }
        left++;
    }
}


function play4() {
    cocktailSort(arr);
}

function swapIndex(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return arr;
}

function heapSort(arr) {

    async function max_heapify(a, i, length) {
        while (true) {
            var left = i * 2 + 1;
            var right = i * 2 + 2;
            var largest = i;

            if (left < length && a[left] > a[largest]) {
                largest = left;
            }

            if (right < length && a[right] > a[largest]) {
                largest = right;
            }

            if (i == largest) {
                break;
            }

            await swapIndex(a, i, largest);
            await drawArr(arr);
            await delay(time)
            i = largest;
        }
    }

    async function heapify(a, length) {
        for (var i = Math.floor(length / 2); i >= 0; i--) {
            await max_heapify(a, i, length);
        }
    }

    async function heapsort(a) {
        await heapify(a, a.length - 1);

        for (var i = a.length - 1; i >= 0; i--) {
            await swapIndex(a, i, 0);
            await drawArr(arr);
            await delay(time)
            await max_heapify(a, 0, i);
        }
    }

    heapsort(arr);
}

function play5() {
    heapSort(arr);
}

async function quickSort(arr) {
    await QS(0, arr.length - 1);
    async function partition(pivot, left, right) {
        const pivotValue = arr[pivot];
        var partitionIndex = left;
        var i = left;

        for (var i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                await swapIndex(arr, i, partitionIndex);
                await drawArr(arr);
                await delay(time);
                partitionIndex++;
            }
        }
        await swapIndex(arr, right, partitionIndex);
        await drawArr(arr);
        await delay(time);
        return Promise.resolve(partitionIndex);
    }
    async function QS(left, right) {
        if (left < right) {
            const pivot = right;
            const partitionIndex = await partition(pivot, left, right);
            await QS(left, partitionIndex - 1);
            await QS(partitionIndex + 1, right);
        }
        return Promise.resolve();
    }
}


function play6() {
    quickSort(arr);
}

function end() {
    location.reload()
}