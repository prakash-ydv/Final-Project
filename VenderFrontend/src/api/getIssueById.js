export async function getOneIssue(issueId) {
  try {
    const response = await fetch(`http://localhost:8080/issue/${issueId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch issue");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
