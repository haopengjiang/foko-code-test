const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const pool = require("./db");
const _ = require("lodash");
const moment = require("moment");

// store csv data for database
const csvData = [];
// store csv data for output csv file
const outData = [];

const processData = (data) => {
  // process data for db
  csvData.push([
    data.id,
    data.firstName,
    data.lastName,
    data.phone,
    data.email,
  ]);

  // process data for output csv
  const outputData = Object.assign(
    _.pick(data, ["id", "firstName", "lastName", "phone"]),
    {
      createdDate: moment().format(),
      updatedDate: moment().format(),
    }
  );
  outData.push(outputData);
}

const generateResult = ()=> {
  // prepare for writing out csv
  const csvWriter = createCsvWriter({
    path: `${process.argv[3]}`,
    header: [
      { id: "id", title: "EmployeeID" },
      { id: "firstName", title: "FName" },
      { id: "lastName", title: "LName" },
      { id: "phone", title: "Phone Number" },
      { id: "createdDate", title: "Date Created" },
      { id: "updatedDate", title: "Date Updated" },
    ],
  });

  // save data to db
  const query = "INSERT INTO employee (employeeId, first_name, last_name, phone, email) VALUES ?";
    pool.query(query, [csvData], (error, response) => {
      if (error) console.log(error);
      else { 
        console.log( `Imported into ${response.affectedRows} records into mysql`);
        // write data to output csv file
        csvWriter.writeRecords(outData).then(() => {
          console.log(console.log("The CSV file was written successfully"));
          process.exit(0);
        });
      }
    });
};

module.exports = {
  processData,
  generateResult
};