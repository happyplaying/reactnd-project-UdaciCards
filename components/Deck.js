import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {black, gray} from '../utils/colors'

class Deck extends Component {
    render() {
        const {title, questions, bigFonts, fontSize} = this.props;
        return (
            <View style={styles.container}>
                <Text style={[ styles.title, {fontSize: fontSize}]}>{title}</Text>
                <Text style={[ styles.count, {fontSize: fontSize - 8}]}>{questions.length} cards</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        color: black,
        textAlign: 'center'
    },
    count: {
        color: gray,
        textAlign: 'center'
    }
})

export default Deck;