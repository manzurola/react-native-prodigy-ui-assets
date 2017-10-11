import React, {Component} from "react";
import {TouchableWithoutFeedback, View} from "react-native";
import TimerMixin from "react-timer-mixin";
import UIText from "./UIText";
import FadeIn from "./FadeIn";

let reactMixin = require('react-mixin');

export default class TextButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
            chars: []
        };

        let chars = this.createCharsFromText(props.text);
        this.state.chars = chars;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.text !== this.props.text) {
            this.setCharsFromText(nextProps.text);
        }
    }

    render() {
        return (

            <TouchableWithoutFeedback
                style={[styles.container, this.state.pressed && styles.pressed]}
                {...this.props}
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
            </TouchableWithoutFeedback>
        )
    }

    onPress() {
        this.props.onPress();
    }

    setCharsFromText(value) {
        this.setState({
            chars: this.createCharsFromText(value)
        });

        // this.setState({
        //     pressed: false
        // }, () => {
        //     this.setState({
        //         chars: this.createCharsFromText(value)
        //     })
        // })
    }

    createCharsFromText(value) {
        let chars = [];
        for (let i = 0; i < value.length; i++) {
            let char = value[i];
            chars.push(
                <FadeIn delay={30 * i}
                        key={i}>
                    <UIText style={[
                        styles.text,
                        this.state.pressed && styles.textPressed,
                        !!this.props.textStyle,
                        this.state.pressed && !!this.props.textPressedStyle,
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    pressed: {
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