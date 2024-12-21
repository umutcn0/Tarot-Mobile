import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavigation from '../../components/BottomNavigation';


const FaithFortune = ({navigation}) => {
  const [intent, setIntent] = useState('');

  const handleContinue = () => {
    // Navigate to CardSelection with the intent as a parameter
    navigation.navigate('CardSelection', { userIntent: intent });
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What is your intent?</Text>
        <TextInput
          style={styles.input}
          placeholder="Type your intent here..."
          value={intent}
          onChangeText={setIntent}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          disabled={!intent}
        >
          <Text style={styles.buttonText}>Continue to Card Selection</Text>
        </TouchableOpacity>
      </View>
      <BottomNavigation navigation={navigation} pageName="IntentInput" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#fff',
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
});

export default FaithFortune
