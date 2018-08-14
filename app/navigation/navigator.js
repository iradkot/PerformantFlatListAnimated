import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions';
import HomeScreen from '../screens/HomeScreen';



const LogoImage = (props) => (
    <Image source={require("../../assets/gradient_circle.png")} style={props.style}/>
);

class Screen1 extends React.Component {
    render() {

        return (
            <View style={styles.container}>
                <Transition shared={'logo'}>
                <LogoImage style={styles.largeLogo}/>
            </Transition>
                <Text style={styles.paragraph}>
                    Welcome to this fantastic app!
                </Text>
                <Button title="Next" onPress={() => this.props.navigation.navigate("screen2")} />
            </View>
        );
    }
}

class Screen2 extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Transition shared={'logo'}>
                <LogoImage style={styles.smallLogo}/>
            </Transition>
                <Text style={styles.paragraph}>
                    <Text style={{fontWeight:'normal'}}>
                        Now you should have a basic understanding of how this app works.
                        Please sign up and take part in this fantastic user experience!
                    </Text>
                </Text>
                <Text style={styles.paragraph}>
                    This is the last page of the onboarding.
                </Text>
                <Button title="Back" onPress={() => this.props.navigation.navigate('HomeScreen')} />
            </View>
        );
    }
}
const FLNavigator = FluidNavigator({
    screen1: {screen: Screen1},
    screen2: {screen: Screen2}
});


export default Navigator = createStackNavigator({
    FLNavigator: {
        screen: FLNavigator,
    },
    // For each screen that you can navigate to, create a new entry like this:
    HomeScreen: {
        screen: HomeScreen,

    },
});




const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#ecf0f1',
    },
    largeLogo: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    smallLogo: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    paragraph: {
        margin: 24,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
