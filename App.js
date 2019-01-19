/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';

import Navigator from './app/navigation/navigator';

class App extends Component<Props> {
    render() {
        return (
                <View style={{flex: 1}}>
                    <Navigator/>
                </View>
        );
    }
}

export default App
