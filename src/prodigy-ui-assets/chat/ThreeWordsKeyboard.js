import React, {Component} from "react";
import {Dimensions, TouchableHighlight, View} from "react-native";
import TextButton from "../common/TextButton";
import ColorPalette from "./ColorPalette";
import UIText from "../common/UIText";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class ThreeWordsKeyboard extends Component {

    render() {
        if (!this.props.showing) return null;
        return (
            <View style={[styles.container, this.props.style]}>
                {this.getTextButton(0)}
                {this.getTextButton(1)}
                {this.getTextButton(2)}
            </View>
        );
    }

    onKeyDidPress(text) {
        this.props.onKeyDidPress(text);
    }

    getTextButton(i) {
        let text = this.props.choices[i];

        return <KeyboardButton
            key={i}
            style={styles.button}
            text={text}
            onPress={() => this.onKeyDidPress(text)}
        />;
    }
}
//
class KeyboardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: false,
        };
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.text !== this.props.text) {
    //         this.setCharsFromText(nextProps.text);
    //     }
    // }

    render() {
        return (

                <TouchableHighlight
                    style={this.props.style}
                    onPress={(event) => this.onPress(event)}
                    onShowUnderlay={() => {
                        this.setState({pressed: true});
                        console.log("onShowUnderlay");
                    }}
                    onHideUnderlay={() => {
                        this.setState({pressed: false});
                        console.log("onHideUnderlay");
                    }}>
                    <UIText style={styles.buttonText}>{this.props.text}</UIText>
                </TouchableHighlight>
        )
    }

    onPress() {
        this.props.onPress();
    }
}



const styles = {
    container: {
        width: SCREEN_WIDTH,
        height: 180,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderWidth: 1,
        // flex: 1,
        width: 200,
        height: 50,
        borderRadius: 10,
        backgroundColor: ColorPalette.DARK_GRAY_1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: ColorPalette.LIGHT_GRAY_1,
    }
};