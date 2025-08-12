export async function getAllGarbageIssues() {
    const response = await fetch("http://localhost:8080/issues/garbage/all")
    const data = await response.json()
    console.log(data)
}