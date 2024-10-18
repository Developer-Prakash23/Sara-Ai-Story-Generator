import { View, Text, Pressable, FlatList, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import EmptyComponent from "@/components/EmptyComponent";
import Loader from "@/components/Loader";
import StoryResultCard from "@/components/StoryResultCard";
import { searchStories } from "@/lib/GobalApi";
import { StoryData } from "@/constants/Types";
import qs from "qs";

const SearchResult = () => {
  const { query } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [storyData, setStoryData] = useState<StoryData[]>([]);

  useEffect(() => {
    getStoryData();
  }, [query]);

  const getStoryData = async () => {
    setIsLoading(true);
    const filters = qs.stringify(
      {
        filters: {
          $or: [
            {
              story_subjet: {
                $containsi: query,
              },
            },
            {
              story_title: {
                $containsi: query,
              },
            },
            {
              age_group: {
                $containsi: query,
              },
            },
            {
              user_list: {
                name: {
                  $containsi: query,
                },
              },
            },
          ],
        },
      },
      {
        encodeValuesOnly: true,
      }
    );

    try {
      const response = await searchStories(filters);
      setStoryData(response.data.data);
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show("Error: " + error.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary">
      <View className="w-full h-16 shadow-lg p-3">
        <View className="w-full h-full border border-gray-100 rounded-lg flex flex-row items-center space-x-3 px-3">
          <Feather name="search" size={24} color="white" />
          <Pressable onPress={() => router.back()} className="flex-1">
            <Text numberOfLines={1} className="text-gray-200">
              {query}
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="h-full flex">
        {isLoading ? (
          <Loader isLoading={isLoading} />
        ) : (
          <View className="w-full h-full">
            {storyData.length > 0 ? (
              <FlatList
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
                  />
                )}
              />
            ) : (
              <EmptyComponent
                title={`No result found for this \n"${query}"`}
                subTitle="No Story Found"
                onPress={()=>{
                  
                }}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchResult;
