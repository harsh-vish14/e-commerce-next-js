import { db } from "../../lib/connectDB";

const userDetails = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const { userId } = req.body;
    const user = db.collection("users").doc(userId);
    if (!(await user.get()).exists) {
      res.status(200).json({ err: "user not found" });
      return;
    }

    res.status(200).json((await user.get()).data());
  }
};

export default userDetails;
