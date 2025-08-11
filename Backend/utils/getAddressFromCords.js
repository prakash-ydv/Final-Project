import axios from "axios";

export async function getAddressFromCoords(lat, lon) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

    const response = await axios.get(url, {
      headers: { "User-Agent": "MyApp/1.0 (myemail@example.com)" }
    });

    return response.data.display_name || "No address found";
  } catch (err) {
    console.error("Error:", err.message);
    return null;
  }
}

// Example usage
getAddressFromCoords(18.48623, 74.01825).then(console.log);
