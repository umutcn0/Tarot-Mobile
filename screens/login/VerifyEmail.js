import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../database/firebase/firebaseConfig';
import { sendEmailVerification } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { signOutAsync, updateUser } from '../../database/redux/slices/userAuthSlice';
import ScreenWrapper from '../../components/ScreenWrapper';

const VerifyEmail = ({navigation}) => {
  const [emailState, setEmailState] = useState({
    loading: false,
    timer: 60,
    canResend: true
  });
  
  const user = useSelector((state) => state.userAuth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    const checkVerificationStatus = async () => {
      try {
        const currentUser = auth.currentUser;
        await currentUser?.reload();
        if (currentUser?.emailVerified) {
          dispatch(updateUser({ emailVerified: true }));
          navigation.navigate('MainTabs', { screen: 'Home' });
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    };

    const interval = setInterval(checkVerificationStatus, 3000);
    return () => clearInterval(interval);
  }, [user, dispatch, navigation]);

  useEffect(() => {
    if (emailState.timer > 0 && !emailState.canResend) {
      const intervalId = setInterval(() => {
        setEmailState(prev => ({
          ...prev,
          timer: prev.timer - 1,
          canResend: prev.timer <= 1
        }));
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [emailState.timer, emailState.canResend]);

  const handleSendEmail = async () => {
    try {
      setEmailState(prev => ({ ...prev, loading: true }));
      const currentUser = auth.currentUser;
      await sendEmailVerification(currentUser);
      setEmailState(prev => ({
        ...prev,
        timer: 59,
        canResend: false
      }));
    } catch (error) {
      console.error('Error sending verification email:', error);
    } finally {
      setEmailState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(signOutAsync());
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ScreenWrapper navigation={navigation} pageName="VerifyEmail">
      <SafeAreaView style={styles.container}>
        <View style={styles.formContent}>
          <Ionicons name="mail-outline" size={64} color="#fff" style={styles.icon} />
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.description}>
            We've sent a verification email to:
          </Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.instruction}>
            Please check your email and click the verification link to continue.
          </Text>

          <TouchableOpacity
            style={[styles.button, !emailState.canResend && styles.buttonDisabled]}
            onPress={handleSendEmail}
            disabled={emailState.loading}
          >
            {emailState.loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {emailState.canResend
                  ? 'Send Verification Email'
                  : `Resend available in ${emailState.timer}s`}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 20,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
  },
});

export default VerifyEmail;
