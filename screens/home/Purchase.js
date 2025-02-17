import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useState } from "react";
import TopProfileBar from "../common/TopProfileBar";
import {
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import Loading from "../common/Loading";
import { useSelector } from 'react-redux';
import { updateUserCoin } from "../../services/coinServices";
import ScreenWrapper from '../../components/ScreenWrapper';

const CreditPackage = ({ credits, bonus, price, popular }) => {
  return (
    <TouchableOpacity style={[styles.creditPackage, popular && styles.popularPackage]}>
      <View style={styles.creditInfo}>
        <View style={styles.creditAmount}>
          <Image 
            source={require('../../assets/coin.png')}
            style={styles.coinImage}
          />
          <Text style={styles.creditText}>{credits}</Text>
        </View>
        {bonus > 0 && (
          <View style={styles.bonusBadge}>
            <Text style={styles.bonusText}>{bonus}% COIN</Text>
            <Text style={styles.bonusFreeText}>ÜCRETSİZ</Text>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>₺{price}</Text>
      </TouchableOpacity>
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>EN POPÜLER</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Purchase = ({ navigation }) => {
  const [loaded, setLoaded] = useState(true);
  const [activeTab, setActiveTab] = useState('buy');
  const user = useSelector((state) => state.userAuth.user);

  const loadAd = () => {
    setLoaded(false);
    const adUnitId = "ca-app-pub-4666300760854612/5031399665";

    const rewardedAd = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        rewardedAd.show();
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward.amount);
        updateUserCoin(user.uid, reward.amount);
        navigation.navigate("Home");
      }
    );

    rewardedAd.load();

    return () => {
      if (unsubscribeLoaded) unsubscribeLoaded();
      if (unsubscribeEarned) unsubscribeEarned();
    };
  };

  return (
    <ScreenWrapper navigation={navigation} pageName="Purchase">
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />
        
        {!loaded && (
          <View style={styles.loadingOverlay}>
            <Loading />
          </View>
        )}
        
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'buy' && styles.activeTab]}
            onPress={() => setActiveTab('buy')}
          >
            <Text style={[styles.tabText, activeTab === 'buy' && styles.activeTabText]}>Satın Al</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'earn' && styles.activeTab]}
            onPress={() => setActiveTab('earn')}
          >
            <Text style={[styles.tabText, activeTab === 'earn' && styles.activeTabText]}>Kazan</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollView}>
          {activeTab === 'buy' ? (
            <>
              {/* Special Offer Section */}
              <View style={styles.specialOfferSection}>
                <Text style={styles.sectionTitle}>Özel teklif</Text>
                <TouchableOpacity style={styles.subscriptionCard}>
                  <View style={styles.creditAmount}>
                    <Image 
                      source={require('../../assets/coin.png')}
                      style={styles.coinImage}
                    />
                    <Text style={styles.creditText}>100</Text>
                  </View>
                  <Text style={styles.subscriptionText}>Tarotix tarafından sunulan özel teklif</Text>
                  <TouchableOpacity style={styles.subscribeButton}>
                    <Text style={styles.subscribeButtonText}>Satın Al</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              {/* Credit Packages */}
              <View style={styles.creditPackagesSection}>
                <CreditPackage credits={50} bonus={0} price="34.99" />
                <CreditPackage credits={120} bonus={20} price="69.99" />
                <CreditPackage credits={200} bonus={40} price="99.99" popular={true} />
                <CreditPackage credits={400} bonus={100} price="149.99" />
                <CreditPackage credits={700} bonus={150} price="199.99" />
              </View>
            </>
          ) : (
            <View style={styles.earnSection}>
              <Text style={styles.sectionTitle}>Reklam izleyerek kredi kazan</Text>
              <TouchableOpacity style={styles.dailyRewardCard} onPress={loadAd}>
                <View style={styles.creditAmount}>
                  <Image 
                    source={require('../../assets/coin.png')}
                    style={styles.coinImage}
                  />
                  <Text style={styles.creditText}>10</Text>
                </View>
                <Text style={styles.rewardText}>Reklam izleyin, kredi kazanın.</Text>
                <TouchableOpacity style={styles.claimButton}
                  onPress={loadAd}
                >
                  <Text style={styles.claimButtonText}>Reklam izle</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },
  specialOfferSection: {
    marginBottom: 24,
  },
  subscriptionCard: {
    backgroundColor: 'rgba(244, 114, 182, 0.2)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  dailyRewardCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  creditPackage: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popularPackage: {
    borderColor: 'rgba(244, 114, 182, 0.7)',
    borderWidth: 2,
  },
  creditAmount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  creditText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subscriptionText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 8,
  },
  subscribeButton: {
    backgroundColor: 'rgba(244, 114, 182, 0.7)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  subscribeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  claimButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  claimButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bonusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 7,
    alignItems: "center",
  },
  bonusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bonusFreeText: {
    color: '#fff',
    fontSize: 10,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 10,
    backgroundColor: 'rgba(244, 114, 182, 0.7)',
    borderRadius: 12,
    padding: 4,
  },
  popularText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: 'rgba(244, 114, 182, 0.7)',
  },
  tabText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff',
  },
  earnSection: {
    marginTop: 16,
  },
  rewardText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginVertical: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  creditPackagesSection: {
    marginBottom: 16,
  },

});

export default Purchase;
