// Sorts an array of json object by specified key is ascending order
export default function sortJsonArray(array, key) {
    for (let i = array.length - 1; i >= 0; i --) {
        for (let j = 1; j <= i; j ++) {
            if (array[j - 1][key] > array[j][key]) {
                let temp = array[j - 1];
                array[j - 1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}
