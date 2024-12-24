import { StyleSheet, View, ActivityIndicator, Dimensions } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get('window');

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.8)']}
        style={styles.container}
      >
        <ActivityIndicator size="large" color="#fff" />
      </LinearGradient>
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: width,
    height: height,
    zIndex: 999,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
