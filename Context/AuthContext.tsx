import useContextWrapper from "@/hooks/useContextWrapper";
import { auth } from "@/lib/FirebaseConfig";
import { getBookmarkByUserEmail, getSaveUserByEmail } from "@/lib/GobalApi";
import { User } from "firebase/auth";
import React, { createContext, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

interface AuthContextType {
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserDocumentID: string | undefined;
  setCurrentUserDocumentID: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  bookmarkStoriesID: number[];
  setBookmarkStroiesId: React.Dispatch<React.SetStateAction<number[]>>;
}

const CurrentUserContext = createContext<AuthContextType | undefined>(
  undefined
);

export const useAuthContext = () =>
  useContextWrapper(CurrentUserContext, {
    contextName: useAuthContext.name,
    providerName: AuthContext.name,
  });

export const AuthContext = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [currentUserDocumentID, setCurrentUserDocumentID] = useState<string>();
  const [bookmarkStoriesID, setBookmarkStroiesId] = useState<number[]>([]);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      loading,
      setLoading,
      currentUserDocumentID,
      setCurrentUserDocumentID,
      bookmarkStoriesID,
      setBookmarkStroiesId,
    }),
    [currentUser, loading, currentUserDocumentID, bookmarkStoriesID]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setCurrentUser(user || undefined);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  useEffect(() => {
    if (currentUser?.email) {
      getCurrentUserID(currentUser.email);
      getBookmarkStories(currentUser.email);
    }
  }, [currentUser]);

  const getCurrentUserID = async (email: string) => {
    try {
      const user = await getSaveUserByEmail(email);
      const userID = user.data.data[0].documentId;
      setCurrentUserDocumentID(userID);
    } catch (error) {
      console.log(`Error in getting user id: ${error}`);
    }
  };

  const getBookmarkStories = async (email: string) => {
    try {
      const response = await getBookmarkByUserEmail(email);
      if (response.data.data.length > 0) {
        const id: number = response.data.data[0]?.story.id;
        if (!bookmarkStoriesID.includes(id)) {
          setBookmarkStroiesId((prev) => [...prev, id]);
        }
      }
    } catch (error) {
      console.log(`Error in getting saved stories: ${error}`);
    }
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {loading ? (
        <View className="flex-1 justify-center items-center w-full h-full bg-primary">
          <Text className="text-white font-psemibold">Loading...</Text>
        </View>
      ) : (
        children
      )}
    </CurrentUserContext.Provider>
  );
};
