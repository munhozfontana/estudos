import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../utils/utils';

export class Button extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.changeColors = new Animated.Value(0)
    }

    onPress() {
        this.props.click();
        Animated.timing(this.changeColors, {
            toValue: 300,
            duration: 250
        }).start(() => {
            Animated.timing(this.changeColors, {
                toValue: 0,
                duration: 250
            }).start();
        })

        

    }

    render() {
        const interpolateColor = this.changeColors.interpolate({
            inputRange: [0, 300],
            outputRange: [colors.primaria, colors.detalhes]
        })

        return (
            <TouchableWithoutFeedback onPress={() => {this.onPress()}} >
                <Animated.View style={[styles.container, { borderColor: interpolateColor}]} >
                    <View style={styles.btn}>
                        <Animated.Text style={[styles.text,{ color: interpolateColor} ]}>Salvar</Animated.Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '3%',
        marginRight: '3%',
        width: 'auto',
        borderWidth: 2.5,
        borderRadius: 20
    },
    btn: {
    },
    text: {
        fontSize: 18,
        color: colors.primaria
    }
})

export default Button;
