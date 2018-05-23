import React from 'react';
import {AsyncStorage} from 'react-native'
export const DECKS_STORAGE_KEY = 'UdaciCards:Happyplaying'

const dummyDecks = () =>({
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            }, {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
})

export const getDecks = () => {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
        return (results) ? JSON.parse(results) : dummyDecks()
    })
}
export const getDeck = (id) => {
  return getDecks().then((decks) => (decks[id]))
}
export const addNewDeckTitle = (deckTitle) => {
    return getDecks().then((decks) => {
        if (!decks[deckTitle]) {
            decks[deckTitle] = {
                title: deckTitle,
                questions: []
            }
            AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
            return decks
        }
    })
}
export const addCardToDeck = (title, {question, answer}) => {
    return getDecks().then((decks) => {
        if (decks[title] && decks[title]['questions']) {
            decks[title]['questions'].push({question, answer})
        }
        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
        return decks
    })
}