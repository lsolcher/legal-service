export async function performAnalysis(
  content: string,
  model: string,
): Promise<string> {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'; // Fallback für lokale Entwicklung
  const url = `${baseUrl}/api/analyse-law`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      model,
    }),
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `External analysis API failed: Status ${response.status}, Message: ${errorDetails}`,
    );
  }
  const data = await response.json();
  return data.analysis;
}
