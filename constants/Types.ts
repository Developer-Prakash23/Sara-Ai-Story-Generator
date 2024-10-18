export interface CreateStory {
  storySubjet: string;
  storyType: string;
  ageGroup: string;
  language: Language;
  email: string;
}

export enum Language {
  hindi = "Hindi",
  bengali = "Bengali",
  english = "English",
  tamil = "Tamil",
  telugu = "Telugu",
  marathi = "Marathi",
  gujarati = "Gujarati",
  kannada = "Kannada",
  malayalam = "Malayalam",
}

export interface StoryResponse {
  data: StoryData[];
  meta: MetaData;
}

export interface StoryData {
  id: number;
  documentId: string;
  storyId: string;
  story: Story;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  cover_image: string;
  story_title: string;
  story_type: string;
  story_subjet: string;
  age_group: string;
  language: string;
  user_list?: UserList;
  save_stories?: BookmarkStory[];
  localizations: any[];
}

export interface BookmarkStory {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  user_list?: UserList;
  story?: StoryData;
  localizations: any[];
}

export interface Story {
  chapters: Chapter[];
  story_name: string;
  cover_image: Image;
}

interface Chapter {
  image: Image;
  description: string;
  chapter_title: string;
}

interface Image {
  style: string;
  description: string;
}

export interface UserList {
  id: number;
  documentId: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
  avatar: string | null;
}

interface MetaData {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
