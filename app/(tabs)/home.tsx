import {
  View,
  Text,
  FlatList,
  Modal,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "@/components/HomeHeader";
import { useAuthContext } from "@/Context/AuthContext";
import LoadingDialog from "@/components/LoadingDialog";
import { getSaveUserByEmail, getStories } from "@/lib/GobalApi";
import { Redirect, router } from "expo-router";
import { StoryData } from "@/constants/Types";
import StoryCard from "@/components/StoryCard";
import EmptyComponent from "@/components/EmptyComponent";
import Loader from "@/components/Loader";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Home = () => {
  const [stories, setStories] = useState<StoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllStory().finally(() => setIsLoading(false));
  }, []);

  const handleOnRefresh = () => {
    setIsRefreshing(true);
    getAllStory().finally(() => setIsRefreshing(false));
  };

  const getAllStory = async () => {
    try {
      const stories = await getStories();
      const story: StoryData[] = stories.data.data;
      setStories(story);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <HomeHeader />

      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <FlatList
          className="w-full h-full p-2 px-4"
          contentContainerStyle={{ alignItems: "center" }}
          data={stories}
          numColumns={2}
          renderItem={({ item }) => <StoryCard item={item} />}
          ListEmptyComponent={
            <View className="px-2 w-full justify-center items-center">
              <EmptyComponent
                subTitle={"No story found"}
                title={"Create your first story just one click"}
                onPress={() => router.push("/create")}
                buttonLabel="Generate Story"
              />
            </View>
          }
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleOnRefresh}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
