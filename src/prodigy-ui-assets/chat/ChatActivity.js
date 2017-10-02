import React, {Component} from "react";
import {Dimensions, FlatList, LayoutAnimation, UIManager, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import ChatBubble from "./ChatBubble";
import ColorPalette from "./ColorPalette";
import TextAnswerInput from "./PredictiveTextAnswerInput";

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
    // delete: {
    //     type: LayoutAnimation.Types.curveEaseInEaseOut,
    //     property: LayoutAnimation.Properties.opacity,
    // },
};

export default class ChatActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboardOpen: false,
        };
        this.contentHeight = 0;
        this.scrollViewHeight = 0;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.scrollView, this.state.keyboardOpen && styles.scrollViewKeyboardOpen]}>
                    <FlatList style={{flex:1, overflow: 'visible',}}
                              ref='flatList'
                              data={[
                                  {key: 'Devin', text: 'Devin'},
                                  {key: 'Jackson', text: 'Jackson'},
                                  {key: 'James', text: 'James'},
                                  {key: 'Joel', text: 'Joel'},
                                  {key: 'John', text: 'John'},
                                  {key: 'Jillian', text: 'Jillian'},
                                  {key: 'Jimmy', text: 'Jimmy'},
                                  {key: 'Julie', text: 'Julie'},
                                  {key: 'Julie2', text: 'Julie2'},
                                  {key: 'Julie3', text: 'Julie3'},
                                  {key: 'Julie4', text: 'Julie4'},
                              ]}
                              renderItem={({item}) => <ChatBubble style={styles.leftChatBubble}
                                                                  side={"left"}
                                                                  text={item.text}/>}
                        // onContentSizeChange={(w, h) => this.contentHeight = h}
                        // onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}>
                    />
                </View>
                {/*<HorizontalSeparator/>*/}
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
        // const scrollHeight = this.contentHeight - (SCREEN_HEIGHT - 70);
        // this.refs.scrollView.scrollTo(scrollHeight);
        this.refs.flatList.scrollToEnd();
        // this.refs.flatList.scrollToIndex({animated: animated, index: 3, viewPosition: 0});
        // this.refs.flatList.scrollToOffset({offset: 300, animated: animated});
        // LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    onAnswerChange(newAnswer) {
        console.log("evaluating answer [" + newAnswer + "]");
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    getChatBubble(text) {
        return
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollView: {
        // position: 'absolute',
        flex: 1,

        // bottom: 70,
        // height: SCREEN_HEIGHT - 270,
        // width: SCREEN_WIDTH,
        // justifyContent: 'flex-start',
        // height: 100,
        borderWidth: 3,
    },
    scrollViewKeyboardOpen: {
        // height: SCREEN_HEIGHT - 200,

        // bottom: 200,

    },
    block: {
        // width: 320,
    },
    targetSentenceText: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        paddingBottom: 50,
    },
    answer: {
        position: 'absolute',
    },
    leftChatBubble: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
};
