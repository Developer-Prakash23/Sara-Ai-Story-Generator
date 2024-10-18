import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

const Search = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full h-16 bg-primary mt-4 border-b border-b-black-200">
        <View className="flex-row items-center justify-center w-full h-full gap-4 px-3 flex">
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign
              name="arrowleft"
              size={26}
              color="white"
              className="flex-none"
            />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-black-200 rounded-md pr-2">
            <TextInput
              className="flex-1 w-full p-2 pl-4 font-pregular text-white"
              placeholderTextColor={'gray'}
              returnKeyType="search"
              placeholder="Search by Story title, Subject, Auther..."
              numberOfLines={1}
              autoFocus={true}
              focusable={true}
              onSubmitEditing={(e) => {
                const text = e.nativeEvent.text;
                const query = text.trim()
                router.push({
                  pathname: "/search-result",
                  params: { query },
                });
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
