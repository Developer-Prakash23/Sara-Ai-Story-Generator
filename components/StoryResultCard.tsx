import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StoryData } from "@/constants/Types";

const StoryResultCard = ({
  storyData,
  onPress,
  visibleActionButton,
  onDeletePress,
}: {
  storyData: StoryData;
  onPress: () => void;
  visibleActionButton?: boolean;
  onDeletePress?: (storyId:number) => void;
}) => {
  return (
    <View className="w-full px-4 py-2">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        className="w-full bg-black-200 rounded-md p-2 flex-row flex space-x-3"
      >
        <Image
          source={{ uri: storyData.cover_image }}
          className="h-32 w-24 rounded-md flex-none"
          resizeMode="cover"
        />
        <View className="flex-1 justify-between">
          <View className="space-y-1">
            <Text className="text-white font-pbold text-lg" numberOfLines={2}>
              {storyData.story_title}
            </Text>
            <Text className="text-gray-100 font-semibold" numberOfLines={1}>
              {storyData.story_subjet}
            </Text>
          </View>
          <View className="w-fit flex-row space-x-3 py-2">
            <Text
              className="text-gray-50 font-psemibold text-sm"
              numberOfLines={1}
            >
              {storyData.language} Story
            </Text>
            <Text
              className="text-gray-50 font-psemibold text-sm"
              numberOfLines={1}
            >
              {storyData.age_group}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {visibleActionButton && (
        <View className="w-full h-14 items-center bg-black-200 flex-row flex space-x-2">
          <TouchableOpacity
            onPress={onPress}
            className="flex-1 justify-center items-center bg-secondary-100 rounded-md"
          >
            <Text className="text-white font-psemibold text-sm p-2">
              View Story
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 justify-center items-center bg-secondary rounded-md"
            onPress={() => onDeletePress && onDeletePress(storyData.id)}
          >
            <Text className="text-white font-psemibold text-sm p-2">
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default StoryResultCard;
