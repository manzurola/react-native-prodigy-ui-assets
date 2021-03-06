import React, {Component} from "react";
import {View} from "react-native";
import ColorPalette from "../chat/ColorPalette";

export default class Background extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[this.props.style, styles.container]}>
                {this.props.children}
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: ColorPalette.WHITE,
    }
};