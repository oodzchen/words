module.exports = {
  deduplicate: function deduplicate(arr) {
    const obj = {};
    for (let item of arr) {
      obj[item] = null;
    }
  
    return Object.keys(obj);
  }
}
