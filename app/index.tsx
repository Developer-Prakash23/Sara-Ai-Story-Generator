import { useAuthContext } from "@/Context/AuthContext";
import { Href, Link, Redirect } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {

  const {currentUser} = useAuthContext()  
  
  if(!currentUser || !currentUser.emailVerified) return <Redirect href={'/auth/sign-in' as Href} />
  if(currentUser.emailVerified) return <Redirect href={'/home' as Href} />

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      
      <Link href={'/home' as Href}>Home</Link>
      
    </View>
  );
}
