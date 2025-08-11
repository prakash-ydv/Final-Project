export async function getLatestIssues() {
  const response = await fetch("http://localhost:8080/issues/getall");
  const data = await response.json();
  console.log(data);
  return data.data;
}
