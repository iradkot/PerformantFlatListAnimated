/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {observer, Provider} from "mobx-react";
import Reactotron from 'reactotron-react-native'

import Navigator from './app/navigation/navigator';

@observer
class App extends Component<Props> {

    render() {
        return (
            <Provider>
                <View style={{flex: 1}}>
                    <Navigator/>
                </View>
            </Provider>
        );
    }
}

export default App
