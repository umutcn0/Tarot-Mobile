import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import FortuneCard from '../../components/FortuneCard';
import TopProfileBar from '../common/TopProfileBar';
import { useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { homeFortuneTypes } from '../../constants/ComponentConfigs';

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
          {homeFortuneTypes.map((card, index) => (
            <FortuneCard
              key={index}
              navigation={navigation}
              navigationPage="CardSelection"
              category_title={card.title}
              category_description={card.description}
              icon={card.icon}
              coinAmount={card.coinAmount || 3}
            />
          ))}
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