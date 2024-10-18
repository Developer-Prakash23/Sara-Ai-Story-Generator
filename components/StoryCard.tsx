import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { router } from "expo-router";
import { StoryData } from "@/constants/Types";
import Avatar from "./Avatar";
import { useAuthContext } from "@/Context/AuthContext";

const StoryCard = ({ item }: { item: StoryData }) => {
  const { currentUser } = useAuthContext();

  const { width } = Dimensions.get("window");

  return (
    <View
      className="h-64 p-2"
      style={{
        width: width*0.95 / 2,
        alignSelf: "flex-start",
      }}
    >
      <TouchableOpacity
        className="bg-slate-400 w-full h-full rounded-lg "
        activeOpacity={0.6}
        onPress={() => {
          router.push({
            pathname: "/story-preview",
            params: { story: JSON.stringify(item) },
          });
        }}
      >
        <Image
          source={{ uri: item.cover_image }}
          className="w-full h-full rounded-lg"
          resizeMode="cover"
        />
        <View
          className={`w-full absolute bottom-0 blur-2xl
              justify-center items-center rounded-b-lg
              backdrop-blur-sm bg-slate-500/60`}
        >
          <Text className="text-white text-lg font-bold p-2" numberOfLines={1}>
            {item.story_title}
          </Text>
        </View>
        <View className="h-10 absolute w-full rounded-t-md">
          <View className="w-full h-full flex-row items-center px-1 space-x-1">
            <Avatar
              styleClass="w-8 h-8"
              textStyleClass="text-lg"
              photoURL={item.user_list?.avatar}
              defaultName={item.user_list?.name[0] || "UN"}
            />
            <Text
              className="text-white text-sm font-psemibold max-w-[80px]"
              numberOfLines={1}
            >
              @{currentUser?.displayName}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default StoryCard;
