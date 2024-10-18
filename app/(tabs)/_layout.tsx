import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF9C01",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarStyle: {
          height: 78,
          backgroundColor: "#161622",
          borderTopColor: "#1E1E2D",
          borderTopWidth: 3,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="home"
              color={color}
              size={size}
              label="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="library"
              color={color}
              size={size}
              label="Library"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="create"
              color={color}
              size={size}
              label="Create"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              iconName="person"
              color={color}
              size={size}
              label="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

const TabIcon = ({
  color,
  size,
  label,
  iconName,
  focused,
}: {
  color: string;
  size: number;
  label: string;
  iconName: "library" | "create" | "person" | "home";
  focused: boolean;
}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* @ignor-ts */}
      <Ionicons name={iconName} size={size} color={color} />
      <Text style={{ color, fontWeight: focused ? "800" : "500" }}>
        {label}
      </Text>
    </View>
  );
};

export default TabsLayout;
