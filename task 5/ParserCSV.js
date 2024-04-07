/*
A given CSV file has the same number of fields in each record.
To determine the number of fields, open the CSV in a text editor,
count the number of commas in the first line and add one to the result.
*/

function parseCSVtoMatrix(strCSV) {
    let buff = parseCSVtoArray(strCSV);
    return transformArrayToMatrix(buff);
}

function parseCSVtoArray(strCSV) {
    try {
        let data = []
        let regex = /("([^"]|"")*"|([^",\r\n]*))?(,|\r\n)?/
        let size = 0;
        let check = false;
        while (regex.test) {
            let buff = regex.exec(strCSV);
            if (buff[0] === "") {
                break;
            }
            let current = buff[1]
            if (buff[1][0] === '"') {
                current = "";
                for (let i = 1; i < buff[1].length - 1; i++) {
                    current += buff[1][i];
                }
            }
            data[data.length] = current
            if ((!check) && (buff[4] === '\r\n')) {
                check = true;
                size++;
            }
            else {
                if (!check) {
                    size++;
                }
            }
            strCSV = strCSV.replace(regex, "")
        }
        data[data.length] = size;
        return data; // data = [yourData,yourData,yourData,yourData..., rowSize]
    }
    catch{
        alert("Your test is incorrect")
        return
    }
}

function transformArrayToMatrix(array) {
    let matrix = []
    let count = 0;
    for (let i = 0; i < (array.length - 1) / array[array.length - 1]; i++) {
        matrix[i] = []
        for (let j = 0; j < array[array.length - 1]; j++) {
            matrix[i][j] = array[count];
            count++;
        }
    }
    return matrix;
}