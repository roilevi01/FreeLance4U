export const validateBusinessCard = (formData) => {
  const errors = [];

  if (!formData.businessName || formData.businessName.trim().length < 3) {
    errors.push("Business name must be at least 3 characters.");
  }

  if (!formData.description || formData.description.trim().length < 10) {
    errors.push("Description must be at least 10 characters.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.contactInfo)) {
    errors.push("Contact info must be a valid email address.");
  }

  const phoneRegex = /^[0-9]{9,}$/;
  if (!phoneRegex.test(formData.phoneNumber)) {
    errors.push("Phone number must be at least 9 digits.");
  }

  return errors;
};
