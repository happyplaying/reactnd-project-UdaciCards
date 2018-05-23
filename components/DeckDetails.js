import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {white, black, buttonPrimary} from '../utils/colors'
import { getDeck } from '../utils/api'
import {connect} from 'react-redux'
import Deck from './Deck'

class DeckDetails extends Component {
    state = {
        ready: false,
    }
    navigateToAddCard(title){
        this.props.navigation.navigate('AddCard', {deckTitle: title})
    }
    navigateToStartQuiz(title){
        this.props.navigation.navigate('Quiz', {deckTitle: title})
    }
    render() {
        const{ToAddCard,ToStartQuiz} = this.props.navigation;
        const {deckTitle} = this.props.navigation.state.params;
        const deck = this.props.decks[deckTitle]
        return (
            <View style={styles.container}>
                <Deck id={deck.title} title={deck.title} questions={deck.questions} bigFonts={true} fontSize={36}/>
                <TouchableOpacity style={styles.button} onPress={() => this.navigateToAddCard(deck.title)}>
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.navigateToStartQuiz(deck.title)}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
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
    button: {
        padding: 10,
        height: 60,
        margin: 7,
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: buttonPrimary
    },
    buttonText: {
        color: white,
        fontSize: 25,
        textAlign: 'center'
    }
})
const mapStateToProps = (decks) =>{
    return {decks}
}
export default connect(mapStateToProps)(DeckDetails)