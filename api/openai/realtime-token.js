export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is not configured"
    });
  }

  try {
    const response = await fetch(
      "https://api.openai.com/v1/realtime/client_secrets",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          session: {
            type: "realtime",
            model: "gpt-realtime"
          }
        })
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    if (!response.ok) {
      console.error("OpenAI client secret error:", response.status, data);

      return res.status(response.status).json({
        error: "OpenAI client secret request failed",
        status: response.status,
        details: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Realtime token server error:", error);

    return res.status(500).json({
      error: "Realtime token server error",
      details: error.message
    });
  }
}
