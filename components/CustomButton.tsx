import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({
  label,
  onPress,
  customClass,
  disabled,
}: {
  label: string;
  onPress: () => void;
  customClass?: string;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`w-full justify-center items-center p-4 bg-secondary rounded-lg my-4 ${customClass} ${
        disabled ? "opacity-60" : ""
      }`}
      disabled={disabled}
      onPress={onPress}
    >
      <Text className="text-white font-extrabold  text-base">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
