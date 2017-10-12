import React, {Component} from "react";
import {Text} from "react-native";

export default class UIText extends Text {

    render() {
        return (
            <Text style={[styles.text, this.props.style]}
            >
                {this.props.children}
            </Text>
        )
    }
}

const styles = {
    text: {
        fontSize: 17,
        color: "#000000",
        // fontFamily: "kingsofthehouse-regular",
    }
};