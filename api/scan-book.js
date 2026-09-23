export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not set in Vercel Environment Variables." });
    }

    try {
        const { mimeType, fileData, textContent } = req.body;

        const systemPrompt = `You are an expert library book scanner AI.
Analyze the provided image of a book cover, spine, or receipt/invoice document.
Extract the book details and output a JSON object with:
- "title": string (Book title)
- "author": string (Author name)
- "category": string (ONE of: "Fiction", "Science", "History", "Computer Science", "Self-Help", "Other")
- "copies": number (Default 1)

Return ONLY valid JSON format:
{"title": "Clean Code", "author": "Robert C. Martin", "category": "Computer Science", "copies": 1}`;

        const parts = [];

        if (textContent) {
            parts.push({ text: `${systemPrompt}\n\nDocument Text:\n${textContent}` });
        } else if (fileData && mimeType) {
            parts.push({ text: systemPrompt });
            parts.push({
                inlineData: {
                    mimeType: mimeType,
                    data: fileData
                }
            });
        } else {
            return res.status(400).json({ error: "No file provided." });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: parts }] })
        });

        const data = await response.json();

        if (!response.ok) {
            const errorMsg = (data.error && data.error.message) ? data.error.message : "Scan failed.";
            return res.status(response.status).json({ error: errorMsg });
        }

        const rawText = data.candidates[0].content.parts[0].text;
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : rawText;
        const bookObj = JSON.parse(jsonString);

        return res.status(200).json({ book: bookObj });

    } catch (error) {
        console.error("Scan book error:", error);
        return res.status(500).json({ error: "Failed to parse book cover image." });
    }
}
