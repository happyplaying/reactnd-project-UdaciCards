import React from 'react'
import { View, StatusBar,Text} from 'react-native'
import NewDeck from './components/NewDeck'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Decks from './components/Decks'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { purple, white, black } from './utils/colors'
import { Constants } from 'expo'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

const Tabs = createMaterialTopTabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
        },
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
        },
    },
}, {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: purple,
        style: {
            height: 50,
            backgroundColor: white,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigator = createStackNavigator({
    Home: {
        screen: Tabs,
    },
    DeckDetails:{
        screen: DeckDetails,
        navigationOptions:{
            headerTintColor: white,
            headerStyle:{
                backgroundColor: black
            },
            headerBackTitle: null,
            title: "Deck Details"
        }
    },
    AddCard:{
        screen: AddCard,
        navigationOptions:{
            headerTintColor: white,
            headerStyle:{
                backgroundColor: black
            },
            headerBackTitle: null,
            title: "Add Card"
        }
    },
    Quiz:{
        screen: Quiz,
        navigationOptions:{
            headerTintColor: white,
            headerStyle:{
                backgroundColor: black
            },
            headerBackTitle: null,
            title: "Quiz"
        }
    }
})

export default class App extends React.Component {
    render() {
        return (
            <Provider store={createStore(reducer)}>
                <View style={{flex: 1}}>
                    <View style={{ backgroundColor:black, height: Constants.statusBarHeight }}>
                        <StatusBar
                            backgroundColor={black}
                            barStyle="light-content"
                        />
                    </View>
                    <MainNavigator />
                </View>
            </Provider>
        )
    }
}