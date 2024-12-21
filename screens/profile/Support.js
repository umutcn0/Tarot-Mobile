import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import TopProfileBar from '../common/TopProfileBar'
import BottomNavigation from '../../components/BottomNavigation'

const Support = ({navigation}) => {
  const [problemDescription, setProblemDescription] = useState('');

  const handleSubmit = () => {
    // Here you would typically send the problemDescription to your backend or email service
    console.log("Ticket submitted:", problemDescription);
    // Reset the input field after submission
    setProblemDescription('');
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />

        <ScrollView style={styles.scrollView}>
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

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Gönder</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="Support"/>
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
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#B64B83',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollView: {
    padding: 20,
  },
});

export default Support