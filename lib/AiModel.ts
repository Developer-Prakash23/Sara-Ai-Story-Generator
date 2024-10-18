/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "create kids story on description for 5-8 Years kids, educational story, and all images in Paper cut style: story of boy and Magic School, give me at list 10 chapter, with detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "## The Boy and the Magic School: A Paper Cut Adventure\n\n**JSON Format:**\n\n```json\n{\n  \"story_name\": \"The Boy and the Magic School\",\n  \"cover_image\": {\n    \"description\": \"A paper cut scene of a boy, with wide curious eyes, standing in front of a grand, colorful castle. The castle has a swirling, sparkling tower and a large sign that reads \\\"Magic School\\\" in glittery letters.\",\n    \"style\": \"Paper Cut\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"The Curious Boy\",\n      \"description\": \"A young boy named Leo sits on a park bench, staring longingly at a beautiful, old building across the street. The building has colorful stained glass windows, a giant, ornate clock, and a sign that reads \\\"Magic School\\\" in swirling script.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo, with big brown eyes, sitting on a park bench. He's looking across the street at a grand building with colorful stained glass windows, a large clock, and a sign that reads \\\"Magic School\\\" in swirling script.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Mysterious Invitation\",\n      \"description\": \"Leo finds a small, glowing envelope tucked under a rose bush. It's addressed to him and invites him to attend the Magic School. He reads it with wide eyes and a racing heart.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo with a surprised look on his face, holding a small, glowing envelope. The envelope is addressed to him and has a swirling, colorful seal with a star and a wand.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"Journey to the School\",\n      \"description\": \"Leo follows the glowing map in the invitation to the Magic School. He travels through a magical forest with talking animals, across a bridge made of clouds, and finally arrives at the grand school gates.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo walking through a magical forest. There are talking animals around him like a wise owl, a playful squirrel, and a friendly rabbit. In the distance, the Magic School is visible, with its tall towers and magical glow.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Welcome Ceremony\",\n      \"description\": \"Leo enters the school and is welcomed by a friendly, smiling wizard with a long beard and a twinkling staff. He is given a magical robe and a wand, and learns about the different magical subjects he'll study.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo standing in a large hall with high ceilings. A kind wizard, with a long white beard, is handing him a magical robe and a wand. Other children, dressed in magical robes, are smiling at him.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Charms Class\",\n      \"description\": \"Leo's first class is Charms. He learns to make objects float, change their color, and even make them sing! He practices with his new wand and discovers he has a natural talent for magic.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo in a classroom with a blackboard filled with magical formulas. He is holding his wand, trying to make a small paper bird fly. The bird is hovering in the air and emitting a happy sound.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Potion Class\",\n      \"description\": \"In Potion Class, Leo learns to mix magical ingredients to create potions that can cure illnesses, change flavors, and even make people invisible! He learns about the importance of precision and careful measurement.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo standing in a Potion Class, surrounded by bubbling cauldrons and magical ingredients. He is carefully mixing a potion with a glass stirring rod, following the instructions in a large, magical book.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Magical Games\",\n      \"description\": \"During the school's annual magical games, Leo competes in various challenges like flying on a magical broom, playing Quidditch with a magical ball, and solving riddles in a magical maze.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo racing on a magical broom in a sky filled with fluffy clouds. Other children are flying around him on brooms, and there is a large, sparkling trophy in the distance.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"The Mystery of the Missing Wand\",\n      \"description\": \"A magical wand is stolen from the school. Leo and his friends use their magical skills and teamwork to solve the mystery and find the missing wand. They learn about the importance of honesty and courage.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo and his friends standing in a dark corridor, looking for clues. They are holding their wands, which are emitting a faint light. In the distance, a mysterious shadow is lurking.\",\n        \"style\": \"Paper Cut\"\n      }\n    },\n    {\n      \"chapter_title\": \"Graduation Day\",\n      \"description\": \"After months of learning and adventures, graduation day arrives. Leo and his classmates celebrate with a magical feast, receive their diplomas, and are ready to use their magic to make the world a better place.\",\n      \"image\": {\n        \"description\": \"Paper cut image of Leo and his classmates, dressed in their graduation robes, standing on a stage in front of the Magic School. They are holding their diplomas, smiling and cheering with joy. There is a large, magical celebration happening around them.\",\n        \"style\": \"Paper Cut\"\n      }\n    }\n  ]\n}\n```\n\nThis JSON format provides a detailed outline for your paper-cut storybook. You can use the image descriptions to create visually engaging and unique illustrations, adding your own creative touches. \n"},
      ],
    },
  ],
});
