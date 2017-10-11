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

        const marginBottom = isLast ? 10 : 1;

        return <View key={this.key}>
            <View style={[styles.row, {marginBottom: marginBottom}]}>
                <ChatBubble
                    side={side}
                    isLast={isLast}
                    style={[
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
        marginLeft: 20,
    },
    separator: {
        height: 3,
    },
    correct: {}
};
