import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "@/components/CustomTextInput";
import CustomButton from "@/components/CustomButton";
import {
  generateImage,
  generateStory,
  getSaveUserByEmail,
  saveStory,
} from "@/lib/GobalApi";
import {
  CreateStory,
  Language,
  Story,
  StoryData,
  UserList,
} from "@/constants/Types";
import { useAuthContext } from "@/Context/AuthContext";
import { saveImageInDB } from "@/lib/Actions/Firebase";
import { SelectList } from "react-native-dropdown-select-list";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState("");
  const [storyData, setStoryData] = useState<CreateStory>({
    storyType: "",
    storySubjet: "",
    ageGroup: "",
    language: Language.english,
    email: "",
  });

  const { currentUser } = useAuthContext();

  useEffect(() => {
    if (currentUser?.email) {
      setStoryData({ ...storyData, email: currentUser.email });
    }
  }, [currentUser]);

  const storyTypes = [
    {
      id: 1,
      image: require("@/assets/images/story_book_cover.jpeg"),
      label: "Story Book",
    },
    {
      id: 2,
      image: require("@/assets/images/bed_story_cover.jpeg"),
      label: "Bed Story",
    },
    {
      id: 3,
      image: require("@/assets/images/educational_cover.jpeg"),
      label: "Educational Story",
    },
  ];

  const ageGroup = [
    {
      id: 1,
      image: require("@/assets/images/2-years.jpeg"),
      label: "0-2 Years",
    },
    {
      id: 2,
      image: require("@/assets/images/5-years.jpeg"),
      label: "2-5 Years",
    },
    {
      id: 3,
      image: require("@/assets/images/5-10-years.jpeg"),
      label: "5-10 Years",
    },
  ];

  const languages = [
    { key: "1", value: Language.english },
    { key: "2", value: Language.bengali },
    { key: "3", value: Language.hindi },
    { key: "4", value: Language.gujarati },
    { key: "5", value: Language.kannada },
    { key: "6", value: Language.malayalam },
    { key: "7", value: Language.marathi },
    { key: "8", value: Language.tamil },
    { key: "9", value: Language.telugu },
  ];

  const generateStoryScript = async () => {
    if (
      storyData.storySubjet === "" ||
      storyData.storyType === "" ||
      storyData.ageGroup === ""
    ) {
      return ToastAndroid.show("All fields are required!", ToastAndroid.SHORT);
    }
    setIsLoading(true);
    setIsCreating(true);
    setMessage("Creating your story...");
    try {
      const response = await generateStory(storyData);

      const story: Story = response.data.result;

      const prompt = story.cover_image.description;

      setMessage("Generating story image...");
      const image = await generateImage(prompt);
      const imageUrl = image.data.result;

      const download_url = await saveImageInDB(imageUrl);

      // get current user from remote server
      const users = await getSaveUserByEmail(currentUser?.email || "");
      const user: UserList = users?.data?.data[0];

      if (!user) return ToastAndroid.show("User not found", ToastAndroid.SHORT);

      setMessage("Saving story to server...");

      // Save story to remote server
      const savedStory = await saveStory({
        story,
        story_title: story.story_name,
        story_type: storyData.storyType,
        story_subjet: storyData.storySubjet,
        age_group: storyData.ageGroup,
        language: storyData.language,
        user_list: user.documentId,
        cover_image: download_url,
      });

      const { data }: { data: StoryData } = savedStory.data;

      // reset Story data
      setStoryData({
        storyType: "",
        storySubjet: "",
        ageGroup: "",
        language: Language.english,
        email: "",
      });
      

      router.push({
        pathname: "/story-preview",
        params: { story: JSON.stringify(data), form: "create" },
      });
    } catch (error: any) {
      console.log("Generate Story error: ", error.message);
      ToastAndroid.show("Error generating story", ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
      setIsCreating(false);
    }
  };

  useEffect(() => {
    setIsLoading(
      storyData.storySubjet === "" ||
        storyData.storySubjet.length < 20 ||
        storyData.storyType === "" ||
        storyData.ageGroup === ""
    );
  }, [storyData]);

  return (
    <SafeAreaView className="p-4 bg-primary">
      <Text className="text-2xl font-pbold pb-4 text-white">Create Story</Text>

      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        {/* Story Subject */}
        <CustomTextInput
          label={"Story subject"}
          onTextChange={(value) => {
            setStoryData({ ...storyData, storySubjet: value });
          }}
          value={storyData.storySubjet}
          // customClass={"mt-4"}
          isMultiline
          placeholder="Write your story subject here..."
        />

        {/* Select Language */}
        <Text className="mt-5 font-pbold text-white text-base">
          Select Language
        </Text>
        <SelectList
          defaultOption={{ key: "1", value: Language.english }}
          setSelected={(value: Language) =>
            setStoryData({ ...storyData, language: value })
          }
          data={languages}
          save="value"
          fontFamily="Poppins-SemiBold"
          boxStyles={{
            borderColor: "transparent",
            borderWidth: 0,
            backgroundColor: "#232533",
            borderRadius: 10,
            padding: 10,
            marginTop: 5,
          }}
          dropdownStyles={{
            backgroundColor: "#232533",
            borderRadius: 10,
            padding: 10,
            marginTop: 5,
            borderColor: "transparent",
          }}
          inputStyles={{
            color: "#fff",
          }}
          dropdownTextStyles={{
            color: "#fff",
          }}
          closeicon={<EvilIcons name="close" size={24} color="white" />}
          searchicon={<EvilIcons name="search" size={24} color="white" />}
        />

        {/* Story Type */}
        <Text className="mt-5 font-pbold text-base text-white">Story type</Text>
        <View className="flex-row gap-2 mt-0.5 flex">
          {storyTypes.map((value, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setStoryData({ ...storyData, storyType: value.label })
              }
              key={index}
              className={`blur-md bg-primary h-40 w-full flex-1 rounded-md border-4 ${
                storyData?.storyType === value.label
                  ? "border-secondary-200"
                  : "border-primary"
              }`}
            >
              <Image
                source={value.image}
                className="w-full h-full rounded-md"
                resizeMode="cover"
              />
              <Text className="w-full text-center absolute bottom-0 p-2 bg-slate-400 rounded-b-md">
                {index == 2 ? "Educational" : value.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Age Group */}
        <Text className="mt-5 font-pbold text-base text-white">Age group</Text>
        <View className="flex-row gap-2 mt-0.5 flex">
          {ageGroup.map((value, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                setStoryData({ ...storyData, ageGroup: value.label })
              }
              key={index}
              className={`blur-md h-40 w-full flex-1 rounded-md border-4 ${
                storyData.ageGroup === value.label
                  ? "border-secondary-200"
                  : "border-primary"
              }`}
            >
              <Image
                source={value.image}
                className="w-full h-full rounded-md"
                resizeMode="cover"
              />
              <Text className="w-full text-center absolute bottom-0 p-2 bg-slate-400 rounded-b-md">
                {value.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate story button */}
        <CustomButton
          label="Generate Story"
          onPress={generateStoryScript}
          customClass="mt-8 mb-16"
          disabled={isLoading}
        />
      </ScrollView>

      <Loading isLoading={isCreating} message={message} />
    </SafeAreaView>
  );
};

const Loading = ({
  isLoading,
  message,
}: {
  isLoading: boolean;
  message: string;
}) => {
  return (
    <Modal
      visible={isLoading}
      transparent={true}
      statusBarTranslucent
      className="w-full h-full justify-center items-center"
    >
      <View className="w-full h-full justify-center items-center bg-[#02020273]">
        <View className="w-[85%] p-4 bg-white rounded-md justify-center items-center">
          <Image
            source={require("@/assets/images/magic_loading.gif")}
            resizeMode="contain"
            className="w-52 h-52"
          />

          <Text className="font-pbold text-lg">{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Create;
