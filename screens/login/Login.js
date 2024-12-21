import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Loading from "../common/Loading"
import { useSelector, useDispatch } from 'react-redux';
import { signInAsync, getUserToken } from '../../database/redux/slices/userAuthSlice';
import LoginTextInput from '../../components/LoginTextInput';
import LoginButton from '../../components/LoginButton';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoading, error } = useSelector((state) => state.userAuth);

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(signInAsync({ email, password }));
    }

    useEffect(() => {
        dispatch(getUserToken());
      }, []);

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
                        <Text style={styles.subtitle}>Unlock Your Spiritual Journey</Text>

                        {/* Email input */}
                        <LoginTextInput inputText="Ethereal Email" onChangeText={setEmail} keyboardType="email-address" value={email} placeholder="your.spirit@realm.com" inputIcon="mail" />
                        {/* Password input */}
                        <LoginTextInput inputText="Mystic Password" onChangeText={setPassword} keyboardType="default" value={password} placeholder="••••••••" inputIcon="key" secureTextEntry={true} />

                        {/* Login button */}
                        <LoginButton onPress={handleLogin} disabled={isLoading} buttonText="Enter the Crystal Realm" />

                        {/* Additional links */}
                        <View style={styles.linksContainer}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.link}>Lost Your Way?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            <Text style={styles.link}>Begin Your Journey</Text>
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
    justifyContent: 'space-between',
    marginTop: 24,
  },
  link: {
    color: '#fff',
    fontSize: 14,
  },
});

export default LoginScreen;