
 function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function insertSpaces(aString) {
    return aString.split("").join("‎");
  }
  module.exports = {
    capitalize,
    insertSpaces,
  };