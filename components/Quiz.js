import React, { Component } from 'react'
import {connect} from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import {white, black, buttonFailure, buttonSuccess, red, green, charcoal, buttonPrimary} from '../utils/colors'
class Quiz extends Component {
    state = {
        index:0,
        count:0,
        answerFlag:false,
    }
    showAnswerOrQuestion(answerFlag){
       this.setState({ answerFlag})
    }
    handleButtonClick(type){
        if(type === 'correct'){
            this.setState( oldState => ({
                index: oldState.index + 1,
                count: oldState.count + 1,
                answerFlag : false
            }))
        }else if(type === 'incorrect'){
            this.setState( oldState => ({
                index: oldState.index + 1,
                answerFlag : false
            }))
        }else if(type === 'reset'){
            this.setState( oldState => ({
                index: 0,
                count: 0,
                answerFlag : false
            }))
        }else if(type === 'back'){
            this.props.navigation.navigate('Decks')
        }
    }
    render() {
        const{ index, count, answerFlag} = this.state;
        const {deckTitle} = this.props.navigation.state.params;
        const questions = this.props.decks[deckTitle].questions;

        if(index === questions.length){
            return (
                <View style={styles.container}>
                    <View style={styles.description}>
                        <Text style={styles.quizResults}>Quiz results</Text>
                        <Text style={styles.quizScore}>Score: {count} of {index}</Text>
                    </View>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={() => this.handleButtonClick('back')}>
                            <Text style={[styles.buttonText]}>Back to home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonFailure]} onPress={() => this.handleButtonClick('reset')}>
                            <Text style={[styles.buttonText]}>Reset the quiz</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.pagination}>{index + 1}/{questions.length}</Text>
                <View style={styles.description}>
                    {answerFlag ? (
                        <Text style={styles.content}>{questions[index].answer}</Text>
                    ):(
                        <Text style={styles.content}>{questions[index].question}</Text>
                    )}
                    
                    <TouchableOpacity onPress={() => this.showAnswerOrQuestion(!answerFlag)}>
                        {answerFlag ? (
                            <Text style={styles.answerHint}>Question</Text>
                        ):(
                            <Text style={styles.answerHint}>Answer</Text>
                        )}
                    </TouchableOpacity>
                </View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.buttonSuccess]} onPress={() => this.handleButtonClick('correct')}>
                        <Text style={[styles.buttonText]}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonFailure]} onPress={() => this.handleButtonClick('incorrect')}>
                        <Text style={[styles.buttonText]}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    },
    pagination: {
        flex: 1,
        alignItems: 'flex-start',
        fontSize: 20,
    },
    description: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        color: black,
        fontSize: 44,
        textAlign: 'center'
    },
    answerHint: {
        color: red,
        fontSize: 22,
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },
    button: {
        padding: 10,
        height: 45,
        margin: 10,
        justifyContent: 'center',
        borderRadius: 7
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    buttonSuccess: {
        backgroundColor: buttonSuccess
    },
    buttonPrimary: {
        backgroundColor: buttonPrimary
    },
    buttonFailure: {
        backgroundColor: buttonFailure
    },
    quizResults:{
        color: black,
        fontSize: 22,
        textAlign: 'center'
    },
    quizScore:{
        color: green,
        fontSize: 44,
        textAlign: 'center'
    },
})

const mapStateToProps = (decks) =>{
    return {decks}
}
export default connect(mapStateToProps)(Quiz)