import { AsyncStorage } from 'react-native'
//import { getMetricMetaInfo, timeToString } from './helpers'

export const DECK_STORAGE_KEY = 'DECK_STORAGE_KEY:UdaciCards:deck:DECK_STORAGE_KEY'

const dummyData = () => {
    const initalDecks = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
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
    }
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initalDecks))
    
    return initalDecks
}

const deckResults = (results) => results === null ? dummyData() : results;

export deckResults;