import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, {useState, useEffect} from "react";
import TopProfileBar from "../common/TopProfileBar";
import {
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import Loading from "../common/Loading";
import { useSelector } from 'react-redux';
import { updateUserCoin } from "../../services/coinServices";
import ScreenWrapper from '../../components/ScreenWrapper';

const DisableAds = ({ coinAmount, price }) => {
  return (
    <TouchableOpacity style={styles.coinOption}>
      <Text style={styles.coinText}>{coinAmount} Coins</Text>
      <Text style={styles.coinPrice}>${price}.00</Text>
    </TouchableOpacity>
  );
};

const Purchase = ({ navigation }) => {
  const [loaded, setLoaded] = useState(true);
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
      {!loaded && <Loading />}
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />

        {/* Coin Purchase Section */}
        <ScrollView style={styles.scrollView}>
          {/* Coin Options */}
          <View style={styles.coinOptions}>
            <TouchableOpacity style={styles.disableAdsOption}>
              <Text style={styles.coinText}>Reklamları Kaldır</Text>
              <Text style={styles.coinPrice}>$5</Text>
            </TouchableOpacity>
            <DisableAds coinAmount={10} price={5} />
            <DisableAds coinAmount={50} price={20} />
            <DisableAds coinAmount={100} price={35} />
          </View>
          {/* Earn Coins Section */}
          <View style={styles.earnCoinsSection}>
            <Text style={styles.earnText}>Video İzleyerek Coin Kazan!</Text>
            <Text style={styles.earnSubtext}>Her sefer sadece 1 coin</Text>
            <TouchableOpacity
              style={styles.earnButton}
              onPress={() => {
                loadAd(); // Load and show ad when button is clicked
              }}
            >
              <Text style={styles.earnButtonText}>Coin Kazan</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  instructionText: {
    fontSize: 18,
    color: "rgba(244, 114, 182, 0.7)",
    marginBottom: 16,
  },
  coinOption: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  disableAdsOption: {
    backgroundColor: "#353169",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  coinText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  coinPrice: {
    fontSize: 14,
    color: "rgba(244, 114, 182, 0.7)",
  },
  earnCoinsSection: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    alignItems: "center",
  },
  earnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  earnSubtext: {
    fontSize: 14,
    color: "rgba(244, 114, 182, 0.7)",
    marginBottom: 16,
  },
  earnButton: {
    backgroundColor: "rgba(244, 114, 182, 0.7)",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  earnButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  purchaseButton: {
    backgroundColor: "rgba(244, 114, 182, 0.7)",
    padding: 16,
    marginBottom: 30,
    borderRadius: 16,
    alignItems: "center",
  },
  purchaseText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Purchase;
