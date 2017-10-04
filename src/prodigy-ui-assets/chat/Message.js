import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import ChatBubble from "./ChatBubble";
import ColorPalette from "./ColorPalette";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Message extends Component {

    render() {
        return <View>
            <View style={styles.row}>
                <ChatBubble style={styles.bubble}
                            side={"left"}
                            text={this.props.text}/>
            </View>
            <View style={styles.separator}/>
        </View>
    }

}

const styles = {
    container: {},
    row: {
        flexDirection: 'row',
        paddingLeft: 20,
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
    leftChatBubble: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
};
