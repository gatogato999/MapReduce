
const fs = require('fs');
const readline = require('readline');
//map reduce in assense is to brake large amount of data to smaller chunks ,
// then processing them (mapping: sort, categorize, brake down)
// then combining the results (reduce: combine to meaningful )

// File path for orders.tbl
const filePath = './orders.tbl';

// each line represents one order
// Mapper: Parse and emit (CustKey, TotalPrice) pairs
function mapLine(line) {
    const fields = line.split('|'); // Assuming '|' is the delimiter in orders.tbl
    const custKey = fields[1]; // CustKey is the second field
    const totalPrice = parseFloat(fields[3]); // TotalPrice is the fourth field

    return { custKey, totalPrice };
}

// Reducer: group all TotalPrice by CustKey
// and adds them together
function reduce(mappedData) {
    const reducedData = {};

    mappedData.forEach(({ custKey, totalPrice }) => {
        if (!reducedData[custKey]) {
            reducedData[custKey] = 0;
        }
        reducedData[custKey] += totalPrice;
    });

    return reducedData;
}

// Main function to run the MapReduce job
async function mapReduce(filePath) {
    const mappedData = [];
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    console.log('Mapping phase...');
    for await (const line of rl) {
        if (line.trim()) {
            mappedData.push(mapLine(line));
        }
    }

    console.log('Reducing phase...');
    const reducedData = reduce(mappedData);

    console.log('Results:');
    for (const [custKey, totalPrice] of Object.entries(reducedData)) {
        console.log(`${custKey}: ${totalPrice.toFixed(2)}`);
    }
}

// Run the MapReduce job
mapReduce(filePath).catch((err) => {
    console.error('Error:', err.message);
});