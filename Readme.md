# MapReduce Simulation in Node.js

This project demonstrates a simple MapReduce implementation in Node.js to process a dataset stored in orders.tbl. 
It replicates the behavior of the SQL query:
```javascript
    SELECT CustKey, SUM(TotalPrice) FROM orders GROUP BY CustKey;
```

## 1. Features

- Reads a ```orders.tbl``` file line by line.
- Implements the MapReduce paradigm:
    * **Mapping Phase** : Extracts CustKey and TotalPrice from each line.
    * **Reducing Phase**: Aggregates the TotalPrice for each unique CustKey.
Outputs the aggregated results in a clean format.



## 3. Output

The script processes the ```orders.tb```l file and prints the aggregated results to the console in the format: 
> CustKey: TotalPrice

## 4. Example:
### For the input file:
>1|123|O|100.50|2024-12-10|1|John|1|Comment1

> 2|124|F|200.75|2024-12-11|2|Alice|1|Comment2

> 3|123|O|300.25|2024-12-12|1|John|1|Comment3

### The output will be:
> Mapping phase... 

> Reducing phase...

> Results:

> 123: 400.75

> 124: 200.75

## 5. Project Structure

    project-directory
    ├── mapReduce.js     # The Node.js script
    ├── orders.tbl       # The input dataset file


## 6. Troubleshooting

> ```Error```: File Not Found
- Ensure orders.tbl is in the same directory as mapReduce.js.
- Output Issues : Check that the orders.tbl file is formatted correctly with | as the delimiter.
