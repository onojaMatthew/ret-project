
// Hello message from api
exports.message = async (req, res) => {
  try {
    const message = "We are happy to have this wonderful project at hand at the moment";
    return res.json({ message });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}