import { KeyboardAvoidingView, StyleSheet, Text, View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
 } from 'react-native'
import React from 'react'
import { signUpAsync } from '../../database/redux/slices/userAuthSlice';
import { userAddAsync } from '../../database/redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginTextInput from '../../components/LoginTextInput';
import LoginButton from '../../components/LoginButton';
import Loading from '../common/Loading';
import { LinearGradient } from 'expo-linear-gradient';
import CryptoJS from 'crypto-js';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isLoading, error } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const signUpResponse = await dispatch(signUpAsync({ name, email, password })).unwrap();
      signUpResponse.password = CryptoJS.SHA256(password).toString();
      await dispatch(userAddAsync(signUpResponse));
    } catch (error) {
      console.log(error);
    }
}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
        colors={['#1e1b4b', '#4a044e', '#3b0764']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                {isLoading && <Loading/>}
                {/* Main content */}
                <View style={styles.formContainer}>
                    <View style={styles.formContent}>
                        <Text style={styles.title}>Crystal Vision</Text>
                        <Text style={styles.subtitle}>Create your account</Text>

                        {/* Name input */}
                        <LoginTextInput inputText="Your Name" onChangeText={setName} keyboardType="default" value={name} placeholder="John Doe" inputIcon="person" />
                        {/* Email input */}
                        <LoginTextInput inputText="Ethereal Email" onChangeText={setEmail} keyboardType="email-address" value={email} placeholder="your.spirit@realm.com" inputIcon="mail" />
                        {/* Password input */}
                        <LoginTextInput inputText="Mystic Password" onChangeText={setPassword} keyboardType="default" value={password} placeholder="••••••••" inputIcon="key" secureTextEntry={true} />
                        {/* Confirm Password input */}
                        <LoginTextInput inputText="Confirm Password" onChangeText={setConfirmPassword} keyboardType="default" value={confirmPassword} placeholder="••••••••" inputIcon="key" secureTextEntry={true} />
                        {/* Login button */}
                        <LoginButton onPress={handleSignUp} disabled={isLoading} buttonText="Create Account" />

                        {/* Additional links */}
                        <View style={styles.linksContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.link}>Already have an account?</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  formContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 32,
    paddingTop: 64,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(244, 114, 182, 0.7)',
    textAlign: 'center',
    marginBottom: 32,
  },
  linksContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
  link: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SignUp