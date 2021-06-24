const handler = (req, res) => {
  if (req.method === "GET") {
    res.status(200).json({ message: "working" });
  }
};

export default handler;
