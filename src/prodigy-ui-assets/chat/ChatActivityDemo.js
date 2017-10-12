import React, {Component} from "react";
import Background from "../common/Background";
import ChatActivity from "./ChatActivity";

class ChatActivityDemo extends Component {
    render() {
        return (
            <Background>
                <ChatActivity {...data}/>
            </Background>
        )
    }
}

export default ChatActivityDemo;

let data = {
    instructions: "Put into the plural",
    targetSentence: "A dog is cute",
    choices: [
        {text: "Dogs a cute", isCorrect: false},
        {text: "Dogs are cute", isCorrect: true},
        {text: "A dogs are", isCorrect: false}
    ]
};