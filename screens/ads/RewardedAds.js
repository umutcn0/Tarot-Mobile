import { StyleSheet, Text, View, Button } from "react-native";
import React, {useState, useEffect} from "react";
import { RewardedAd, RewardedAdEventType, TestIds } from "react-native-google-mobile-ads";


const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-4666300760854612/5031399665';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  keywords: ["fashion", "clothing"],
});

const RewardedAds = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
        if (!adShown){
          rewarded.show();
          setAdShown(true);
        }
      }
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward of ", reward);
        navigation.navigate("Token");
      }
    );

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [adShown]);

  // No advert ready to show yet
  if (!loaded) {
    return null;
  }

  return (
    <View
      style={styles.container}
    >
    </View>
    
  );
};

export default RewardedAds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 20,
    backgroundColor: "#DDDDDD",
  },
});
