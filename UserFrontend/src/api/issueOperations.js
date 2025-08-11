const baseUrl = import.meta.env.VITE_API_URL;

export async function reportIssue(
  image,
  issueTitle,
  selectedCategory,
  latitude,
  longitude,
  locationExtra
) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("issueTitle", issueTitle);
  formData.append("issueDepartment", selectedCategory);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("landmark", locationExtra);

  const response = await fetch(`${baseUrl}/issue/report`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const data = await response.json();
  console.log(data);
  return data;
}

export async function getMyReports() {
  const res = await fetch("http://localhost:8080/user/myreports", {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  console.log(data);
}
