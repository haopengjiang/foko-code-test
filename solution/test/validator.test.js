const { expect } = require("chai");
const validateData = require("../validator");

describe("Data Validator", () => {
  it("Should return false when employee id is not valid", (done) => {
    validateData(
      {
        id: "Ta45454545",
        firstName: "Rickey",
        lastName: "Mantle",
        phone: "(321) 332-9132",
        email: "the-mick@msn.com",
      },
      (error, valid, message) => {
        expect(valid).to.be.false;
        expect(message)
          .to.be.a('string')
          .and.equal('Employee Id is not valid');
        done();
      }
    );
  });

  it("Should return false when phone number is not valid", (done) => {
    validateData(
      {
        id: "T45454545",
        firstName: "Rickey",
        lastName: "Mantle",
        phone: "(321) 33d2-9132",
        email: "the-mick@msn.com",
      },
      (error, valid, message) => {
        expect(valid).to.be.false;
        expect(message)
          .to.be.a('string')
          .and.equal('Phone number format is not valid');
        done();
      }
    );
  });

  it("Should return false when email is not valid", (done) => {
    validateData(
      {
        id: "T45454545",
        firstName: "Rickey",
        lastName: "Mantle",
        phone: "(321) 332-9132",
        email: "@the-mick@msn.com",
      },
      (error, valid, message) => {
        expect(valid).to.be.false;
         expect(message)
          .to.be.a('string')
          .and.equal('Email format is not valid');
        done();
      }
    );
  });
  
  it("Should return true when data is valid", (done) => {
    validateData(
      {
        id: "T45454545",
        firstName: "Rickey",
        lastName: "Mantle",
        phone: "(321) 332-9132",
        email: "the-mick@msn.com",
      },
      (error, valid, message) => {
        expect(valid).to.be.true;
        done();
      }
    );
  });
});
