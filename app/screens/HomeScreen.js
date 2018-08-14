// **
// * Sample React Native App
// * https://github.com/facebook/react-native
// *
// * @format
// * @flow
// */
import React, {Component} from 'react';
import {Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import Reactotron from 'reactotron-react-native'
var fastLoremIpsum = require('fast-lorem-ipsum');
const SH = Dimensions.get('window').height;
const SW = Dimensions.get('window').width;


theList = [];
//perf
const _scrollY = new Animated.Value(0);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
let stringsArr = [
    'hello',
    'cake',
    'sugar',
    'damm',
    'this',
    'Hell yea'
];
type Props = {};
export default class HomeScreen extends Component<Props> {
    state = {
        list: [],
        text: '',
        imageOpacity: 1,
        imageScale: 1.0,
    }
    _keyExtractor = (item, index) => index + '';
    componentWillMount() {
        this.getPictures()
        // this.setState({list: theList})
    }
    getPictures() {
        // console.warn(words)
        let cardList = [{empty: true}]
        for (let i = 0; i < 5; i++) {
            let name = `item${i}`;
            let image = 'https://source.unsplash.com/random/750*800';
            let rnd = Math.floor(Math.random() * 50);
            let randomData = fastLoremIpsum(rnd, 'c');
            cardList.push({name: name, image: image, desc: randomData})
        }
        cardList.push({empty: true});
        // Reactotron.log('hello rendering world');
        // Reactotron.log({numbers: cardList, boolean: false, nested: {here: 'we go'}})
        // console.log('cardList', cardList);
        // let text = LoremIpsum();
        this.setState({
            list: cardList
        })
    }
    _renderItem(item) {
        if (item.item.empty) {
            return (
                <View style={{height: SW * 1.05, width: SW * 0.8}}>
                </View>
            )
        }
        return (
            <TouchableOpacity style={styles.itemContainer}>
                <Text style={[styles.welcome, {flex: 1}]}>{item.item.desc}</Text>
                <View style={{flex: 2}}>
                    <Image source={{uri: item.item.image}}
                           style={{width: '100%', height: '100%'}}/>
                </View>
            </TouchableOpacity>
        )
    }
    handleScroll(event) {
        let yPosition = event.nativeEvent.contentOffset.y;
        if (yPosition >= 0) {
            let newOpacity = 1.0 - (yPosition / 250.0);
            if (newOpacity < 0) newOpacity = 0;
            this.setState({
                imageOpacity: newOpacity,
                imageScale: 1.0
            })
        } else {
            let newScale = 1.0 + 0.4 * (-yPosition / 200.0);
            if (newScale > 1.4) newScale = 1.4;
            this.setState({
                imageOpacity: 1.0,
                imageScale: newScale
            })
        }
        Reactotron.log({event: yPosition})
    }
    render() {
        return (
            <View style={styles.container}>
                <Animated.Image source={{uri: 'https://source.unsplash.com/random/750*800'}}
                                style={[{width: SW, height: SW * 1.05, position: "absolute",
                                    backgroundColor: '#b8fa5c',
                                    opacity: _scrollY.interpolate({
                                        inputRange: [0, 250],
                                        outputRange: [1, 0]
                                    }),
                                    transform : [{
                                        scale: _scrollY.interpolate({
                                            inputRange: [-200, 0, 1],
                                            outputRange: [1.4, 1, 1]
                                        })
                                    }]
                                }]}/>
                <AnimatedFlatList
                    scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: _scrollY}}}],
                        {useNativeDriver: true} // <-- Add this
                    )}
                    // onScroll={this.handleScroll.bind(this)}
                    data={this.state.list}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#232323'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    itemContainer: {
        height: SH * 0.3,
        width: SW * 0.8,
        marginLeft: SW * 0.1,
        backgroundColor: '#FAFAFA',
        opacity: 0.9,
        marginTop: SH * 0.03,
        zIndex: 2,
        borderWidth: 1,
        borderColor: '#4f4f4f',
        borderRadius: 5,
    }
});
