// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  seoText: any;
};

type Error = {
  message: string;
};

const GPT_KEY = process.env.GPT_API_KEY;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${GPT_KEY}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  let color = "Black";
  let size = "Oversized";
  let category = "T-shirt";
  let brand = "Filippa K";
  if (req.body) {
    let body = JSON.parse(req.body);
    color = body.category;
    category = body.category;
    brand = body.brand;
    size = body.size;
  }

  const parts = category.split(" ");

  if (parts.length > 5) {
    throw new Error("please reduce size of request");
  }

  let basePrompt = `what is an ideal SEO text for a ${color} ${size} ${category} made by the brand ${brand}? Use color, size, category and brand in the result. Do not include anything regarding SEO`;
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: basePrompt,
        temperature: 0,
        max_tokens: 550,
      }),
    });
    const seoText = await response.json();

    res.status(200).json({
      message: "success",
      seoText: seoText.choices[0].text,
    });
  } catch (err) {
    console.log("error: ", err);
  }
}
