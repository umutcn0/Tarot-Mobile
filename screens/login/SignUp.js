import { KeyboardAvoidingView, StyleSheet, Text, View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert
 } from 'react-native'
import React from 'react'
import { signUpAsync } from '../../database/redux/slices/userAuthSlice';
import { userAddAsync } from '../../database/redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LoginTextInput from '../../components/LoginTextInput';
import LoginButton from '../../components/LoginButton';
import Loading from '../common/Loading';
import CryptoJS from 'crypto-js';
import useAlert from '../../hooks/useAlert';
import ScreenWrapper from '../../components/ScreenWrapper';

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME;

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { isLoading, error } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();
  const alert = useAlert();

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        alert('Hata', 'Şifreler eşleşmiyor.');
        return;
      } else if (password.length < 8) {
        alert('Hata', 'Şifre en az 8 karakter olmalıdır.');
        return;
      } else if (name.length < 3) {
        alert('Hata', 'İsim en az 3 karakter olmalıdır.');
        return;
      } else if (email.length < 3) {
        alert('Hata', 'Email en az 3 karakter olmalıdır.');
        return;
      } else if (!email.includes('@')) {
        alert('Hata', 'Email geçerli bir email adresi olmalıdır.');
        return;
      } else if (password.includes(' ')) {
        alert('Hata', 'Şifre boşluk içeremez.');
        return;
      }

      const signUpResponse = await dispatch(signUpAsync({ name, email, password })).unwrap();
      const hashedPassword = CryptoJS.SHA256(password).toString();

      const userData = {
        ...signUpResponse,
        password: hashedPassword,
        id: signUpResponse.uid
      }

      await dispatch(userAddAsync(userData));
    } catch (error) {
      console.error('Signup error:', error);
      alert('Hata', 'Lütfen email adresinizi kontrol edip tekrar deneyin.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScreenWrapper navigation={navigation} pageName="SignUp">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                {isLoading && <Loading/>}
                {/* Main content */}
                <View style={styles.formContainer}>
                    <View style={styles.formContent}>
                        <Text style={styles.title}>{APP_NAME}</Text>
                        <Text style={styles.subtitle}>Hesap oluştur</Text>

                        {/* Name input */}
                        <LoginTextInput inputText="İsim" onChangeText={setName} keyboardType="default" value={name} placeholder="John Doe" inputIcon="mail" />
                        {/* Email input */}
                        <LoginTextInput inputText="Email" onChangeText={setEmail} keyboardType="email-address" value={email} placeholder="your.spirit@realm.com" inputIcon="mail" />
                        {/* Password input */}
                        <LoginTextInput inputText="Şifre" onChangeText={setPassword} keyboardType="default" value={password} placeholder="••••••••" inputIcon="key" secureTextEntry={true} />
                        {/* Confirm Password input */}
                        <LoginTextInput inputText="Şifreni Doğrula" onChangeText={setConfirmPassword} keyboardType="default" value={confirmPassword} placeholder="••••••••" inputIcon="key" secureTextEntry={true} />
                        {/* Login button */}
                        <LoginButton onPress={handleSignUp} disabled={isLoading} buttonText="Hesap Oluştur" />

                        {/* Additional links */}
                        <View style={styles.linksContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.link}>Zaten hesabın var mı?</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScreenWrapper>
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