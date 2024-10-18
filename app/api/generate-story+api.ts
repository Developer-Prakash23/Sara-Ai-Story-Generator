import { CreateStory } from "@/constants/Types";
import { chatSession } from "@/lib/AiModel";
import { getSaveUserByEmail, saveStory } from "@/lib/GobalApi";

export async function POST(req: Request) {
  const { ageGroup, language, storySubjet, storyType, email }: CreateStory =
    await req.json();

  try {
    if (!ageGroup || !language || !storySubjet || !storyType) {
      return Response.json(
        { error: "Please provide all the required fields" },
        { status: 400 }
      );
    }

    // Generate a story in json format

    const prompt =
      `create kids story on description for ${ageGroup} kids, ${storyType}, and all images in Paper cut style: story of ${storySubjet}, give me at list 5 chapter in ${language} language, with detailed image text prompt for each of chapter and image prompt for story cover book with story name and make sure all image prempt are English Language, all in JSON field format.`;

    const response: any = await chatSession.sendMessage(prompt);

    const story = JSON.parse(response.response.text());

    console.log(story);
    

    return Response.json({ result: story }, { status: 200 });
  } catch (error: any) {
    console.log(error);

    return Response.json({ error: error.message }, { status: 500 });
  }
}
