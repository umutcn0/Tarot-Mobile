import { StyleSheet, View, Platform, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavigation from './BottomNavigation';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const ScreenWrapper = ({ children, navigation, pageName }) => {
  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {children}
        </View>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName={pageName}/>
      <StatusBar style="light" />
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    flex: 1,
  }
})

export default ScreenWrapper 