
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const FortuneCard = ( { navigation, navigationPage, category_title, category_description, icon, coinAmount=3 } ) => {
  return (
    <TouchableOpacity style={styles.fortuneCard} 
      onPress={() => navigation.navigate(navigationPage, { selectCardAmount: coinAmount, category_title: category_title, category_description: category_description })}>
        <Ionicons name={icon} size={32} color="#fff" />
        <Text style={styles.fortuneTitle}>{category_title}</Text>
        <View style={styles.coinBox}>
          <Image source={ require('../media/common/coin.png') }
            style={styles.coinImage}
          ></Image>
          <Text style={styles.coinText}>{coinAmount}</Text>
        </View>
        <Text style={styles.fortuneDescription}>{category_description}</Text>
  </TouchableOpacity>
  )
}

export default FortuneCard

const styles = StyleSheet.create({
    fortuneCard: {
        width: '48%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
      },
    fortuneTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 8,
        marginBottom: 8,
        textAlign: 'center',
    },
    fortuneDescription: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
    },
    coinImage: {
      height: 20,
      width: 20,
      opacity: 0.7,
    },
    coinText: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center',
      opacity: 0.8,
    },
    coinBox: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }
})