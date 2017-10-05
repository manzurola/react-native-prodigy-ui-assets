import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import ChatBubble from "./ChatBubble";
import ColorPalette from "./ColorPalette";
import UIText from "../common/UIText";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Message extends Component {

    render() {
        const {
            side,
            isLast,
            isCorrect,
            text,
            bubbleStyle
        } = this.props;

        const marginBottom = isLast ? 20 : 1;

        return <View key={this.key}>
            <View style={[styles.row, {marginBottom: marginBottom}]}>
                <ChatBubble
                    style={[
                        styles.bubble,
                        styles[side],
                        isLast && styles.last,
                        isCorrect && styles.correct,
                        bubbleStyle,
                    ]}
                >
                    <UIText>{text}</UIText>
                </ChatBubble>
            </View>
        </View>
    }

}

const styles = {
    container: {},
    row: {
        flexDirection: 'row',
        paddingLeft: 20,
        marginLeft: 20,
    },
    separator: {
        height: 3,
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
    },
    right: {
        right: 20,
        backgroundColor: ColorPalette.AQUA_2,
    },
    last: {
        borderBottomLeftRadius: 0,
    },
    correct: {}
};
