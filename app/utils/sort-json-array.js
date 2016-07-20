// Quick sorts an array of json objects by specified key is ascending order
export default function sortJsonArray(array, key) {
    let swap = function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    };
    let partition = function(arr, pivot, left, right) {
        let pivotValue = arr[pivot][key],
        partitionIndex = left;
        for (let i = left; i < right; i ++) {
            if (arr[i][key] < pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex ++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    };
    let quickSort = function(arr, left, right) {
        let len = arr.length,
        pivot,
        partitionIndex;
        if (left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }
    return quickSort(array, 0, array.length - 1);
}
