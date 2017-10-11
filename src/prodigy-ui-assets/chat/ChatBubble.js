import React, {Component} from "react";
import {View} from "react-native";
import ColorPalette from "./ColorPalette";

export default class ChatBubble extends Component {

    // constructor(props){
    //     super(props);
    //     console.log("ChatBubble props:");
    //     console.log(props);
    // }

    render() {
        const {
            side,
            isLast,
            isCorrect,
        } = this.props;

        let isRightSide = side === 'right';

        let borderTopLeftRadius = 15;
        let borderTopRightRadius = 15;
        let borderBottomLeftRadius = isLast && !isRightSide ? 2 : 15;
        let borderBottomRightRadius = isLast && isRightSide ? 2 : 15;

        return (
            <View style={[styles.container,
                styles[side],
                {
                    borderTopLeftRadius: borderTopLeftRadius,
                    borderTopRightRadius: borderTopRightRadius,
                    borderBottomLeftRadius: borderBottomLeftRadius,
                    borderBottomRightRadius: borderBottomRightRadius,
                },
                isCorrect && styles.correct,
                this.props.style]}
            >
                {this.props.children}
            </View>
        )
    }
}


const styles = {
    container: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 7,
        paddingTop: 7,
    },
    left: {
        backgroundColor: ColorPalette.LIGHT_GRAY_2,
        borderBottomLeftRadius: 5,
    },
    leftLast: {

    },
    right: {
        backgroundColor: ColorPalette.AQUA_2,
        borderBottomRightRadius: 5,
    },
    rightLast: {

    },
    last: {
        borderBottomLeftRadius: 0,
    },
    correct: {}
};