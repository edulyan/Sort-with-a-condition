const fs = require('fs');

function mergeSort(array) {
    if (array.length <= 1) {
      return array;
    }
    
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function merge(left, right) {
    const result = [];
    let i = 0;
    let j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    
    while (j < right.length) {
      result.push(right[j]);
      j++;
    }
    
    return result;
  }

function cdsOptimisation () {
    try {
        let numb = [];

        let fileName = process.argv[2];

        const readable = fs.createReadStream(fileName, 'utf8', { highWaterMark: 64 * 1024 });
            
        readable.on('data', (chunk)=> {
            numb = chunk.split("").map(e => +e);
        });

        readable.on('end', (e) => {
            numb = mergeSort(numb);
            console.log(numb);

            process.stdout.write("Successfully finished the operation");
            return;
        });
        
        readable.on('error', (e) => {
            console.log("Some error occurred: ", e);
        });   
    } catch (error) {
        console.log(error.message);
        throw Error(error);
    }

}

cdsOptimisation();