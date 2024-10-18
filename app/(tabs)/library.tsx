import { View, Text, ToastAndroid, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  deleteBookmark,
  getBookmarkByUserEmail,
} from "@/lib/GobalApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { BookmarkStory, StoryData } from "@/constants/Types";
import EmptyComponent from "@/components/EmptyComponent";
import { useAuthContext } from "@/Context/AuthContext";
import Loader from "@/components/Loader";
import StoryResultCard from "@/components/StoryResultCard";
import LoadingDialog from "@/components/LoadingDialog";

const Library = () => {
  const [bookmarkStories, setBookmarkStories] = useState<BookmarkStory[]>([]);
  const [storyData, setStoryData] = useState<StoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingDialog, setShowLoadingDialog] = useState(false);
  const { currentUser, bookmarkStoriesID, setBookmarkStroiesId } =
    useAuthContext();

  useEffect(() => {
    getBookmarkStory();
  }, [bookmarkStoriesID]);

  useEffect(() => {
    if (bookmarkStories) {
      const story = bookmarkStories
        .map((story) => story.story)
        .filter((story): story is StoryData => story !== undefined);
      setStoryData(story);
    }
  }, [bookmarkStories]);

  const getBookmarkStory = async () => {
    try {
      const response = await getBookmarkByUserEmail(currentUser?.email!!);
      const bookmarkStory: BookmarkStory[] = response.data.data;
      setBookmarkStories(bookmarkStory);
      console.log("Bookmark Story: ", response.data);
    } catch (error) {
      console.log("Bookmark get error: ", error);
      ToastAndroid.show("Internal server error", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromBookmark = async (storyId: number) => {
    setShowLoadingDialog(true);
    try {
      const bookmarkDocumentId = bookmarkStories.find(
        (bookmark) => bookmark.story?.id === storyId
      )?.documentId;

      const response = await deleteBookmark(bookmarkDocumentId!!);
      console.log("Bookmark remove response: ", response.data);

      const newBookmarkStoriesId = bookmarkStoriesID.filter(
        (_storyId) => _storyId !== storyId
      );
      setBookmarkStroiesId(newBookmarkStoriesId);
      ToastAndroid.show("Story removed successfully!", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Remove from bookmark error: ", error);
      ToastAndroid.show("Internal server error", ToastAndroid.SHORT);
    } finally {
      setShowLoadingDialog(false);
    }
  };

  return (
    <SafeAreaView className="flex h-full bg-primary pb-16">
      <Text className="text-2xl font-pbold text-white p-4">Save Story</Text>
      <View className="h-full flex">
        {isLoading ? (
          <View className="absolute justify-center items-center w-full h-full">
            <Loader isLoading={isLoading} />
          </View>
        ) : (
          <FlatList
            className="w-full h-full"
            data={storyData}
            renderItem={({ item, index }) => (
              <StoryResultCard
                key={index}
                storyData={item}
                onPress={() => {
                  router.push({
                    pathname: "/story-preview",
                    params: {
                      story: JSON.stringify(item),
                    },
                  });
                }}
                visibleActionButton={true}
                onDeletePress={handleRemoveFromBookmark}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <View className="flex-1 h-full justify-center items-center px-4">
                <EmptyComponent
                  subTitle="No Story Found"
                  title={`No saved story found`}
                  onPress={() => {
                    router.push({
                      pathname: "/home",
                    });
                  }}
                />
              </View>
            }
          />
        )}
      </View>
      <LoadingDialog
        loadingMessage="Removing from bookmark..."
        visible={showLoadingDialog}
      />
    </SafeAreaView>
  );
};

export default Library;
