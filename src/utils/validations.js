// messages
const validationMessage = {
  required: "This field is required*",
  email: "Please enter a valid email id",
  phoneNo: "Please enter a valid Contact Number",
  number: "Please enter a number",
  abhyasiIdPattern: "Please enter a valid Abhyasi ID",
  panNoPattern: "Please enter a valid PAN Number"
};

// validations
const validations = {
  required: {
    value: true,
    message: validationMessage.required
  },

  email: {
    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    message: validationMessage.email
  },

  phoneNo: {
    value: /^[0-9]{10,14}$/,
    message: validationMessage.phoneNo
  },

  userName: {
    value: /^(?![\s.]+$)[a-zA-Z\s]*$/,
    message: validationMessage.userName
  },

  number: {
    value: /^\d+$/,
    message: validationMessage.number
  },

  abhyasiId: {
    value: /^([a-zA-Z]{6}[0-9]{3}|[HABhab]{1}[0-9]{8})$/,
    message: validationMessage.abhyasiIdPattern
  },

  panNo: {
    value: /^([A-Z]{5}[0-9]{4}[A-Z]{1})$/,
    message: validationMessage.panNoPattern
  }
};

export default validations;
