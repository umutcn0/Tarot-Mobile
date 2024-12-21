import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const LoginButton = ({onPress, disabled, buttonText}) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    style={styles.buttonContainer}
    >
      <LinearGradient
          colors={['#ec4899', '#9333ea']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
      >
          {disabled ? (
          <ActivityIndicator color="white" />
          ) : (
          <Text style={styles.buttonText}>{buttonText}</Text>
          )}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default LoginButton

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})