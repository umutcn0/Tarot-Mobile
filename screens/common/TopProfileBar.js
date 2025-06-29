import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { getUserCoin } from '../../services/coinServices';
import { APP_NAME } from '../../constants/config';
import { setCoinAmount } from '../../database/redux/slices/coinSlice';

const TopProfileBar = ({navigation}) => {
    const dispatch = useDispatch();
    const coinAmount = useSelector((state) => state.coin.coinAmount);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.userAuth.user);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                // If coin amount is 0, get user token and set coin amount.
                if (coinAmount == 0 && user && user.uid){
                    const token_data = await getUserCoin(user.uid);
                    if (token_data) {
                        dispatch(setCoinAmount(token_data));
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserData();
    }, [user?.uid]);

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{APP_NAME}</Text>
            <View style={styles.rightSection}>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Purchase' })}>
                <View style={styles.coinBox}>
                    <Image 
                        source={require('../../assets/coin.png')}
                            style={styles.coinImage}
                        />
                        <Text style={styles.coinText}>
                            {loading ? '...' : coinAmount}
                        </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}>
                <Ionicons 
                    name="person-circle-outline" 
                            size={38} 
                            color={'#fff'} 
                        />
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopProfileBar

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 24,
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
      },
    coinImage: {
        height: 20,
        width: 20,
        opacity: 1,
    },
    coinText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        opacity: 1,
        marginRight: 8,
        marginLeft: 5,
    },
    coinBox: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.8,
        padding: 4,
      },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})