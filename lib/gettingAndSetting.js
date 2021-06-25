export const signInWithCredentials = async (userDetails) => {
  const res = await fetch("http://localhost:3000/api/auth/signIn", {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  }).catch((err) => {
    console.error(err);
  });
  const data = await res.json().catch((err) => {
    console.error(err);
  });
  if (!res.ok) {
    console.error(data);
    return { status: "error", message: data.err };
  }
  return { status: "success", message: data.message };
};
