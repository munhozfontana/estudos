import { createAppContainer, createStackNavigator } from 'react-navigation';
import React from "react";
import Degrade from './components/Degrade';
import Main from './pages/Main';
import Login from './pages/Login';


const AppNavigator = createStackNavigator({
    'Login': {
        screen: Login,
        navigationOptions: {
            title: 'Login Todo IESB',
        }
    },
    'Main': {
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