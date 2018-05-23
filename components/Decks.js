import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { getDecks } from '../utils/api'
import {AppLoading} from 'expo'
import {white} from '../utils/colors'
import {connect} from 'react-redux'
import {addDeck} from '../actions'
import Deck from './Deck'

class Decks extends Component {
    state = {
        ready: false,
    }
    componentDidMount () {
        getDecks().then((decks) => {
            this.props.dispatch(addDeck(decks));
            this.setState({
                ready: true
            })
        })
    }
    onPressItem = (item) => {
        this.props.navigation.navigate('DeckDetails', {deckTitle: item.title})
    };
    render() {
        if (!this.state.ready) {
            return (<AppLoading />)
        }
        return (
            <FlatList
                style={styles.container}
                data = { Object.values(this.props.decks) }
                keyExtractor={(item) => item.title}
                renderItem = {({item}) => {
                    return (
                        <TouchableOpacity style={styles.item} onPress={() => this.onPressItem(item)}>
                            <Deck id={item.title} title={item.title} questions={item.questions} fontSize={24} />
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    },
    item: {
        backgroundColor: white,
        borderRadius: 16,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
});

const mapStateToProps = (decks) =>{
    return {decks}
}
export default connect(mapStateToProps)(Decks)

