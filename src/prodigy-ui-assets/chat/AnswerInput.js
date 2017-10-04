import React, {Component} from "react";
import {Dimensions, TouchableOpacity, View} from "react-native";
import UIText from "../common/UIText";
import ThreeWordsKeyboard from "./ThreeWordsKeyboard";
import ColorPalette from "./ColorPalette";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class AnswerInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEmpty: true,
            index: 0,
            answer: [],
            isKeyboardShowing: props.showKeyboard || false
        };

        let splitChoices = [];
        let longest = 0;

        for (let i = 0; i < props.choices.length; i++) {
            let longChoice = props.choices[i];
            let words = longChoice.split(" ").map(function (item) {
                return item.trim();
            });
            splitChoices.push(words);
            if (words.length > longest) longest = words.length;
        }

        // first index holds the choices at this.state.index
        let choices = [];
        for (let i = 0; i < longest; i++) {
            let choicesAtI = [];
            for (let j = 0; j < splitChoices.length; j++) {
                if (splitChoices[j].length > i) {
                    choicesAtI.push(splitChoices[j][i]);
                }
            }
            choices.push(choicesAtI);
        }

        this.choices = choices;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => {
                                          this.onInputPress();
                                      }}
                                      onLayout={(event) => {
                                          console.log("input changed size");
                                          console.log(event.nativeEvent);
                                      }}
                    >
                        {this.state.isEmpty ? this.renderPlaceholderText() : this.renderInputText()}
                    </TouchableOpacity>
                </View>
                <ThreeWordsKeyboard
                    showing={this.state.isKeyboardShowing}
                    choices={this.choices[this.state.index]}
                    onKeyDidPress={(text) => this.pushWord(text)}
                />
            </View>
        )
    }

    showKeyboard() {
        this.setState({
            showChoices: true,
        })
    }

    // show choices or delete last word in answer
    onInputPress() {
        if (!this.state.isEmpty) {
            this.popWord();
        } else {
            !this.state.isKeyboardShowing && this.showKeyboard();
            this.onAnswerChange();
        }
    }

    // append word to answer
    onButtonPress(text) {
        this.pushWord(text);
    }

    onAnswerChange() {
        this.props.onAnswerChange(this.renderInputText());
    }

    pushWord(text) {
        let input = this.state.answer.slice();
        input.push(text);
        this.setAnswer(input);
    }

    popWord() {
        let input = this.state.answer.slice();
        input.pop();
        this.setAnswer(input);
    }

    setAnswer(input) {
        let newIndex = input.length;
        let lastIndex = this.choices.length - 1;
        this.setState({
            isEmpty: input.length === 0,
            answer: input,
            index: newIndex <= lastIndex ? newIndex : lastIndex
        }, this.onAnswerChange);
    }

    showKeyboard() {
        console.log("showing choices");
        this.setState({
            isKeyboardShowing: true
        }, this.props.onKeyboardDidShow());
    }

    hideChoices() {
        this.setState({
            isKeyboardShowing: false
        }, this.props.onKeyboardDidHide())
    }

    renderPlaceholderText() {
        return <UIText style={styles.placeholderText}>{this.props.placeholderText}</UIText>
    }

    renderInputText() {
        let {answer} = this.state;
        let text = answer[0];
        for (let i = 1; i < answer.length; i++) {
            text += " " + answer[i];
        }
        return <UIText style={styles.inputText}>{text}</UIText>
    }
}

const styles = {
    container: {
        backgroundColor: "white",
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: -3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    input: {
        width: SCREEN_WIDTH,
        minHeight: 40,
        paddingLeft: 30,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    placeholderText: {
        textAlign: 'center',
        color: ColorPalette.MEDIUM_GRAY_2
    },
    inputText: {
        color: ColorPalette.BLACK
    },
    button: {
        width: SCREEN_WIDTH / 3,
        borderRadius: 0,
    }
};