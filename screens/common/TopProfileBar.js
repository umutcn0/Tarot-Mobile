import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { getUserToken } from '../../services/tokenServices';

const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME;

const TopProfileBar = ({navigation}) => {
    const [coinAmount, setcoinAmount] = useState(0);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.userAuth.user);

    useEffect(() => {
        const getUserData = async () => {
            try {
                setLoading(true);
                if (user && user.uid) {
                    const token_data = await getUserToken(user.uid);
                    if (token_data) {
                        setcoinAmount(token_data);
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                setcoinAmount(0);
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
            <TouchableOpacity onPress={() => navigation.navigate('Token')}>
                <View style={styles.coinBox}>
                    <Image 
                        source={require('../../media/common/coin.png')}
                            style={styles.coinImage}
                        />
                        <Text style={styles.coinText}>
                            {loading ? '...' : coinAmount}
                        </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
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
        height: 30,
        width: 30,
        opacity: 1,
    },
    coinText: {
        color: '#fff',
        fontSize: 17,
        textAlign: 'center',
        opacity: 1,
        marginRight: 8,
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