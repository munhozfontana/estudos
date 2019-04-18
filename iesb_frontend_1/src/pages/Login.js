import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { tryLoginTodo } from "../actions";
import Button from '../components/Button';
import Input from '../components/Input';

export class Login extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  login() {
    this.props.tryLoginTodo(this.state)
      .then(login => {
        console.log(login, `aqui`);

        // this.props.navigation.navigate('Main')
      })
      .catch(error => {
        console.log('Login error');
      });
  }

  cancelar() {

  }


  render() {
    return (
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/work.jpg')} >
        <View style={[styles.container]}>

          <View style={{ flex: 0.5, justifyContent: `space-around` }}></View>

          <View style={{ flex: 1, justifyContent: `space-around` }}>
            <Input width={250} value={value => this.setState({ login: value })} placeholder='Login' />
            <Input width={250} value={value => this.setState({ senha: value })} placeholder='Senha' />

            <Button height={44} width={250} label="Login" click={() => this.login()}></Button>
            <Button height={44} width={250} label="Cancel" click={() => this.cancelar()}></Button>
          </View>

          <View style={{ flex: 0.2, justifyContent: `space-around` }}></View>

        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  }


})


export default connect(null, { tryLoginTodo })(Login)
