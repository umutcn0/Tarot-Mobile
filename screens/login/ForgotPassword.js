import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import LoginTextInput from '../../components/LoginTextInput';
import LoginButton from '../../components/LoginButton';
import Loading from '../common/Loading';
import { useSelector } from 'react-redux';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const { isLoading } = useSelector((state) => state.user);

  const handleResetPassword = () => {
    // TODO: Implement password reset logic
    console.log('Reset password for:', email);
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
          <View style={styles.formContainer}>
            <View style={styles.formContent}>
              <Text style={styles.title}>Crystal Vision</Text>
              <Text style={styles.subtitle}>Restore Your Connection</Text>

              <LoginTextInput 
                inputText="Ethereal Email" 
                onChangeText={setEmail} 
                keyboardType="email-address" 
                value={email} 
                placeholder="your.spirit@realm.com" 
                inputIcon="mail" 
              />

              <LoginButton 
                onPress={handleResetPassword} 
                disabled={isLoading} 
                buttonText="Recover Access" 
              />

              <View style={styles.linksContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.link}>Return to Portal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

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
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    color: '#fff',
    fontSize: 14,
  },
})

export default ForgotPassword