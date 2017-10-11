import React, {Component} from "react";
import {Dimensions, FlatList, TouchableWithoutFeedback} from "react-native";
import Message from "./Message";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class MessageContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.prepareMessages(props.data)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                data: this.prepareMessages(nextProps.data)
            })
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback
                style={this.props.style}
                onLayout={(event) => {
                    // console.log(event.nativeEvent);
                }}
                onPress={() => {
                    console.log("chat screen pressed");
                }}>
                <FlatList ref='flatList'
                          data={this.state.data}
                          onScrollEnd={() => {
                              console.log("on scroll")
                          }}
                          renderItem={({item}) => this.renderMessage(item)}
                          inverted={true}
                />
            </TouchableWithoutFeedback>)
    }

    renderMessage(item) {
        return <Message key={item.key} {...item}/>;
    }

    prepareMessages(data) {
        let reversed = data.reverse();
        let result = [];
        let lastSender = null;
        let key = 0;
        for (let item of reversed) {
            const currentSender = item.from;
            result.push({
                key: key,
                text: item.text,
                sender: currentSender,
                isLast: currentSender !== lastSender,
                side: item.right ? "right" : "left"
            });
            lastSender = currentSender;
            key++;
        }
        return result;
    }

    scrollToEnd(animated = true) {
        this.refs.flatList.scrollToIndex({viewPosition: 1, index: 0});
    }
}