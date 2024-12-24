import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import FortuneCard from '../../components/FortuneCard';
import BottomNavigation from '../../components/BottomNavigation';
import TopProfileBar from '../common/TopProfileBar';


const Home = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#1e1b4b', '#4a044e', '#3b0764']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
      <TopProfileBar navigation={navigation} />

      {/* Welcome Section */}
      <Text style={styles.welcomeText}>Gelecekte seni neler bekliyor ?</Text>

      {/* Fortune Options */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.fortuneGrid}>
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Genel Hayat"
            description="Yaşamındaki genel yönleri değerlendirir."
            icon="cube-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Aşk ve İlişkiler"
            description="İlişkilerdeki dinamikler hakkında rehberlik sağlamak."
            icon="heart-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Kariyer ve İş"
            description="İş hayatı ve kariyer yolculuğu"
            icon="briefcase-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Maddi Durum ve Finansal"
            description="Finansal durumunuz hakkında bilgi verir."
            icon="cash-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Sağlık ve Zindelik"
            description="Sağlık ve zindelik durumunuz hakkında bilgi verir."
            icon="moon-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Kişisel Gelişim ve Ruhsal"
            description="Kişisel gelişim ve ruhsal durumunuz hakkında bilgi verir."
            icon="barbell-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="CardSelection"
            title="Zaman Çerçevesi"
            description="Zaman çerçevenizi belirler."
            icon="time-outline"
          />
          <FortuneCard
            navigation={navigation}
            navigationPage="FaithFortune"
            title="Niyet Falı"
            description="Niyetlerinizin gerçekleşme olasılığını gösterir."
            icon="gift-outline"
            coinAmount={5}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
    <BottomNavigation navigation={navigation} pageName="Home"/>
    </LinearGradient>
  )
}

export default Home

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