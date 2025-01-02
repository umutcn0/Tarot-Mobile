import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BottomNavigation from '../../components/BottomNavigation'
import { createSupportTicket } from '../../services/supportServices'
import { useSelector } from 'react-redux'
import Loading from '../common/Loading'
import { Ionicons } from "@expo/vector-icons";

const Support = ({navigation}) => {
  const [problemDescription, setProblemDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.userAuth.user);

  const handleSubmit = async () => {
    if (!problemDescription.trim()) {
      Alert.alert('Hata', 'Lütfen probleminizi belirtin.');
      return;
    }

    setIsLoading(true);
    try {
      await createSupportTicket(user.uid, user.email, problemDescription.trim());
      Alert.alert('Başarılı', 'Destek talebiniz başarıyla gönderildi.');
      setProblemDescription('');
    } catch (error) {
      if (error.message.includes('Daily ticket limit')) {
        Alert.alert('Hata', 'Günlük destek talebi limitine ulaştınız (2 talep/gün).');
      } else {
        Alert.alert('Hata', 'Destek talebi gönderilirken bir hata oluştu.');
      }
      console.error('Support ticket error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {isLoading && <Loading />}
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Destek</Text>

          <Text style={styles.label}>Lütfen probleminizi belirtin:</Text>
          <TextInput
            style={styles.input}
            multiline
            numberOfLines={4}
            value={problemDescription}
            onChangeText={setProblemDescription}
            placeholder="Problemini buraya yaz..."
            placeholderTextColor="#ccc"
          />

          <TouchableOpacity 
            style={[styles.button, !problemDescription.trim() && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={!problemDescription.trim() || isLoading}
          >
            <Text style={styles.buttonText}>Gönder</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="Profile"/>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
    textAlignVertical: 'top',
    padding: 10,
  },
  button: {
    backgroundColor: '#B64B83',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: -5,
    left: 0,
    zIndex: 1,
    padding: 8,
  },
});

export default Support