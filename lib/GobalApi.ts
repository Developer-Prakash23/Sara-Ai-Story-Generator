import { CreateStory } from "@/constants/Types";
import axios from "axios";

// Local API .......
const localApiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_LOCAL_API_BASE_URL,
});

export const generateStory = async (data: CreateStory) =>
  await localApiClient.post("/generate-story", data);

export const generateImage = async (prompt: string) =>
  await localApiClient.post("/generate-image", {
    prompt,
  });

// Remote API --------
const remoteApiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_REMOTE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_REMOTE_API_KEY}`,
  },
});

// User API Start--------
export const saveUser = async (data: any) =>
  await remoteApiClient.post("/user-lists", {
    data,
  });

export const getSaveUserByEmail = async (email: string) =>
  await remoteApiClient.get(`user-lists?filters[email][$eq]=${email}`);

export const getUserByDocumnetId = async (documentId: string) =>
  await remoteApiClient.get(`user-lists?filters[documentId][$eq]=${documentId}`);

export const getAllSaveUser = async () =>
  await remoteApiClient.get("user-lists");

export const updatedUserInDB = async (documentId: string, data:any) =>
  await remoteApiClient.put(`user-lists/${documentId}`, {data});
// User API End-------

// Story API Start--------
export const saveStory = async (data: any) =>
  await remoteApiClient.post("/stories", {
    data: data,
  });

export const getStories = async () =>
  await remoteApiClient.get("/stories?populate=*");

export const getStoryByDocumentId = async (documentId: string) =>
  await remoteApiClient.get(`/stories?populate=*&filters[documentId][$eq]=${documentId}`);

export const getUserStoriesByEmail = async (email: string) =>
  await remoteApiClient.get(
    `/stories?populate=*&filters[user_list][email][$eq]=${email}`
  );
// Story Api End-------

// Search API Start----------
export const searchStories = async (query: string) =>
  remoteApiClient.get(`/stories?${query}`);
// Search API END ---------

// Bookmark API Start ----------
export const createBookmark = async (data: any) =>
  await remoteApiClient.post("save-stories", { data });

export const getBookmarkByUserEmail = async (email: string) =>
  await remoteApiClient.get(
    `save-stories?populate=*&filters[user_list][email][$eq]=${email}`
  );
export const deleteBookmark = async (documentId: string) =>
  await remoteApiClient.delete(`/save-stories/${documentId}`);
/// Bookmark API END ------
