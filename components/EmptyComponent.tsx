import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import CustomButton from "./CustomButton";

const EmptyComponent = ({
  title,
  subTitle,
  onPress,
  buttonLabel,
}: {
  title: string;
  subTitle: string;
  onPress: () => void;
  buttonLabel?: string;
}) => {
  return (
    <View className="items-center gap-2 w-full">
      <Image
        source={require("@/assets/images/empty-box.png")}
        resizeMode="contain"
        className="h-44"
      />
      <View className="items-center gap-1 w-full">
        <Text className="font-pregular text-gray-100 text-base">
          {subTitle}
        </Text>
        <Text className="font-pbold text-white text-xl  text-center">
          {title}
        </Text>

        <CustomButton
          label={buttonLabel || "Explore Story"}
          onPress={onPress}
          customClass="w-full mt-10"
        />
      </View>
    </View>
  );
};

export default EmptyComponent;
