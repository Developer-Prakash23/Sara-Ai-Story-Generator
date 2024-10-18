import { TouchableOpacity, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuthContext } from "@/Context/AuthContext";
import { createBookmark } from "@/lib/GobalApi";
import LoadingDialog from "./LoadingDialog";

const Bookmark = ({ storyId }: { storyId: number }) => {
  const { bookmarkStoriesID, currentUserDocumentID, setBookmarkStroiesId } =
    useAuthContext();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSaved(bookmarkStoriesID.includes(storyId));
  }, [bookmarkStoriesID]);

  const saveAsBookmark = async () => {
    setIsLoading(true);
    try {
      const response = await createBookmark({
        user_list: currentUserDocumentID,
        story: storyId,
      });
      setBookmarkStroiesId((prev) => [...prev, storyId]);
      ToastAndroid.show("Story saved as Bookmark", ToastAndroid.SHORT);
    } catch (error) {
      console.log("Bookmark error: ", error);
      ToastAndroid.show("Internal server error!", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        className={`h-full justify-center items-center ${
          isSaved ? "opacity-40" : "opacity-100"
        }`}
        onPress={saveAsBookmark}
        disabled={isSaved}
      >
        <FontAwesome name="bookmark" size={24} color="white" />
      </TouchableOpacity>

      <LoadingDialog loadingMessage="Saving Story" visible={isLoading} />
    </>
  );
};

export default Bookmark;
