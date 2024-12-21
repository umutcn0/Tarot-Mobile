import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const LoadingOverlay = () => {
  return (
    <LinearGradient
    colors={['#1e1b4b', '#4a044e', '#3b0764']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    >
        <ActivityIndicator size="large" color="#fff" />
    </LinearGradient>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#1e1b4b",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
});
