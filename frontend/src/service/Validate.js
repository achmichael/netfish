// Utility functions to validate individual fields
const validateName = (name) => {
  // Validate the name is not empty and is less than 50 characters
  return name.trim() !== "" && name.length < 50;
};

const validateDescription = (description) => {
  // Validate the description is not empty and is less than 190 characters
  return description.trim() !== "" && description.length < 190;
};

const validatePositiveNumber = (value) => {
  // Validate that the value is a positive number
  return !isNaN(value) && Number(value) > 0;
};

// Function to validate all fields and set errors
const validateData = (data) => {
  const errors = {};

  if (!validateName(data.name)) {
    errors.name = "Name must be less than 50 characters and cannot be empty";
  }

  if (!validateDescription(data.description)) {
    errors.description =
      "Description must be less than 190 characters and cannot be empty";
  }

  if (!validatePositiveNumber(data.price)) {
    errors.price = "Price must be a positive number";
  }

  if (!validatePositiveNumber(data.weight)) {
    errors.weight = "Weight must be a positive number";
  }

  if (!validatePositiveNumber(data.stock)) {
    errors.stock = "Stock must be a positive number";
  }

  return errors;
};

export {
    validatePositiveNumber,
    validateData,
    validateDescription,
    validateName,
}