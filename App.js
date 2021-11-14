import React from 'react';
//import { StatusBar } from 'expo-status-bar';
import StatusBar from '@react-native-community/status-bar';
import * as eva from '@eva-design/eva';
import {RenderTabNavigator} from './src/navigators/index'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
console.disableYellowBox = true;
const App = () => {

    return (
        <SafeAreaProvider>
            <StatusBar barStyle="light-content" />
            <IconRegistry icons={EvaIconsPack} />
                    <ApplicationProvider {...eva} theme={{ ...eva.light }}>
                        <RenderTabNavigator />
                    </ApplicationProvider>
        </SafeAreaProvider>
    );
};


export default App;
