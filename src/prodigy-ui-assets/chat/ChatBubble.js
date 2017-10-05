import React, {Component} from "react";
import {View} from "react-native";
import UIText from "../common/UIText";
import ColorPalette from "./ColorPalette";

export default class ChatBubble extends Component {
    render() {
        const {
            side,
            isLast,
            isCorrect,
            text
        } = this.props;
        return (
            <View style={[styles.container,
                styles[side],
                isLast && styles.last,
                isCorrect && styles.correct,
                this.props.style]}>
                {this.props.children}
            </View>
        )
    }
}


const styles = {
    container: {
        borderRadius: 20,
        backgroundColor: 'white',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    bubble: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
    },
    left: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
        borderBottomLeftRadius: 0,
    },
    right: {
        right: 20,
        backgroundColor: ColorPalette.AQUA_2,
        borderBottomRightRadius: 0,
    },
    last: {
        borderBottomLeftRadius: 0,
    },
    correct: {}
};