const formValidate = ({ value, validate }) => {
  try {
    let keys = Object.keys(validate);

    // => keys = ['minlength','require']

    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      switch (key) {
        case "minlength":
          if (!value || value?.length < validate[key][0]) {
            throw Error(validate[key][1]);
          }
          break;

        case "require":
          if (!value || value?.trim() === "") {
            throw Error(validate[key][1]);
          }
          break;

        default:
          break;
      }
    }

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default formValidate;
