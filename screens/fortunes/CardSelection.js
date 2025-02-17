import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cardImages, defaultCardsImages } from '../../media/imageList';
import Loading from '../common/Loading';
import TopProfileBar from '../common/TopProfileBar';
import { sendFortune } from '../../services/backendServices';
import { updateUserCoin } from '../../services/coinServices';
import { useAlert } from '../../hooks/useAlert';
import ScreenWrapper from '../../components/ScreenWrapper';
import { setCoinAmount } from '../../database/redux/slices/coinSlice';


const CardSelection = ({ navigation, route }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { selectCardAmount = 3, category_title, category_description } = route.params;
  const [cards, setCards] = useState([]);
  const [defaultCards, setDefaultCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numColumns, setNumColumns] = useState(3);
  const [isSending, setIsSending] = useState(false);
  const coinAmount = useSelector((state) => state.coin.coinAmount);
  const userUid = useSelector((state) => state.userAuth.uid);

  useEffect(() => {
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

      const request_status = await sendFortune({
        selectedCards: selectedCards,
        category_title: category_title,
        category_description: category_description,
      }, userUid);

      if (request_status) {
        const result = await updateUserCoin(userUid, -3);
        dispatch(setCoinAmount(result.coinAmount));
        alert("Falınız başarıyla gönderildi.");
        navigation.navigate('MainTabs', { screen: 'Home' });
      } else {
        alert("Fal gönderilirken bir hata oluştu");
      }

    } catch (error) {
      console.log(error);
      alert('Fal gönderilirken bir hata oluştu');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ScreenWrapper navigation={navigation} pageName="CardSelection">
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
    </ScreenWrapper>
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