import { hashing } from "../../../lib/auth";
import { db } from "../../../lib/connectDB";

const signInHandler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_KEY
  ) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(200).json({ err: "Invalid response" });
      return;
    }
    if (!email.includes("@")) {
      res.status(403).json({ err: "Invalid email" });
      return;
    }

    if (password.length < 7) {
      res.status(403).json({ err: "Small password" });
      return;
    }
    const user = await db
      .collection("users")
      .where("email", "in", [email])
      .get();
    if (!user.empty) {
      res.status(422).json({ err: "User already exists" });
      return;
    }
    const hashedPassword = await hashing(password);
    db.collection("users").add({
      name,
      email,
      password: hashedPassword,
      likes: [],
      carts: [],
    });
    res.status(200).json({ message: "user added successfully" });
  }
};

export default signInHandler;
