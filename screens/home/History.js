import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BottomNavigation from '../../components/BottomNavigation';
import TopProfileBar from '../common/TopProfileBar';
import { getFortuneHistory } from '../../services/fortuneServices';
import { useSelector } from 'react-redux';
import HistoryItem from '../../components/HistoryItem';
import Loading from '../common/Loading';

const History = ({ navigation }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const user = useSelector((state) => state.userAuth.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getFortuneHistory(user.uid);
        setHistoryItems(history);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching fortune history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {isLoading && <Loading/>}
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />
        <ScrollView style={styles.scrollView}>
          {historyItems.map((item, index) => (
            <HistoryItem
              key={index}
              historyItem={item}
              isCompleted={item.status === 'completed'}
              onPress={() => navigation.navigate('FortuneDetail', { fortuneId: item.id })}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="History"/>
    </LinearGradient>
  );
};

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
  }
})

export default History