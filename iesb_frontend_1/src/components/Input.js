import React, { Component } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
import utils from '../utils/utils';



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
            outputRange: [utils.colors.primaria, utils.colors.detalhes]
        })
        
        const animatedStyle = {
            borderColor: interpolateColor,
        }

        return (
            <View style={styles.container} >
                <Animated.View
                    style={[styles.input, animatedStyle, {width: this.props.width}]}>
                    <TextInput
                        placeholderTextColor={utils.colors.primaria}
                        style={[styles.item,{color: utils.colors.primaria}]}
                        placeholder={placeholder}
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}
                        onChangeText={text => this.props.value(text)}
                    />
                </Animated.View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginLeft: '3%',
        marginRight: '3%'
    },
    input: {
        borderBottomWidth: 2.5,
        padding: 5,
    },
    text: {
        fontSize: 18
    }
})
