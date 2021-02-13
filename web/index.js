const fs = require('fs');
const pool = require('./db')
const fastcsv = require('fast-csv');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const _ = require('lodash');
const moment = require('moment')

const csvWriter = createCsvWriter({
  path: `${process.argv[3]}`,
  header: [
    {id: 'id', title: 'EmployeeID'},
    {id: 'firstName', title: 'FName'},
    {id: 'lastName', title: 'LName'},
    {id: 'phone', title: 'Phone Number'},
    {id: 'createdDate', title: 'Date Created'},
    {id: 'updatedDate', title: 'Date Updated'},
  ]
});

let stream = fs.createReadStream(`${process.argv[2]}`);
let csvData = [];
let outData = [];
const employeeIdRGEX = /^[a-zA-Z][0-9]{6,}$/;
const phoneRGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

let csvStream = fastcsv
  .parse({ headers: [ 'id', 'firstName', 'lastName','phone','email' ], renameHeaders: true, trim:true})
  .validate((row, cb) => {
        const isValidemployeeId = employeeIdRGEX.test(row.id);
        const isValidPhoneNumber = phoneRGEX.test(row.phone);
        const isValidEmail = emailRGEX.test(row.email);
        if (!isValidemployeeId) {
          return cb(null, false, 'Employee Id is not valid');
        } else if (!isValidPhoneNumber) {
          return cb(null, false, 'Phone number format is not valid');
        } else if (!isValidEmail) {
          return cb(null, false, 'Email format is not valid');
        }
        return cb(null, true);
  })
  .on('error', error => console.error(error))
  .on('data', data => {
    csvData.push([data.id,data.firstName,data.lastName,data.phone,data.email]);

    let outputData = Object.assign(
      _.pick(data,['id', 'firstName', 'lastName','phone']),
      {
        createdDate:moment().format(),
        updatedDate:moment().format()
      })
    outData.push(outputData);
  })
  .on('data-invalid', (row, rowNumber, reason) => console.log(`Invalid [rowNumber=${rowNumber}] [reason=${reason}]`))
  .on('end', ()=> {
     let query = 'INSERT INTO employee (employeeId, first_name, last_name, phone, email) VALUES ?';
     pool.query(query, [csvData], (error, response) => {
       if (error) console.log(error);
       else {
          console.log(`Imported into ${response.affectedRows} records into mysql`);
          csvWriter.writeRecords(outData)
            .then(() => {
              console.log(console.log('The CSV file was written successfully'));
              process.exit(0);
          });
       }
    })
  });

stream.pipe(csvStream);