export async function changeStatus(issueId, newStatus) {
  try {
    const response = await fetch('http://localhost:8080/issue/status/update', {
      method: 'PUT', // PUT or PATCH for update ops
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId, status: newStatus }),
    });

    if (!response.ok) {
      throw new Error('Failed to update status');
    }

    const data = await response.json();
    return data; // { success: true, updatedIssue: {...} } or error message
  } catch (error) {
    console.error('Error updating status:', error);
    return { success: false, error: error.message };
  }
}
