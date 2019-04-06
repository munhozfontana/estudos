import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../utils/utils';

const Card = (props) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View  style={styles.card}>
                <Text> {props.card.email }</Text>
            </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: .5,
        padding: 5,
        height: Dimensions.get('window').width / 2,
        
    },
    card: {
        backgroundColor: colors.primaria,
        flex: 1,
		borderWidth: 1,
    }
})


export default Card
