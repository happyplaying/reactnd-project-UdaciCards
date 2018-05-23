import { ADD_DECK, ADD_CARD } from '../actions'

const decks = (state = {}, action) => {
    switch (action.type) {
        case ADD_DECK :
            return {
                ...state,
                ...action.decks,
            }
        case ADD_CARD :
            //copy the current state
            let newState = {...state};
            //add new card to the state
            for(let i in newState){
                if(i === action.title){
                    newState[i].questions.push(action.question)
                }
            }
            return newState
        default :
            return state
    }
}
export default decks