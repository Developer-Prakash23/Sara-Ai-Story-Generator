import { View, Text, Modal, ActivityIndicator, Platform } from "react-native";
import React from "react";

const LoadingDialog = ({
  loadingMessage,
  visible,
}: {
  loadingMessage: string;
  visible: boolean;
}) => {
  return (
    <Modal visible={visible} transparent className="w-full h-full absolute" animationType="fade">
      <View className="w-full h-full justify-center items-center bg-[#00000075] px-10">
        <View
          className={`justify-center items-center p-5 bg-black-200 w-full 
          rounded-lg space-y-5 py-10 drop-shadow-2xl z-10`}
          style={{
            elevation: 50,
          }}
        >
          <ActivityIndicator
            animating={true}
            color="#fff"
            size={Platform.OS === "ios" ? "large" : 50}
          />
          <Text className="text-white font-semibold text-base">
            {loadingMessage}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingDialog;
