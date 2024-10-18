import axios from "axios";

export async function POST(request: Request) {
  try {

    const {prompt} = await request.json()

    const options = {
      method: "POST",
      url: process.env.IMAGE_GENERATOR_BASE_URL,
      headers: {
        "x-rapidapi-key": process.env.RAPID_API_KEY,
        "x-rapidapi-host": process.env.RAPID_API_HOST,
        "Content-Type": "application/json",
      },
      data: { text: prompt },
    };

    const response = await axios.request(options);

    if (!response.data.generated_image)
        return Response.json({error: "Internal server error."}, {status:500})

    return Response.json({result: response.data.generated_image})
  } catch (error: any) {
    throw new Error(error.message);
  }
}
