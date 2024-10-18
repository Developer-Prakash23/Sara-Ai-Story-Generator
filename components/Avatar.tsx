import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/Context/AuthContext";

const Avatar = ({
  styleClass,
  textStyleClass,
  photoURL,
  defaultName,
}: {
  styleClass?: string;
  textStyleClass?: string;
  photoURL: string | null | undefined;
  defaultName: string
}) => {
  return (
    <View className={`w-28 h-28 rounded-full ${styleClass}`}>
      {photoURL ? (
        <Image
          source={{ uri: photoURL }}
          resizeMode="contain"
          className="w-full h-full rounded-full"
        />
      ) : (
        <View className="w-full h-full justify-center items-center bg-black-100 rounded-full">
          <Text
            className={`text-4xl font-psemibold text-gray-100 ${textStyleClass}`}
          >
            {defaultName}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Avatar;
