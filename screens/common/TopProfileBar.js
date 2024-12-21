import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const TopProfileBar = ({navigation}) => {
    const user = useSelector((state) => state.userAuth.user);
    const isLoading = useSelector((state) => state.userAuth.isLoading);

    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Crystal Vision</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.coinBox}>
                <Image source={ require('../../media/common/coin.png') }
                    style={styles.coinImage}
                />
                <Text style={styles.coinText}>{user.coinAmount ? user.coinAmount : 0}</Text>
                <Ionicons name="person-circle-outline" size={32} color="#fff" />
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default TopProfileBar

const styles = StyleSheet.create({
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
    coinImage: {
        height: 25,
        width: 25,
        opacity: 0.7,
    },
    coinText: {
        color: '#fff',
        fontSize: 15,
        textAlign: 'center',
        opacity: 0.8,
        marginRight: 8,
    },
    coinBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
        padding: 4,
      },
})