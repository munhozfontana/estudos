import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import utils from '../utils/utils';

export default class Card extends Component {

    constructor(props) {
        super(props);
    }

    deleteCard() {
        this.props.deleteCard(this.props.card.item.id);
    }

    render() {

        return (

            <TouchableOpacity onPress={() => this.deleteCard()} style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.text}>Nome: {this.props.card.item.nome}</Text>
                    <Text style={styles.text}>Apelido: {this.props.card.item.apelido}</Text>
                    <Text style={styles.text}>Idade: {this.props.card.item.idade}</Text>
                    <Text style={styles.text}>Todo: {this.props.card.item.todo}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').width / 2,
    },
    card: {
        margin: '3%',
        backgroundColor: utils.colors.primaria,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },
    text: {
        color: '#FDFAFE',
        fontSize: 14
    }
})
