import React, {Component} from "react";
import {Dimensions, View} from "react-native";
import TextButton from "../common/TextButton";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class PredictiveTextKeyboard extends Component {

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

        return <TextButton
            style={styles.button}
            text={text}
            onPress={() => this.onKeyDidPress(text)}
        />;
    }

}

const styles = {
    container: {
        width: SCREEN_WIDTH,
        height: 200,
        flexDirection: 'row'
    },
    button: {
        height: 30,
        flex: 1,
    }
};