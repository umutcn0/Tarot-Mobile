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
import { sendPasswordResetEmail, getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import useAlert from '../../hooks/useAlert';
import ScreenWrapper from '../../components/ScreenWrapper';
const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME;

const auth = getAuth();

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const alert = useAlert();

  const handleResetPassword = async () => {
    if (!email) {
      alert('Hata', 'Lütfen email adresinizi girin.');
      return;
    }

    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Başarılı', 'Şifre sıfırlama emaili gönderildi. Lütfen emailinizi kontrol edin.');
        navigation.navigate('Login');
      })
      .catch((error) => {
        alert('Hata', 'Lütfen email adresinizi kontrol edip tekrar deneyin.');
        console.error('Şifre sıfırlama hatası:', error);
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScreenWrapper navigation={navigation} pageName="ForgotPassword">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          {isLoading && <Loading/>}
          <View style={styles.formContainer}>
            <View style={styles.formContent}>
              <Text style={styles.title}>{APP_NAME}</Text>
              <Text style={styles.subtitle}>Şifreni sıfırla</Text>

              <LoginTextInput 
                inputText="Email" 
                onChangeText={setEmail} 
                keyboardType="email-address" 
                value={email} 
                placeholder="your.spirit@realm.com" 
                inputIcon="mail" 
              />

              <LoginButton 
                onPress={handleResetPassword} 
                disabled={isLoading} 
                buttonText="Şifreni sıfırla" 
              />

              <View style={styles.linksContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.link}>Giriş</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScreenWrapper>
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