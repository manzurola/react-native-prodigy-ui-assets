import React, {Component} from "react";
import {Animated, Dimensions, Easing, TouchableHighlight, View} from "react-native";
import ColorPalette from "./ColorPalette";
import UIText from "../common/UIText";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const KEYBOARD_HEIGHT = 200;

export default class ThreeWordsKeyboard extends Component {

    constructor(props) {
        super(props);
        this.height = new Animated.Value(0);
        if (props.showing) this.animateShow();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showing === this.props.showing) return;
        if (nextProps.showing) this.animateShow();
        else this.animatedHide();
    }

    render() {
        return (
            <Animated.View style={[
                styles.container,
                {height: this.height},
                this.props.style
            ]}>
                {this.getTextButton(0)}
                <View style={styles.buttonSeparator}/>
                {this.getTextButton(1)}
                <View style={styles.buttonSeparator}/>
                {this.getTextButton(2)}
            </Animated.View>
        );
    }

    animateShow() {
        Animated.timing(
            this.height,
            {
                toValue: KEYBOARD_HEIGHT,
                duration: 300,
                easing: Easing.spring,
                springDamping: 5,
            }
        ).start();
    }

    animatedHide() {
        Animated.timing(
            this.height,
            {
                toValue: 0,
                duration: 300,
                easing: Easing.spring,
                springDamping: 5,
            }
        ).start();
    }

    onKeyDidPress(text) {
        this.props.onKeyDidPress(text);
    }

    getTextButton(i) {
        let text = this.props.choices[i];

        return <KeyboardButton
            key={i}
            style={styles.button}
            text={text}
            onPress={() => this.onKeyDidPress(text)}
        />;
    }
}

//
class KeyboardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.text !== this.props.text) {
    //         this.setCharsFromText(nextProps.text);
    //     }
    // }

    render() {
        return (

            <TouchableHighlight
                style={this.props.style}
                onPress={(event) => this.onPress(event)}
                onShowUnderlay={() => {
                    this.setState({pressed: true});
                    console.log("onShowUnderlay");
                }}
                onHideUnderlay={() => {
                    this.setState({pressed: false});
                    console.log("onHideUnderlay");
                }}>
                <UIText style={styles.buttonText}>{this.props.text}</UIText>
            </TouchableHighlight>
        )
    }

    onPress() {
        this.props.onPress();
    }
}


const styles = {
    container: {
        width: SCREEN_WIDTH,
        height: 180,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    button: {
        width: 200,
        height: 50,
        borderRadius: 25,
        backgroundColor: ColorPalette.DARK_GRAY_1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: ColorPalette.LIGHT_GRAY_1,
    },
    buttonSeparator: {
        height: 3,
    }
};