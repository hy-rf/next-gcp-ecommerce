import { Part, GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextRequest } from "next/server";
interface Content {
  role: "user" | "model";
  parts: Part[];
}
export async function POST(req: NextRequest) {
  const postBody: { imageBase64: string; mimeType: string } = await req.json();
  const schema = {
    description: "Product details",
    type: SchemaType.OBJECT,
    properties: {
      name: {
        type: SchemaType.STRING,
        description: "Name of the product",
        nullable: false,
      },
      description: {
        type: SchemaType.STRING,
        description: "Description of the product",
        nullable: false,
      },
    },
    required: ["name", "description"],
  };
  const KEY = process.env.AI_API_KEY;
  if (!KEY) {
    return new Response(null, {
      status: 501,
    });
  }
  const genAI = new GoogleGenerativeAI(KEY);
  const model = genAI.getGenerativeModel({
    model: "models/gemini-1.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });
  const contents: Content[] = [
    {
      role: "user",
      parts: [
        {
          inlineData: {
            data: postBody.imageBase64.split(",")[1],
            mimeType: postBody.mimeType,
          },
        },
        {
          text: "Generate product name and description from the image, description is you express further what the product capable of or its good point than other minimal useable products, description can not be longer than 2 sentences.",
        },
      ],
    },
  ];
  const result = await model.generateContent({ contents });
  const data = JSON.parse(result.response.text());
  return new Response(JSON.stringify(data), {
    status: 200,
    statusText: "OK",
  });
}
