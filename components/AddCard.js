import React, { Component } from 'react'
import { KeyboardAvoidingView , Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {black, white, lightGray, buttonPrimary} from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import {connect} from 'react-redux'
import {addCard} from '../actions'
class AddCard extends Component {
    state = {
        question: '',
        answer:'',
    }
    inputValueChange (type, value){
        this.setState({[type]:value})
    }
    handleAddCard = (title) => {
        const {question, answer} = this.state
        if (question && answer) {
            addCardToDeck(title, {question, answer}).then((decks) =>{
                this.props.dispatch(addCard(title, {question, answer}))
                this.props.navigation.goBack()
            })
        }
    }
    render() {
        const {deckTitle} = this.props.navigation.state.params;
        return (
            <KeyboardAvoidingView behavior = 'padding' style={styles.container}>
                <Text style={styles.title}>{deckTitle}</Text>
                <TextInput 
                    style={styles.question} 
                    editable={true} 
                    maxLength={100} 
                    placeholder="Input your question here" 
                    onChangeText={(value) => this.inputValueChange('question',value)}
                />
                <TextInput 
                    style={styles.answer}  
                    editable={true} 
                    maxLength={200} 
                    multiline={true} 
                    placeholder="Input your answer here" 
                    onChangeText={(value) => this.inputValueChange('answer',value)}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.handleAddCard(deckTitle)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        color: black,
        fontSize: 24,
        textAlign: 'center'
    },
    button: {
        padding: 10,
        height: 60,
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: buttonPrimary
    },
    buttonText: {
        color: white,
        fontSize: 25,
        textAlign: 'center'
    },
    question: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: lightGray,
        borderRadius: 5
    },
    answer: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: lightGray,
        height: 80
    }
})
export default connect()(AddCard)