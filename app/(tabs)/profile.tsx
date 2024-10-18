import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  saveImageInDB,
  signOut,
  updateUserProfile,
} from "@/lib/Actions/Firebase";
import { Href, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuthContext } from "@/Context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { StoryData } from "@/constants/Types";
import { getUserStoriesByEmail, updatedUserInDB } from "@/lib/GobalApi";
import StoryCard from "@/components/StoryCard";
import Avatar from "@/components/Avatar";
import EmptyComponent from "@/components/EmptyComponent";
import LoadingDialog from "@/components/LoadingDialog";
import Loader from "@/components/Loader";

const Profile = () => {
  const [stories, setStories] = useState<StoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { currentUser } = useAuthContext();

  useEffect(() => {
    setIsLoading(true);
    getStories().finally(() => setIsLoading(false));
  }, []);

  const getStories = async () => {
    try {
      const stories = await getUserStoriesByEmail(currentUser?.email!!);
      const story: StoryData[] = stories.data.data;
      setStories(story);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT);
    }
  }

  const handleOnRefresh = () => {
    setIsRefreshing(true);
    getStories().finally(() => setIsRefreshing(false));
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <FlatList
          className="w-full h-full px-2"
          contentContainerStyle={{ alignItems: "center" }}
          data={stories}
          numColumns={2}
          renderItem={({ item }) => <StoryCard item={item} />}
          ListHeaderComponent={<HeaderComponent stories={stories} />}
          ListEmptyComponent={
            <View className="px-2 w-full justify-center items-center">
              <EmptyComponent
                subTitle={"No story found"}
                title={"No story found at this profile"}
                onPress={function (): void {
                  throw new Error("Function not implemented.");
                }}
                buttonLabel="Go to Home"
              />
            </View>
          }
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />}
        />
      )}
    </SafeAreaView>
  );
};

const HeaderComponent = ({ stories }: { stories: StoryData[] }) => {
  const { currentUser, bookmarkStoriesID, currentUserDocumentID } =
    useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    await signOut()
      .then(() => {
        ToastAndroid.show("Sign Out", ToastAndroid.SHORT);
        router.replace("/auth/sign-in" as Href);
      })
      .catch((error: any) => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      });
  };

  let totalLikes: number = 0;

  stories.map((storyData) => {
    if (storyData.save_stories) {
      totalLikes += storyData.save_stories?.length;
    }
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      uploadImageInDB(uri);
    }
  };

  const uploadImageInDB = async (uri: string) => {
    try {
      if (currentUser) {
        setIsLoading(true);
        const downloadUrl = await saveImageInDB(uri, currentUser.uid);
        const updatedUser = { ...currentUser, photoURL: downloadUrl };
        await updateUserProfile(currentUser, updatedUser);
        await updatedUserInDB(currentUserDocumentID!!, {
          avatar: downloadUrl
        });
      }
    } catch (error) {
      console.log("Profile Image uploading Error: ", error);
      ToastAndroid.show("Internal Server error", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="w-[100vw] p-4">
      <TouchableOpacity className="self-end" onPress={handleSignOut}>
        <Ionicons name="exit-outline" size={36} color="white" />
      </TouchableOpacity>
      <View className="w-full justify-center items-center mb-4">
        {/* Profile Photo */}
        <View className="justify-center items-center h-28 w-28">
          <View className="absolute z-10 bottom-0 right-0">
            <TouchableOpacity
              onPress={pickImage}
              className="bg-gray-700 p-1 rounded-full"
            >
              <Ionicons name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Avatar
            styleClass="border-secondary-200 border-4"
            photoURL={currentUser?.photoURL}
            defaultName={currentUser?.displayName?.toString()[0] || "UN"}
          />
        </View>
        {/* Username */}
        <Text className="text-white py-5 font-psemibold">
          @{currentUser?.displayName}
        </Text>

        <View className="w-full flex-row justify-center items-center gap-10">
          <View className="items-center">
            <Text className="text-lg text-white font-pbold">
              {stories.length}
            </Text>
            <Text className="text-lg text-white font-psemibold">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg text-white font-pbold">
              {bookmarkStoriesID.length}
            </Text>
            <Text className="text-lg text-white font-psemibold">Bookmarks</Text>
          </View>
          <View className="items-center">
            <Text className="text-lg text-white font-pbold">{totalLikes}</Text>
            <Text className="text-lg text-white font-psemibold">Likes</Text>
          </View>
        </View>
      </View>

      <LoadingDialog visible={isLoading} loadingMessage="Uploading Image..." />
    </View>
  );
};

export default Profile;
