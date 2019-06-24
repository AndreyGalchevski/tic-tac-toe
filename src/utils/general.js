const waitFor = async ms => new Promise(res => setTimeout(res, ms));

module.exports = {
  waitFor,
};
