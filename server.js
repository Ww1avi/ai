const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = "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";

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("AI backend running at http://localhost:3000");
});
