import React from "react";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="story-preview"
        options={{
          title: "Story Preview",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#232533",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            color: "white",
          },
          
        }}
      />

      <Stack.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="search-result"
        options={{
          title: "Search Result",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
