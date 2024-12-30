import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, {useState, useEffect} from "react";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavigation from "../../components/BottomNavigation";
import TopProfileBar from "../common/TopProfileBar";
import {
  RewardedAd,
  RewardedAdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import Loading from "../common/Loading";
import { useSelector } from 'react-redux';
import { updateUserToken } from "../../services/tokenServices";


const DisableAds = ({ tokenAmount, price }) => {
  return (
    <TouchableOpacity style={styles.tokenOption}>
      <Text style={styles.tokenText}>{tokenAmount} Tokens</Text>
      <Text style={styles.tokenPrice}>${price}.00</Text>
    </TouchableOpacity>
  );
};

const Token = ({ navigation }) => {
  const [loaded, setLoaded] = useState(true);
  const [rewardedAd, setRewardedAd] = useState(null);
  const [adShown, setAdShown] = useState(false);
  const user = useSelector((state) => state.userAuth.user);

  const loadAd = () => {
    setLoaded(false);
    const adUnitId = __DEV__
      ? TestIds.REWARDED
      : "ca-app-pub-4666300760854612/5031399665";

    const rewardedAd = RewardedAd.createForAdRequest(adUnitId);
    setRewardedAd(rewardedAd);

    const unsubscribeLoaded = rewardedAd.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        rewardedAd.show(); // Show ad once loaded
      }
    );

    const unsubscribeEarned = rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward.amount);
        updateUserToken(user.uid, reward.amount);
        navigation.navigate("Home");
      }
    );

    rewardedAd.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  return (
    <LinearGradient
      colors={["#1e1b4b", "#4a044e", "#3b0764"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {!loaded && <Loading />}
      <SafeAreaView style={styles.container}>
        <TopProfileBar navigation={navigation} />

        {/* Token Purchase Section */}
        <ScrollView style={styles.scrollView}>
          {/* Token Options */}
          <View style={styles.tokenOptions}>
            <TouchableOpacity style={styles.disableAdsOption}>
              <Text style={styles.tokenText}>Reklamları Kaldır</Text>
              <Text style={styles.tokenPrice}>$5</Text>
            </TouchableOpacity>
            <DisableAds tokenAmount={10} price={5} />
            <DisableAds tokenAmount={50} price={20} />
            <DisableAds tokenAmount={100} price={35} />
          </View>
          {/* Earn Tokens Section */}
          <View style={styles.earnTokensSection}>
            <Text style={styles.earnText}>Video İzleyerek Token Kazan!</Text>
            <Text style={styles.earnSubtext}>Her sefer sadece 1 token</Text>
            <TouchableOpacity
              style={styles.earnButton}
              onPress={() => {
                loadAd(); // Load and show ad when button is clicked
                setAdShown(true);
              }}
            >
              <Text style={styles.earnButtonText}>Token Kazan</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation navigation={navigation} pageName="TokenBuy" />
    </LinearGradient>
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
  tokenOption: {
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
  tokenText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  tokenPrice: {
    fontSize: 14,
    color: "rgba(244, 114, 182, 0.7)",
  },
  earnTokensSection: {
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

export default Token;
