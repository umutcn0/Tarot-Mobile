import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import BottomNavigation from '../../components/BottomNavigation';
import TopProfileBar from '../common/TopProfileBar';

const History = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />

        {/* Fortune History Section */}
        <ScrollView style={styles.scrollView}>
          {/* Example Fortune Entries */}
          <View style={styles.historyEntry}>
            <Text style={styles.entryTitle}>General Life</Text>
            <Text style={styles.entryDescription}>Your life is on a positive trajectory.</Text>
            <Text style={styles.entryDescription}>Status: 30 min remain</Text>
          </View>
          <View style={styles.historyEntry}>
            <Text style={styles.entryTitle}>Love and Relationships</Text>
            <Text style={styles.entryDescription}>A new connection is on the horizon.</Text>
            <Text style={styles.entryDescription}>Status: 30 min remain</Text>
          </View>
          {/* Add more entries as needed */}
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="FortuneHistory"/>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  historyEntry: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 0,
    margin:20,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  entryDescription: {
    fontSize: 14,
    color: 'rgba(244, 114, 182, 0.7)',
  },
})

export default History