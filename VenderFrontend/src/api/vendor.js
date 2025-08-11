export default async function loginVendor(phoneNo, password) {
  try {
    const response = await fetch(`http://localhost:8080/vendor/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // cookies ko send/receive karega
      body: JSON.stringify({
        phoneNo,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
}
<<<<<<< HEAD

export async function logOutVendor() {
  
  const response = await fetch("http://localhost:8080/vendor/logout", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  console.log(data);
  return data;
}
=======
>>>>>>> ec42a5d7ebac66fbc8778aa9e668e47ce5866965
