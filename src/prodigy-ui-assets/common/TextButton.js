import React, {Component} from "react";
import {TouchableHighlight, TouchableWithoutFeedback, View} from "react-native";
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
        this.setCharsFromText(nextProps.text);
        // if (nextProps.text !== this.props.text) {
        //     this.setCharsFromText(nextProps.text);
        // }
    }

    render() {
        return (
            <View style={[
                styles.container,
                // this.state.pressed && styles.pressed,
                this.props.style,
            ]}>
                <TouchableHighlight
                    style={this.state.pressed ? styles.pressed : {}}
                    {...this.props}
                    onPress={(event) => this.onPress(event)}
                    onPressIn={() => {
                        console.log("onHideUnderlay");
                        this.setState({pressed: true});
                    }}
                    onPressOut={() => {
                        this.setState({pressed: false});
                        console.log("onShowUnderlay");
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
                <FadeIn delay={30 * i}>
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
        // width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // borderRadius: 45 / 2,
    },
    pressed: {
        backgroundColor: 'blue',
    },
    text: {
        // borderWidth: 5,
        fontSize: 17,
        color: "black",
    },
    textPressed: {
        color: "black",
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    }
};