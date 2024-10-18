import {
  View,
  Text,
  ToastAndroid,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import { Href, Link, router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import LoadingDialog from "@/components/LoadingDialog";
import {
  forgetPassword,
  sendEmailVerificationEmail,
  signIn,
} from "@/lib/Actions/Firebase";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsDisabled(
      formData.email === "" ||
        formData.password === "" ||
        formData.password.length < 8
    );
  }, [formData]);

  const handleSignIn = async () => {
    if (!formData.email || !formData.password) {
      return ToastAndroid.show(
        "Please fill all the fields",
        ToastAndroid.SHORT
      );
    }
    try {
      setIsLoading(true);
      const user = await signIn({
        email: formData.email,
        password: formData.password,
      });

      if (!user.emailVerified) {
        await sendEmailVerificationEmail(user);
        ToastAndroid.show(
          "Please verify your Email then continue.",
          ToastAndroid.LONG
        );
      } else {
        ToastAndroid.show("Sign in Successfull!", ToastAndroid.SHORT);
        router.navigate('/home')
      }
    } catch (error: any) {
      console.log("Signing error: ", error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      setShowModal(false)
      await forgetPassword(email);
      ToastAndroid.show("Email send successfully!", ToastAndroid.LONG);
    } catch (error: any) {
      console.log("Forget Password Error: ", error);
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="p-4 flex-1 gap-8 bg-primary justify-center items-center">
      <View className="w-full p-4">
        <Text className="text-2xl font-pextrabold text-white">Sign In</Text>
        <View>
          <CustomTextInput
            label="Email Id"
            onTextChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="example@gmail.com"
            value={formData.email}
            customClass={"mt-8"}
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

          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Text className="text-white font-psemibold self-end mt-2">
              Forget Password?
            </Text>
          </TouchableOpacity>

          <CustomButton
            label="Sign In"
            onPress={handleSignIn}
            customClass="mt-10"
            disabled={isDisabled}
          />

          <View className="flex flex-row gap-2 justify-center">
            <Text className="font-psemibold text-white">
              Don't have an account?
            </Text>
            <Link
              href={"/auth/sign-up" as Href}
              className="font-psemibold text-blue-500"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </View>

      {/* Forget Password MODAL */}
      <ForgetPasswordModel
        showModal={showModal}
        onCloseRequest={() => {
          setShowModal(false);
        }}
        handleForgetPassword={handleForgetPassword}
      />

      {/* Loading Modal */}
      <LoadingDialog
        loadingMessage="Signing your account..."
        visible={isLoading}
      />
    </SafeAreaView>
  );
};

const ForgetPasswordModel = ({
  showModal,
  onCloseRequest,
  handleForgetPassword,
}: {
  showModal: boolean;
  onCloseRequest: () => void;
  handleForgetPassword: (email: string) => void;
}) => {
  const [email, setEmail] = useState("");

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-[#a8a8a865] w-full px-4">
        <View
          className="bg-primary p-3 w-full rounded-md"
          style={{ elevation: 500 }}
        >
          <TouchableOpacity className="self-end" onPress={onCloseRequest}>
            <Ionicons name="close" size={24} color={"white"} />
          </TouchableOpacity>

          <CustomTextInput
            label={"Email ID"}
            onTextChange={(text) => {
              setEmail(text);
            }}
            placeholder="example@gmail.com"
            customClass="my-5"
          />

          <CustomButton
            label="Send Reset Link"
            onPress={() => handleForgetPassword(email)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SignIn;
