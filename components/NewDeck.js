import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import {black, white, lightGray, buttonPrimary} from '../utils/colors'
import { addNewDeckTitle } from '../utils/api'
import {connect} from 'react-redux'
import {addDeck} from '../actions'
class NewDeck extends Component {
    state = {
        deckTitle: '',
    }
    inputValueChange (type, value){
        this.setState({[type]:value})
    }
    handleNewDeck = (title) => {
        const {deckTitle} = this.state
        if (deckTitle) {
            addNewDeckTitle(deckTitle).then((decks) =>{
                this.props.dispatch(addDeck({
                    [deckTitle]:{
                        title:deckTitle,
                        questions:[],
                    }
                }))
                this.props.navigation.navigate('Decks')
            })
        }
    }
    render() {
        return (
            <KeyboardAvoidingView behavior = 'padding' style={styles.container}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput 
                    style={styles.deckTitle} 
                    editable={true} 
                    maxLength={100} 
                    placeholder="Input your new deck title here" 
                    onChangeText={(value) => this.inputValueChange('deckTitle',value)}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.handleNewDeck()}>
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
        fontSize: 36,
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
    deckTitle: {
        marginTop: 30,
        marginBottom: 30,
        padding: 10,
        paddingTop: 5,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: lightGray,
        borderRadius: 5
    },
})
export default connect()(NewDeck)