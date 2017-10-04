import React, {Component} from "react";
import {Dimensions, FlatList, LayoutAnimation, TouchableWithoutFeedback, UIManager, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import ChatBubble from "./ChatBubble";
import ColorPalette from "./ColorPalette";
import TextAnswerInput from "./AnswerInput";

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
            data: [
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
            ]
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    style={[styles.scrollView, this.state.keyboardOpen && styles.scrollViewKeyboardOpen]}
                    onLayout={(event) => {
                        console.log(event.nativeEvent);
                    }}
                    onPress={() => {
                        console.log("chat screen pressed");
                    }}>
                    <FlatList ref='flatList'
                              data={this.state.data}
                              onScrollEnd={() => {
                                  console.log("on scroll")
                              }}
                              renderItem={({item}) => {
                                  // if (item.key === 'dummy') {
                                  //     return <View style={{height: 0}}/>
                                  // }
                                  return <View>
                                      <HorizontalSeparator/>
                                      <ChatBubble style={styles.leftChatBubble}
                                                  side={"left"}
                                                  text={item.text}/>
                                  </View>
                              }}
                              inverted={true}
                    />
                </TouchableWithoutFeedback>
                {/*<HorizontalSeparator/>*/}
                <TextAnswerInput
                    style={styles.answer}
                    choices={this.props.choices}
                    placeholderText={this.props.instructions}
                    onAnswerChange={(newAnswer) => this.onAnswerChange(newAnswer)}
                    onKeyboardDidShow={() => this.onKeyboardDidShow()}
                />
                {/*<TextButton text={"scroll to last element"} onPress={()=>{*/}
                {/*this.scrollToBottom();*/}
                {/*}} />*/}
            </View>
        )
    }

    componentWillUpdate() {
        // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // LayoutAnimation.configureNext(CustomLayoutLinear);
    }

    onKeyboardDidShow() {
        console.log("keyboard did show");
        let newData = this.state.data.slice();
        newData.push({key: 'dummy', text: ''});
        this.setState({
            keyboardOpen: true,
            // data: newData
        }, () => this.scrollToBottom());
    }

    scrollToBottom(animated = true) {

        this.refs.flatList.scrollToIndex({viewPosition: 1, index: 0});
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
        // position: 'absolute',
        // flex: 1,
        // paddingBottom: 200,
        height: SCREEN_HEIGHT - 70,
        // top: 0,
        borderWidth: 3,
        // overflow: 'visible',
    },
    scrollViewKeyboardOpen: {
        height: SCREEN_HEIGHT - 270,
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
        // position: 'absolute',
    },
    leftChatBubble: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
};
