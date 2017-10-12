import React, {Component} from "react";
import {TouchableHighlight, View} from "react-native";
import TimerMixin from "react-timer-mixin";
import UIText from "./UIText";
import FadeIn from "./FadeIn";

let reactMixin = require('react-mixin');

export default class TextButton extends Component {

    constructor(props) {
        super(props);
        const chars = this.createCharsFromText(props.text, false);
        this.state = {
            pressed: false,
            chars: chars
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text !== this.props.text) {
            this.setCharsFromText(nextProps.text);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    style={[styles.button, this.state.pressed && styles.buttonPressed]}
                    activeOpacity={1}
                    onPress={(event) => this.onPress(event)}
                    onShowUnderlay={() => {
                        this.setState({pressed: true});
                        console.log("onShowUnderlay");
                    }}
                    onHideUnderlay={() => {
                        this.setState({pressed: false});
                        console.log("onHideUnderlay");
                    }}>
                    <View style={styles.textContainer}>
                        {this.state.chars}
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    onPress() {
        this.props.onPress();
    }

    setCharsFromText(value) {
        this.setState({
            chars: this.createCharsFromText(value, this.state.pressed)
        });

        // this.setState({
        //     pressed: false
        // }, () => {
        //     this.setState({
        //         chars: this.createCharsFromText(value)
        //     })
        // })
    }

    createCharsFromText(value, pressed) {
        let chars = [];
        for (let i = 0; i < value.length; i++) {
            let char = value[i];
            chars.push(
                <FadeIn delay={30 * i}
                        key={i}>
                    <UIText style={[
                        styles.text,
                        pressed && styles.textPressed,
                        !!this.props.textStyle,
                        pressed && !!this.props.textPressedStyle,
                    ]}>
                        {char}
                    </UIText>
                </FadeIn>
            )
        }
        return chars;
    }
}
reactMixin(TextButton.prototype, TimerMixin);

const styles = {
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1,
        borderWidth: 1,
        width: 50,
        borderRadius: 5,
    },
    button: {
        backgroundColor: 'white',
    },
    buttonPressed: {
        backgroundColor: 'blue',
    },
    text: {
        fontSize: 17,
        color: "black",
    },
    textPressed: {
        color: "white",
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    }
};