import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import BottomNavigation from '../../components/BottomNavigation';
import { cardImages, defaultCardsImages } from '../../media/imageList';
import Loading from '../common/Loading';
import TopProfileBar from '../common/TopProfileBar';
import { useDispatch, useSelector } from 'react-redux';
import { sendFortune } from '../../services/backendServices';
import { getUserToken, updateUserToken } from '../../services/tokenServices';

const CardSelection = ({ navigation, route }) => {
  const { selectCardAmount = 3, category_title, category_description } = route.params;
  const [cards, setCards] = useState([]);
  const [defaultCards, setDefaultCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numColumns, setNumColumns] = useState(3);
  const [isSending, setIsSending] = useState(false);
  const [coinAmount, setCoinAmount] = useState(0);
  const user = useSelector((state) => state.userAuth.user);

  useEffect(() => {

    const check_coin_amount = async () => {
      const coin_amount = await getUserToken(user.uid);
      if (coin_amount < 3) {
        alert("Yeterli jetonunuz bulunmamaktadır.");
        navigation.navigate('Home');
      }

      setCoinAmount(coin_amount);
    }
    check_coin_amount();

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const getImagesFromDirectory = () => {
      const shuffledCardImages = shuffleArray([...cardImages]);
      setCards(shuffledCardImages);
      setDefaultCards(defaultCardsImages);
      setIsLoading(false);
    };

    getImagesFromDirectory();
  }, []);

  const handleCardSelect = (card) => {
    if (selectedCards.length === 3) {
      console.log("Daha fazla kart seçemezsiniz.")
    } else {
      setSelectedCards([...selectedCards, card.name]);
    }
  }

  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleCardSelect(item)}>
      <Image
        source={selectedCards.includes(item.name) ? item.image : defaultCards[0].image}
        style={styles.cardImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );

  const sendFortuneToService = async () => {
    try {
      if (selectedCards.length < 3) {
        alert("Lütfen 3 kart seçiniz.");
        return;
      }
      setIsSending(true);
      
      if (coinAmount < 3) {
        alert("Yeterli jetonunuz bulunmamaktadır.");
        return;
      }

      const result = await sendFortune({
        selectedCards: selectedCards,
        category_title: category_title,
        category_description: category_description,
      }, user.uid);
  
      if (result) {
        await updateUserToken(user.uid, -3);
        alert("Falınız başarıyla gönderildi.");
        navigation.navigate('Home');
      }
  
    } catch (error) {
      console.error('Fortune sending error:', error);
      alert('Fal gönderilirken bir hata oluştu');
    } finally {
      setIsSending(false);
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
        { isLoading && <Loading/> }
        <TopProfileBar navigation={navigation} />

        <Text style={styles.selectCardText}>{selectCardAmount} Adet Kart Seç</Text>

        {/* Card Selection Section */}
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item.name}
          numColumns={numColumns}
          contentContainerStyle={styles.cardContainer}
          key={numColumns}
        />

        {/* Submit Button */}
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={sendFortuneToService}
          disabled={isSending}
        >
          <Text style={styles.submitText}>
            {isSending ? 'Gönderiliyor...' : 'Kartları Gönder'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="CardSelection"/>
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
  selectCardText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 200,
    marginBottom: 20,
    marginRight: 10,
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: '#B64B83',
    padding: 16,
    width: '60%',
    borderRadius: 16,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default CardSelection;