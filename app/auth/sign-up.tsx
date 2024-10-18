import { View, Text, ActionSheetIOS, ToastAndroid } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import { Href, Link, router } from "expo-router";
import { createAccount } from "@/lib/Actions/Firebase";
import { saveUser } from "@/lib/GobalApi";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(
      formData.email === "" ||
        formData.name === "" ||
        formData.password === "" ||
        formData.password.length < 8
    );
  }, [formData]);

  const handleSignUp = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      return ToastAndroid.show("All Field are required", ToastAndroid.SHORT);
    }

    const { email, password, name } = formData;

    await createAccount({ email, password, name })
      .then(async (user) => {
        if (!user) return ToastAndroid.show("Internal server error", ToastAndroid.SHORT);
        console.log("user: ", user);
        await saveUser({ email, name })
          .then((response) => {
            ToastAndroid.show("SignUp successfull! Sign-In", ToastAndroid.SHORT)
            router.replace("/auth/sign-in");
          })
          .catch((error) => {
            console.log("Save data error: ", error);
            ToastAndroid.show(error.message, ToastAndroid.LONG);
          });
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      });
  };

  

  return (
    <SafeAreaView className="p-4 flex-1 bg-primary justify-center items-center">
      <View className="w-full">
        <Text className="text-2xl font-pextrabold text-white">Sign Up</Text>
        <View>
          <CustomTextInput
            label="Full Name"
            onTextChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Rahul Roy"
            value={formData.name}
            customClass={"mt-8"}
          />
          <CustomTextInput
            label="Email Id"
            onTextChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="example@gmail.com"
            value={formData.email}
            customClass={"mt-4"}
          />
          <CustomTextInput
            label="Password"
            onTextChange={(value) =>
              setFormData({ ...formData, password: value })
            }
            placeholder="*******"
            value={formData.password}
            customClass={"mt-4"}
          />

          <CustomButton
            label="Sign Up"
            onPress={handleSignUp}
            customClass="mt-10"
            disabled={isDisabled}
          />

          <View className="flex flex-row gap-2 justify-center">
            <Text className="font-psemibold text-white">
              Don't have an account?
            </Text>
            <Link
              href={"/auth/sign-in" as Href}
              className="font-psemibold text-blue-500"
            >
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
