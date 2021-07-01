export const signInWithCredentials = async (userDetails) => {
  const res = await fetch("/api/auth/signIn", {
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

export const getAllCardsDetails = async () => {
  const res = await fetch("/api/products").catch((err) => {
    console.error(err);
  });
  const data = await res.json().catch((err) => {
    console.error(err);
  });
  if (!res.ok) {
    return { status: "error", data };
  }
  return { status: "success", data };
};

export const addLikeOrCart = async (
  userId,
  productId,
  operation,
  wantToAdd
) => {
  const res = await fetch("/api/products/operations", {
    method: "POST",
    body: JSON.stringify({ userId, productId, operation, wantToAdd }),
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
    return { status: "error", data };
  }
  return { status: "success", data };
};

export const getUserDetails = async (userId) => {
  const res = await fetch("/api/userDetails", {
    method: "POST",
    body: JSON.stringify({ userId }),
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
    return { status: "error", data };
  }
  return { status: "success", data };
};

export const removeAllItems = async (passingData) => {
  const res = await fetch("/api/products/clearproducts", {
    method: "POST",
    body: JSON.stringify(passingData),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { status: "error", data };
  }
  return { status: "success", data };
};
