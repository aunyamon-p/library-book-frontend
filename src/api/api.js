const BASE_URL = "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: "Bearer " + options.token } : {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
}

export const login = (username, password) => {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
};

export const getBooks = (token) => {
  return request("/books", {
    token,
  });
};
