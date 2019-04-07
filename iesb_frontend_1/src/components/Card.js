import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../utils/utils';

const Card = ({ card }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.text}> {card.item.name}</Text>
                <Text style={styles.text}> {card.item.email}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width:Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
    },
    card: {
        margin: '3%',
        backgroundColor: colors.primaria,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        color: '#FDFAFE',
        fontSize: 14
    }
})
export default Card
