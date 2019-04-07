import { createAppContainer, createStackNavigator } from 'react-navigation';
import React from "react";
import Degrade from './components/Degrade';
import Main from './pages/Main';


const AppNavigator = createStackNavigator({
    'main': {
        screen: Main,
        navigationOptions: {
            title: 'Todo IESB',
        }
    },
}, {
        defaultNavigationOptions: {
            title: "Series!",
            headerTintColor: 'white',
            headerBackground: <Degrade  />,
            headerTitleStyle: {
                color: 'white',
                fontSize: 30,
            }
        }
    });

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;