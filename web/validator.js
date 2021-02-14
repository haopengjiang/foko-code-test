const employeeIdRGEX = /^[a-zA-Z][0-9]{6,}$/;
const phoneRGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
const emailRGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateData = (row, done) => {
  const isValidemployeeId = employeeIdRGEX.test(row.id);
  const isValidPhoneNumber = phoneRGEX.test(row.phone);
  const isValidEmail = emailRGEX.test(row.email);

  // validate employee id, phone number and email
  if (!isValidemployeeId) {
    return done(null, false, "Employee Id is not valid");
  } else if (!isValidPhoneNumber) {
    return done(null, false, "Phone number format is not valid");
  } else if (!isValidEmail) {
    return done(null, false, "Email format is not valid");
  }
  return done(null, true);
}

module.exports = validateData;