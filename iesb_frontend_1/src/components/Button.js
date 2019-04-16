import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import utils from '../utils/utils';

export class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width
        }

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
            outputRange: [utils.colors.primaria, utils.colors.detalhes]
        })

        return (
            <TouchableWithoutFeedback onPress={() => {this.onPress()}} >
                <Animated.View style={[styles.container, { borderColor: interpolateColor},{width:  this.state.width, height: this.props.height}]} >
                    <View style={styles.btn}>
                        <Animated.Text style={[styles.text,{ color: interpolateColor} ]}>{ this.props.label }</Animated.Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '3%',
        marginRight: '3%',
        borderWidth: 2.5,
        borderRadius: 20
    },
    btn: {
    },
    text: {
        fontSize: 18,
        color: utils.colors.primaria
    }
})

export default Button;
