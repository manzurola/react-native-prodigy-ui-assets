import React, {Component} from "react";
import {FlatList, Text, TextInput, View} from "react-native";

export default class TextInputChatDemo extends Component {

    render() {
        return (
            <View>
                <Text>{"hello"}</Text>
                <FlatList>
                </FlatList>
                <TextInput/>
            </View>
        )
    }
}