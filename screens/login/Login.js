import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "../common/Loading"
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync, getUserToken, resetError } from '../../database/redux/slices/userAuthSlice';
import LoginTextInput from '../../components/LoginTextInput';
import LoginButton from '../../components/LoginButton';
import useAlert from '../../hooks/useAlert';
import ScreenWrapper from '../../components/ScreenWrapper';

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME;

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error } = useSelector((state) => state.userAuth);
  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserToken());
  }, []);

  useEffect(() => {
    if (error) {
      alert('Hata', error);
      dispatch(resetError());
    }
  }, [error]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert('Hata', 'Lütfen tüm alanları doldurun');
        return;
      }
      
      dispatch(resetError());
      await dispatch(signInAsync({ email, password })).unwrap();
    } catch (error) {
      console.error('Login error:', error);
      alert('Hata', 'Giriş yapılamadı. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScreenWrapper navigation={navigation} pageName="Login">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                {isLoading && <Loading/>}
                {/* Main content */}
                <View style={styles.formContainer}>
                    <View style={styles.formContent}>
                        <Text style={styles.title}>{APP_NAME}</Text>
                        <Text style={styles.subtitle}>Ruhsal yolculuğa başla</Text>

                        {/* Email input */}
                        <LoginTextInput inputText="Email" onChangeText={setEmail} keyboardType="email-address" value={email} placeholder="your.spirit@realm.com" inputIcon="mail" />
                        {/* Password input */}
                        <LoginTextInput inputText="Şifre" onChangeText={setPassword} keyboardType="default" value={password} placeholder="••••••••" inputIcon="key" secureTextEntry={true} />

                        {/* Login button */}
                        <LoginButton onPress={handleLogin} disabled={isLoading} buttonText="Giriş" />

                        {/* Additional links */}
                        <View style={styles.linksContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.link}>Şifreni mi unuttun?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={styles.link}>Kayıt ol</Text>
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
    justifyContent: 'space-between',
    marginTop: 24,
  },
  link: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LoginScreen;