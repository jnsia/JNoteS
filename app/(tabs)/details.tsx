import useAuthStore from "@/stores/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function DetailsScreen() {
  const logout = useAuthStore((state: any) => state.logout);

  const remove = async () => {
    await logout()
  };

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <TouchableOpacity style={styles.submit} onPress={remove}>
        <Text>인증</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
  },
});
