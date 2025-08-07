const BaseUrl = import.meta.env.VITE_API_URL;

export async function loginUserApi(phoneNo, password) {
  if (!phoneNo || !password) {
    console.log("not enough login data");
    return;
  }
  try {
    console.log(`${BaseUrl}/user/login`);
    const response = await fetch(`${BaseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNo,
        password,
      }),
      credentials: "include",
    });

    const data = await response.json();

    console.log("Login response:", data);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
  }
}

export async function registerUserApi(name, email, password, city, phone) {
  const response = await fetch(`${BaseUrl}/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      city,
      phone,
    }),
  });

  const data = await response.json(); // await was missing
  console.log(data);
  return data;
}

export async function logOutUserApi() {
  const response = await fetch(`${BaseUrl}/user/logout`, {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}
