import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const LoginTextInput = ({inputText, onChangeText, keyboardType, value, placeholder, inputIcon, autoCapitalize="none", secureTextEntry=false}) => {
  return (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{inputText}</Text>
        <View style={styles.inputWrapper}>
            <Feather
            name={inputIcon}
            size={20}
            color="rgba(244, 114, 182, 0.5)"
            style={styles.inputIcon}
            />
            <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="rgba(244, 114, 182, 0.3)"
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 24,
      },
      label: {
        color: '#fbc6e3',
        marginBottom: 8,
        fontSize: 14,
      },
      inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(244, 114, 182, 0.2)',
        borderRadius: 12,
        paddingHorizontal: 12,
      },
      inputIcon: {
        marginRight: 12,
      },
      input: {
        flex: 1,
        color: '#f9a8d4',
        padding: 12,
      },
})


export default LoginTextInput