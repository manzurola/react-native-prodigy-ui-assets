import React, {Component} from "react";
import {Dimensions, LayoutAnimation, UIManager, View} from "react-native";
import ColorPalette from "./ColorPalette";
import AnswerInput from "./AnswerInput";
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
    {id: 0, from: 'Johnny', text: 'Prepare to be crushed!'},
    {id: 1, from: 'Johnny', text: 'Make my sentences plural, or suffer the consequences, human!'},
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
                {this.renderTextAnswerInput()}
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

    renderTextAnswerInput() {
        const {choices, instructions} = this.props;
        return (
            <AnswerInput
                style={styles.answer}
                choices={choices}
                placeholderText={instructions}
                onAnswerChange={(newAnswer) => this.onAnswerChange(newAnswer)}
                onKeyboardDidShow={() => this.onKeyboardDidShow()}
                onKeyboardDidHide={() => this.onKeyboardDidHide()}
                onSubmit={() => this.onSubmit()}
            />
        )
    }

    onKeyboardDidShow() {
        console.log("keyboard did show");
        this.setState({
            keyboardOpen: true,
        }, () => this.scrollToBottom());
    }

    onKeyboardDidHide() {
        console.log("keyboard did hide");
        this.setState({
            keyboardOpen: false,
        });
    }

    scrollToBottom(animated = true) {
        this.refs.messageContainer.scrollToEnd();
    }

    onAnswerChange(newAnswer) {
        console.log("evaluating answer [" + newAnswer + "]");
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    onSubmit() {
        console.log("submitting answer [" + this.state)
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
    answer: {},
    continueButton: {},
    leftChatBubble: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
};
