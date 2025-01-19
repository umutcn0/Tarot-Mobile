import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import FortuneCard from '../../components/FortuneCard';
import BottomNavigation from '../../components/BottomNavigation';
import TopProfileBar from '../common/TopProfileBar';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { LinearGradient } from 'expo-linear-gradient'


const Home = ({ navigation }) => {
  const emailVerified = useSelector((state) => state.userAuth.emailVerified);

  useEffect(() => {
    if (!emailVerified) {
      navigation.replace('VerifyEmail');
    }
  }, [emailVerified]);

  return (
    <ScreenWrapper navigation={navigation} pageName="Home">
      <TopProfileBar navigation={navigation} />
      <Text style={styles.welcomeText}>Gelecekte seni neler bekliyor ?</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.fortuneGrid}>
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Genel Hayat"
            category_description="Yaşamındaki genel yönleri değerlendirir."
            icon="cube-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Aşk ve İlişkiler"
            category_description="İlişkilerdeki dinamikler hakkında rehberlik sağlamak."
            icon="heart-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Kariyer ve İş"
            category_description="İş hayatı ve kariyer yolculuğu"
            icon="briefcase-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Maddi Durum ve Finansal"
            category_description="Finansal durumunuz hakkında bilgi verir."
            icon="cash-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Sağlık ve Zindelik"
            category_description="Sağlık ve zindelik durumunuz hakkında bilgi verir."
            icon="moon-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Kişisel Gelişim ve Ruhsal"
            category_description="Kişisel gelişim ve ruhsal durumunuz hakkında bilgi verir."
            icon="barbell-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            category_title="Zaman Çerçevesi"
            category_description="Zaman çerçevenizi belirler."
            icon="time-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="FaithFortune"
            category_title="Niyet Falı"
            category_description="Niyetlerinizin gerçekleşme olasılığını gösterir."
            icon="gift-outline"
            coinAmount={5}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(244, 114, 182, 0.7)',
    textAlign: 'center',
    marginBottom: 24,
  },
  scrollView: {
    flex: 1,
  },
  fortuneGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  }
})

export default Home