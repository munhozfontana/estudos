import React, { Component } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import colors from '../utils/utils';


export default class Input extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.changeColors = new Animated.Value(0)
    }

    onFocus() {
        Animated.timing(this.changeColors, {
            toValue: 300,
            duration: 250
        }).start()
    }

    onBlur() {
        Animated.timing(this.changeColors, {
            toValue: 0,
            duration: 250
        }).start()
    }

    render() {
        const { placeholder } = this.props
        const interpolateColor = this.changeColors.interpolate({
            inputRange: [0, 300],
            outputRange: [colors.primaria, colors.detalhes]
        })
        
        const animatedStyle = {
            borderColor: interpolateColor,
        }

        return (
            <View style={styles.container} >
                <Animated.View
                    style={[styles.input, animatedStyle]}>
                    <TextInput
                        placeholderTextColor={colors.primaria}
                        style={[styles.item]}
                        placeholder={placeholder}
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}
                    />
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: '3%',
        marginRight: '3%',
        width: 'auto'
    },
    input: {
        borderBottomWidth: 2.5,
        padding: 5,
    },
    text: {
        fontSize: 18
    }
})
