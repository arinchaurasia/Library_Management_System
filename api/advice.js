/* Vercel Serverless: Gemini 1.5 Flash - Chat & AI Assistant */

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set in Vercel Environment Variables." });
    }

    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required." });
        }

        const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
        let lastError = null;

        for (const model of modelsToTry) {
            const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();

            if (response.ok) {
                return res.status(200).json(data);
            }

            lastError = (data.error && data.error.message) ? data.error.message : `Model ${model} failed.`;
        }

        return res.status(500).json({ error: lastError || "Gemini API request failed across models." });

    } catch (error) {
        console.error("Gemini API error:", error);
        return res.status(500).json({ error: "Internal server error connecting to Gemini API." });
    }
}
