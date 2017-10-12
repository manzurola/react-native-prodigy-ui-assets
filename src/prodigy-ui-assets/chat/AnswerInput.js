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
            keyboardOpen: props.showKeyboard || false,
            submitOnAnswerLengthReached: true,
        };

        let splitChoices = [];
        let longest = 0;

        for (let i = 0; i < props.choices.length; i++) {
            let longChoice = props.choices[i].text;
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
        console.log("Longest choice length " + longest);
        this.choices = choices;
        this.maxAnswerLength = longest; // take the first choice's length as the desired answer length (all choices must have same length)
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.topSeparator}/>
                <View style={styles.input}>
                    <TouchableOpacity onPress={() => {
                        this.onInputPress();
                    }}
                                      onLayout={(event) => {
                                          console.log("input changed size");
                                          // console.log(event.nativeEvent);
                                      }}
                    >
                        {this.state.isEmpty ? this.renderPlaceholderText() : this.renderInputText()}
                    </TouchableOpacity>
                </View>
                <ThreeWordsKeyboard
                    showing={this.state.keyboardOpen}
                    choices={this.choices[this.state.index]}
                    onKeyDidPress={(text) => this.pushWord(text)}
                />
            </View>
        )
    }

    renderPlaceholderText() {
        return <UIText style={styles.placeholderText}>{this.props.placeholderText}</UIText>
    }

    renderInputText() {
        return <UIText style={styles.inputText}>{this.concatenateInputValues()}</UIText>
    }

    // show choices or delete last word in answer
    onInputPress() {
        if (!this.state.isEmpty) {
            this.popWord();
        } else {
            !this.state.keyboardOpen && this.showKeyboard();
            this.onAnswerChange();
        }
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
        console.log("setting answer " + input + ", newIndex: " + newIndex + ", lastIndex: " + lastIndex);
        this.setState({
            isEmpty: input.length === 0,
            answer: input,
            index: newIndex <= lastIndex ? newIndex : lastIndex
        }, this.onAnswerChange);
    }

    onAnswerChange() {
        console.log("answer input - input changed: " + this.concatenateInputValues());
        this.props.onAnswerChange(this.concatenateInputValues());
        if (this.state.submitOnAnswerLengthReached && this.state.answer.length === this.maxAnswerLength) {
            this.submitInput();
        }
    }

    submitInput() {
        console.log("submit input");
        const input = this.concatenateInputValues();
        let isCorrect = false;

        for (let i = 0; i < this.props.choices.length; i++) {
            const choice = this.props.choices[i];
            if (choice.isCorrect && input === choice) {
                isCorrect = true;
            }
        }

        this.setState({
            input: [],
        }, () => {
            this.hideKeyboard();
            this.props.onSubmit({
                input: input,
                isCorrect: isCorrect,
            });
        })
    }

    showKeyboard() {
        console.log("showing keyboard");
        this.setState({
            keyboardOpen: true
        }, this.props.onKeyboardDidShow());
    }

    hideKeyboard() {
        console.log("hiding keyboard");
        this.setState({
            keyboardOpen: false
        }, this.props.onKeyboardDidHide())
    }

    concatenateInputValues() {
        let {answer} = this.state;
        if (answer.length === 0) return "";
        let text = answer[0];
        for (let i = 1; i < answer.length; i++) {
            text += " " + answer[i];
        }
        return text;
    }
}

const styles = {
    container: {
        backgroundColor: ColorPalette.WHITE,
        width: SCREEN_WIDTH,
    },
    topSeparator: {
        height: 1,
        backgroundColor: ColorPalette.LIGHT_GRAY_1,
    },
    input: {
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        textAlign: 'center',
        color: ColorPalette.MEDIUM_GRAY_2,
    },
    inputText: {
        color: ColorPalette.BLACK
    },
    button: {
        width: SCREEN_WIDTH / 3,
        borderRadius: 0,
        backgroundColor: ColorPalette.MEDIUM_GRAY_1,
    }
};