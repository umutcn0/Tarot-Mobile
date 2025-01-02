import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavigation from '../../components/BottomNavigation';


const FaithFortune = ({navigation}) => {
  const [intent, setIntent] = useState('');

  const handleContinue = () => {
    if (intent.length > 10) {
      navigation.navigate('CardSelection', { userIntent: intent });
    } else {
      Alert.alert('Lütfen en az 10 karakter giriniz');
    }
  };

  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Lütfen niyetinizi giriniz</Text>
        <TextInput
          style={styles.input}
          placeholder="Niyetinizi giriniz..."
          value={intent}
          onChangeText={setIntent}
        />
        <TouchableOpacity
          style={[intent.length > 10 ? styles.enabledButton : styles.disabledButton, styles.button]}
          onPress={handleContinue}
          disabled={!intent}
        >
          <Text style={styles.buttonText}>Devam Et</Text>
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
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#B64B83',
  },
  disabledButton: {
    backgroundColor: 'gray',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FaithFortune
