import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const CustomTextInput = ({
  label,
  onTextChange,
  customClass,
  isMultiline,
  placeholder,
  value,
}: {
  label: string;
  onTextChange: (value: string) => void;
  customClass?: string;
  isMultiline?: boolean;
  placeholder?: string;
  value?: string;
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className={` ${customClass}`}>
      <Text className="font-pbold text-white text-base">{label}</Text>
      <View className="flex-row items-center w-full flex bg-black-200 rounded-md">
        <TextInput
          className={`w-full p-3  mt-1.5 max-h-28
             text-white font-psemibold flex-1`}
          placeholderTextColor={"gray"}
          multiline={isMultiline}
          placeholder={placeholder}
          value={value}
          onChangeText={onTextChange}
          secureTextEntry={
            label.toLowerCase().includes("password")
              ? !isPasswordVisible
              : false
          }
        />
        {label.toLowerCase().includes("password") && (
          <TouchableOpacity
            className="px-2"
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color={"gray"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomTextInput;
