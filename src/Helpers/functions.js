const Functions = {
  getTitle: function (name) {
    if (name === "spectacles-women") {
      return "SPECTACLES WOMEN";
    } else if (name === "sunglasses-women") {
      return "SUNGLASSES WOMEN";
    } else if (name === "sunglasses-men") {
      return "SUNGLASSES MEN";
    } else if (name === "spectacles-men") {
      return "SPECTACLES MEN";
    }
  },

  getDate: function () {
    var today = new Date();
    var date = today.toUTCString();
    return date;
  },
};

export default Functions;
