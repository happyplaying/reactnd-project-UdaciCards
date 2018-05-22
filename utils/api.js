import { AsyncStorage } from 'react-native'
import { deckResults, DECK_STORAGE_KEY } from './_decks'

export fetchDecks () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(deckResults)
}

export newDeck ({ entry, key }) => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export removeDeck (key) => {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
        })
}