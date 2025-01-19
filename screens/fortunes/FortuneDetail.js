import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import TopProfileBar from '../common/TopProfileBar'
import BottomNavigation from '../../components/BottomNavigation'
import { getFortune } from '../../services/fortuneServices'
import Loading from '../common/Loading'
import { useSelector } from 'react-redux'
import { cardImages } from '../../media/imageList'
import ScreenWrapper from '../../components/ScreenWrapper';

const CardReview = ({ card }) => {
  const cardImageName = card.image_name.includes('.') ? card.image_name.split('.')[0].toLowerCase() : card.image_name.toLowerCase()
  const cardImage = cardImages.find(image => image.name.includes(cardImageName)).image;
  const cardName = card.name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  return (
    <View style={styles.cardContainer}>
      <Image
        source={cardImage}
        style={styles.cardImage}
        resizeMode="contain"
      />
      <Text style={styles.cardName}>{cardName}</Text>
      <View style={styles.meaningContainer}>
        <Text style={styles.sectionTitle}>Anlamı</Text>
        <Text style={styles.meaningText}>{card.meaning}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.sectionTitle}>Genel Mesaj</Text>
        <Text style={styles.messageText}>{card.message}</Text>
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
      var fortune = await getFortune(user.uid, fortuneId);
      setFortune(fortune.result);
      setLoading(false);
    };
    fetchFortune();
  }, []);

  return (
    <ScreenWrapper navigation={navigation} pageName="FortuneDetail">
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
              {fortune.general_message}
            </Text>
          </View>
        </ScrollView>
        }
      </SafeAreaView>
    </ScreenWrapper>
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