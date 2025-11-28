import { GoogleGenAI } from "@google/genai";
import { type Task } from "../../types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

/**
 * Converts a File object to Base64 string
 */
async function fileToBase64(file: File | Blob): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}

/**
 * Generate structured task data from audio using Gemini
 */
async function generateStructuredTask(
  base64Audio: string,
  mimeType: string
): Promise<Task> {
  const prompt = `You are an AI assistant helping hotel staff create task requests from voice recordings.

Listen to the audio and extract the following information to create a structured task:
- room: The room number mentioned (e.g., "405", "211")
- category: The department responsible (choose from: Housekeeping, Engineering, Concierge, Front Desk, or Other)
- title: A brief description of the task (e.g., "Broken AC in room", "Extra pillows needed")
- assignee: The person assigned to the task if mentioned, otherwise use a generic name based on category
- dueTime: When the task should be completed (e.g., "8:00 PM", "ASAP", "tomorrow morning")

If any information is not clearly mentioned in the audio, make reasonable inferences based on context.

Return the information in JSON format matching this structure:
{
  "room": "string",
  "category": "string",
  "title": "string",
  "assignee": "string",
  "dueTime": "string"
}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inlineData: {
              mimeType,
              data: base64Audio,
            },
          },
        ],
      },
    ],
    config: {
      responseMimeType: "application/json",
      temperature: 0.3,
    },
  });

  const text = response.text || "";
  
  // Parse JSON response, handling markdown code blocks if present
  let jsonText = text.trim();
  if (jsonText.startsWith("```json")) {
    jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
  } else if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/```\n?/g, "");
  }

  const taskData = JSON.parse(jsonText) as Task;
  return taskData;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return Response.json(
        { success: false, error: "No valid audio file found." },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { success: false, error: "GEMINI_API_KEY not configured." },
        { status: 500 }
      );
    }

    // Type check and convert to Base64
    if (typeof audioFile === "string") {
      return Response.json(
        { success: false, error: "Invalid audio file format." },
        { status: 400 }
      );
    }

    const base64Audio = await fileToBase64(audioFile);
    const mimeType = audioFile instanceof File ? audioFile.type : "audio/webm";

    // Generate structured task from audio
    const taskData = await generateStructuredTask(base64Audio, mimeType);

    // Return the structured data to the client
    return Response.json({ success: true, task: taskData }, { status: 200 });
  } catch (error) {
    console.error("Transcription error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error during processing.";
    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}