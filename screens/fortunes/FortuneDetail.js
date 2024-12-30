import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import TopProfileBar from '../common/TopProfileBar'
import BottomNavigation from '../../components/BottomNavigation'
import { getFortune } from '../../services/fortuneServices'
import Loading from '../common/Loading'
import { useSelector } from 'react-redux'


const CardReview = ({ card }) => {
  console.log("card", card);
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../../media/cards/The_Fool.jpg')} // This should be dynamic based on card name
      style={styles.cardImage}
      resizeMode="contain"
    />
    <Text style={styles.cardName}>{card.card_name}</Text>
    <View style={styles.meaningContainer}>
      <Text style={styles.sectionTitle}>Anlamı</Text>
      <Text style={styles.meaningText}>{card.card_meaning}</Text>
    </View>
    <View style={styles.messageContainer}>
      <Text style={styles.sectionTitle}>Genel Mesaj</Text>
      <Text style={styles.messageText}>{card.card_message}</Text>
    </View>
    </View>
  );
};

const FortuneDetail = ({ navigation, route }) => {
  const { fortuneId } = route.params;
  const [fortune, setFortune] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.userAuth.user);


  useEffect(() => {
    const fetchFortune = async () => {
      console.log("fetching fortune");
      const fortune = await getFortune(user.uid, fortuneId);
      setFortune(fortune);
      setLoading(false);
    };
    fetchFortune();
  }, []);

  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />
        {loading ? <Loading /> : 
        <ScrollView style={styles.scrollView}>
          {fortune.card_reviews.map((card, index) => (
            <CardReview key={index} card={card} />
          ))}
          
          <View style={styles.generalCommentContainer}>
            <Text style={styles.sectionTitle}>Genel Yorum</Text>
            <Text style={styles.generalCommentText}>
              {fortune["general_message"]}
            </Text>
          </View>
        </ScrollView>
        }
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="FortuneDetail"/>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardImage: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 12,
  },
  cardName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  meaningContainer: {
    marginBottom: 16,
  },
  messageContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(244, 114, 182, 0.7)',
    marginBottom: 8,
  },
  meaningText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  generalCommentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  generalCommentText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  }
})

export default FortuneDetail 