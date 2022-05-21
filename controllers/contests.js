const demoFunction = (req, res) => {
  return res.send("Hello World " + req.params.id);
};

module.exports = demoFunction;
