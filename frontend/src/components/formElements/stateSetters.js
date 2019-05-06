const updateFormElement = target => () => {
  const { type, name, value, checked } = target;
  switch (type) {
    case "checkbox":
      return {
        [name]: checked
      };
    case "text":
    case "email":
    case "password":
    case "textarea":
      return {
        [name]: value
      };
    default:
      return null;
  }
};

export default updateFormElement;
