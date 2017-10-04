import React, {Component} from "react";
import {Dimensions, LayoutAnimation, UIManager, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import ColorPalette from "./ColorPalette";
import TextAnswerInput from "./AnswerInput";
import MessageContainer from "./MessageContainer";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const CustomLayoutLinear = {
    duration: 500,
    create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 5,
    },
    update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 5,
    },
};

const DATA = [
    {key: 'Devin', text: 'Devin\n and a new long line...?'},
    {key: 'Jackson', text: 'Jackson'},
    {key: 'James', text: 'James'},
    {key: 'Joel', text: 'Joel'},
    {key: 'John', text: 'John\nasdasdasd\asdkjhdasd\vvskdjb'},
    {key: 'Jillian', text: 'Jillian'},
    {key: 'Jimmy', text: 'Jimmy'},
    {key: 'Julie', text: 'Julie'},
    {key: 'Julie2', text: 'Julie2'},
    {key: 'Julie3', text: 'Julie3'},
    {key: 'Julie4', text: 'Julie4'},
];

export default class ChatActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardOpen: false,
            messages: DATA
        };
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderMessageContainer()}
                <TextAnswerInput
                    style={styles.answer}
                    choices={this.props.choices}
                    placeholderText={this.props.instructions}
                    onAnswerChange={(newAnswer) => this.onAnswerChange(newAnswer)}
                    onKeyboardDidShow={() => this.onKeyboardDidShow()}
                />
            </View>
        )
    }

    renderMessageContainer() {
        return <MessageContainer
            ref='messageContainer'
            style={[
                styles.scrollView,
                this.state.keyboardOpen && styles.scrollViewKeyboardOpen
            ]}
            data={this.state.messages}
        />
    }

    componentWillUpdate() {
        // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    onKeyboardDidShow() {
        console.log("keyboard did show");
        this.setState({
            keyboardOpen: true,
        }, () => this.scrollToBottom());
    }

    scrollToBottom(animated = true) {

        this.refs.messageContainer.scrollToEnd();
        // this.refs.flatList.scrollToOffset({offset: -300});
    }

    onAnswerChange(newAnswer) {
        console.log("evaluating answer [" + newAnswer + "]");
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollView: {
        height: SCREEN_HEIGHT - 70,
        borderWidth: 3,
    },
    scrollViewKeyboardOpen: {
        height: SCREEN_HEIGHT - 270,
    },
    targetSentenceText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
    answer: {
    },
    leftChatBubble: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
};
