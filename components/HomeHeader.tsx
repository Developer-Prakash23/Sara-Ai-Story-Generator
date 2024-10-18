import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAuthContext } from "@/Context/AuthContext";
import { router } from "expo-router";
import Avatar from "./Avatar";
const HomeHeader = () => {
  const { currentUser } = useAuthContext();

  return (
    <View
      className="border-b-4 border-black-100 bg-primary shadow-2xl"
      style={{}}
    >
      <View className="justify-between flex-row px-4 py-4">
        <View>
          <View className="bg-black-200 p-2 rounded-full">
            <FontAwesome name="language" size={24} color="white" />
          </View>
        </View>
        <View className="justify-center items-center flex-row gap-3">
          <TouchableOpacity
            onPress={() => router.push("/search")}
            className="bg-black-200 rounded-full p-2"
          >
            <FontAwesome name="search" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Avatar
              styleClass="w-8 h-8 border-2 border-secondary"
              photoURL={currentUser?.photoURL}
              defaultName={currentUser?.displayName?.toString()[0] || "UN"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;
