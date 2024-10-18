import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { StoryData } from "@/constants/Types";
import { Pressable, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Bookmark from "@/components/Bookmark";

const StoryPreview = () => {
  const navigation = useNavigation();
  const [storyData, setStoryData] = useState<StoryData>();
  const { story, form }: { story: any; form: any } = useLocalSearchParams()

  useEffect(() => {
    const storyData = JSON.parse(story);
    setStoryData(storyData);
    if (!form)
      navigation.setOptions({
        title: storyData.story.story_name,
        headerShown: true,
        headerRight: () => <Bookmark storyId={storyData.id} />,
      });
  }, [story]);

  return (
    <View className="bg-primary">
      {form && (
        <SafeAreaView
          className={`w-full bg-primary shadow-lg border-b-2
          border-b-[#7c7c7c23] items-center justify-center flex-none`}
        >
          <View className="w-full flex-row gap-8 h-28 items-center">
            <Pressable onPress={() => router.navigate("/home")}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </Pressable>
            <Text
              className="text-xl font-psemibold text-center text-white"
              numberOfLines={1}
            >
              {storyData?.story.story_name}
            </Text>
          </View>
        </SafeAreaView>
      )}
      <PagerView className={`w-full flax-col ${form ? "h-[92vh]" : "h-full"}`}>
        {storyData?.story.chapters.map((story, index) => (
          <View
            className="w-full h-full p-3 items-center flex flex-col"
            key={index}
          >
            <Text className="text-xl font-pbold py-4 w-full text-center bg-yellow-100 rounded-md">
              {story.chapter_title}
            </Text>
            <View className="flex-1 flex mt-2 mb-8  w-full">
              <Text className="text-lg font-pregular w-full p-3 bg-blue-100 rounded-md">
                {story.description}
              </Text>
            </View>

            <Text className="font-pbold text-white">Page-{index + 1}</Text>
          </View>
        ))}
      </PagerView>
    </View>
  );
};

export default StoryPreview;
