import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import utils from '../utils/utils';

export class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            border: new Animated.Value(2)
        }

    }

    componentWillMount() {
        this.changeColors = new Animated.Value(0)
    }

    onPress() {
        Animated.parallel([
            this.props.click(),
            Animated.timing(this.changeColors, {
                toValue: 300,
                duration: 250
            }).start(() => {
                Animated.timing(this.changeColors, {
                    toValue: 0,
                    duration: 250,
                }).start();
            }),
            // Animated.timing(this.state.height, {
            //     toValue: this.props.height + 87,
            //     duration: 200,
            // }).start(() => {
            //     Animated.timing(this.state.height, {
            //         toValue: this.props.height,
            //         duration: 250,
            //     }).start();
            // }),
            Animated.timing(this.state.border, {
                toValue: 5,
                duration: 200,
            }).start(() => {
                Animated.timing(this.state.border, {
                    toValue: 2,
                    duration: 250,
                }).start();
            })
        ])

    }

    render() {
        const interpolateColor = this.changeColors.interpolate({
            inputRange: [0, 300],
            outputRange: [utils.colors.primaria, utils.colors.detalhes]
        })

        return (
            
            <TouchableWithoutFeedback onPress={() => { this.onPress() }} >
                <Animated.View style={[styles.container, { borderColor: interpolateColor }, { borderWidth: this.state.border, height: this.props.height }]} >
                        <Animated.Text style={[styles.item, { color: interpolateColor }]}>{this.props.label}</Animated.Text>
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
        borderRadius: 20
    },

    item: {
        fontSize: 18,
        color: utils.colors.primaria
    }
})

export default Button;
