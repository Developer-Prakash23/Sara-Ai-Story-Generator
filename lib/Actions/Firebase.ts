import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  User,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth, storage } from "../FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createAccount = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const forgetPassword = async (email:string) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const sendEmailVerificationEmail = async (user:User) => {
try {
  await sendEmailVerification(user)
} catch (error:any) {
  throw new Error(error.message);
}
}

export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const saveImageInDB = async (
  url: string,
  fileName = String(Date.now())
) => {
  try {
    const file = await fetch(url, {
      mode: "no-cors",
    }).then((res) => res.blob());

    const newFile = new Blob([file], { type: "image/png" });

    const storageRef = ref(storage, `images/${fileName}.png`);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, newFile);

    const download_url = await getDownloadURL(storageRef);

    return download_url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateUserProfile = async (
  currentUser: User,
  updatedUser: User
) => {
  try {
    await updateProfile(currentUser, updatedUser);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
