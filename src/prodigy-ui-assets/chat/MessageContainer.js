import React, {Component} from "react";
import {Dimensions, FlatList, LayoutAnimation, TouchableWithoutFeedback, UIManager, View} from "react-native";
import HorizontalSeparator from "../common/HorizontalSeparator";
import ChatBubble from "./ChatBubble";
import ColorPalette from "./ColorPalette";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MessageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data.reverse()
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                data: nextProps.data.reverse()
            })
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
                style={this.props.style}
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
        )
    }

    scrollToEnd(animated = true) {
        this.refs.flatList.scrollToIndex({viewPosition: 1, index: 0});
    }

}

const styles = {
    leftChatBubble: {
        margin: 5,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    rightChatBubble: {
        right: 20,
    }
}