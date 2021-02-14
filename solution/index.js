const fs = require("fs");
const fastcsv = require("fast-csv");
const validateData = require("./validator");
const { processData, generateResult } = require("./dataService")

const stream = fs.createReadStream(`${process.argv[2]}`);

const options = {
  headers: ["id", "firstName", "lastName", "phone", "email"],
  renameHeaders: true,
  trim: true,
  ignoreEmpty: true,
};

const csvStream = fastcsv
  .parse(options)
  .validate(validateData)
  .on("error", (error) => console.error(error))
  .on("data", processData)
  .on("data-invalid", (row, rowNumber, reason) =>
    console.log(`Invalid [rowNumber=${rowNumber}] [reason=${reason}]`)
  )
  .on("end", generateResult);

stream.pipe(csvStream);
