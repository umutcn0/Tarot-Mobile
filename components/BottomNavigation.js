import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';

const BottomNavigation = ({ navigation, pageName }) => {
  const handleNavigation = (screenName) => {
    if (pageName !== screenName) {
      navigation.reset({
        index: 0,
        routes: [{ name: screenName }],
      });
    }
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("Home")}
      >
        <Ionicons
          name="home"
          size={24}
          color={pageName === "Home" ? "#fff" : "#5e646e"}
        />
        <Text
          style={[
            styles.navText,
            { color: pageName === "Home" ? "#fff" : "#5e646e" },
          ]}
        >
          Anasayfa
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("History")}
      >
        <Ionicons
          name="eye-outline"
          size={24}
          color={pageName === "History" ? "#fff" : "#5e646e"}
        />
        <Text
          style={[
            styles.navText,
            { color: pageName === "History" ? "#fff" : "#5e646e" },
          ]}
        >
          Fal Geçmişi
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("Purchase")}
      >
        <Ionicons
          name="diamond-outline"
          size={24}
          color={pageName === "Purchase" ? "#fff" : "#5e646e"}
        />
        <Text
          style={[
            styles.navText,
            { color: pageName === "Purchase" ? "#fff" : "#5e646e" },
          ]}
        >
          Purchase 
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => handleNavigation("Profile")}
      >
        <Ionicons
          name="person"
          size={24}
          color={pageName === "Profile" ? "#fff" : "#5e646e"}
        />
        <Text
          style={[
            styles.navText,
            { color: pageName === "Profile" ? "#fff" : "#5e646e" },
          ]}
        >
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#1e1b4b",
    paddingVertical: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navText: {
    color: "#fff", // slate-400
    fontSize: 12,
    marginTop: 4,
  },
});
