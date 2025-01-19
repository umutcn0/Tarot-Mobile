import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BottomNavigation from '../../components/BottomNavigation';
import TopProfileBar from '../common/TopProfileBar';
import { getFortuneHistory } from '../../services/fortuneServices';
import { useSelector } from 'react-redux';
import HistoryItem from '../../components/HistoryItem';
import Loading from '../common/Loading';
import { useAlert } from '../../hooks/useAlert';
import ScreenWrapper from '../../components/ScreenWrapper';

const History = ({ navigation }) => {
  const [historyItems, setHistoryItems] = useState([]);
  const user = useSelector((state) => state.userAuth.user);
  const [isLoading, setIsLoading] = useState(true);
  const alert = useAlert();
  const [refreshing, setRefreshing] = useState(false);

  const fetchHistory = async () => {
    try {
      const history = await getFortuneHistory(user.uid);
      setHistoryItems(history);
      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      alert('Hata', 'Fal geçmişi alırken bir hata oluştu');
      console.error('Error fetching fortune history:', error);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchHistory();
  }, []);

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScreenWrapper navigation={navigation} pageName="History">
      {isLoading && <Loading/>}
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />
        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#ffffff"
            />
          }
        >
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
    </ScreenWrapper>
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