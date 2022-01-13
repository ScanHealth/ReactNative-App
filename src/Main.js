import {
    createAppContainer,
    createStackNavigator,
 } from 'react-navigation';
import Splash from './Splash';
import Home from './Home';
import Login from './Login';
import LoginRegister from './LoginRegister';

const MainNavigator = createStackNavigator({
    Splash: { screen: Splash },
    Home: { screen: Home },
    LoginRegister: { screen: LoginRegister},
    Login: { screen: Login },
}, {
    headerMode: 'none',
    navigationOptions:{
        headerVisible: false,
    }
});

export default createAppContainer(
    MainNavigator
);