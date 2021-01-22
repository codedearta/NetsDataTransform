exports = function(arrayElementIdName, arrayElementIdValue, newArrayElement) {
  if (arrayElementIdValue === undefined) {
    const message =
      "'" +
      arrayElementIdName +
      "' not present in 'newArrayElement':" +
      JSON.stringify(newArrayElement);
    throw new Error(message);
  }
};
