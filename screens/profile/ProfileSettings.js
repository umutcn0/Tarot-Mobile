import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { signOutAsync } from "../../database/redux/slices/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/Loading";
import BottomNavigation from "../../components/BottomNavigation";

const ProfileSettings = ({ navigation }) => {
  const user = useSelector((state) => state.userAuth.user);
  const isLoading = useSelector((state) => state.userAuth.isLoading);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOutAsync());
  };

  return (
    <LinearGradient
      colors={["#1e1b4b", "#4a044e", "#3b0764"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {isLoading && <Loading />}
          {/* Profile Header */}
          <View style={styles.header}>
            <Text style={styles.name}>
              {user.displayName ? user.displayName : "Unknown"}
            </Text>
            <Text style={styles.email}>
              {user.email ? user.email : "Unknown"}
            </Text>
          </View>

          {/* Profile Sections */}
          <View style={styles.formContent}>
            {/* Name Section */}
            <View style={styles.option}>
              <Text style={styles.optionText}>Name: {user.displayName}</Text>
            </View>

            {/* Update Password Section */}
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate("UpdatePassword")}
            >
              <Text style={styles.optionText}>Update Password</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="rgba(255, 255, 255, 0.5)"
              />
            </TouchableOpacity>

            {/* Referral Code Section */}
            <View style={styles.option}>
              <Text style={styles.optionText}>Referral Code: ABC123</Text>
            </View>

            {/* Token Balance Section */}
            <View style={styles.option}>
              <Text style={styles.optionText}>Token Balance: 100 Tokens</Text>
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Çıkış</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName={"Profile"} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    padding: 20,
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "rgba(244, 114, 182, 0.7)",
  },
  formContent: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "rgba(244, 114, 182, 0.2)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(244, 114, 182, 0.4)",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileSettings;
