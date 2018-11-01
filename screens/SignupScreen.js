import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as firebase from 'firebase';

export default class Signup extends Component {

  state = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  // checks if logged in before
  componentDidMount() {
    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if(value !== null){
      //youre logged in so
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const { container,
            wrapper,
            header,
            textInput,
            btn,
            btnText
    } = styles;

    const { firstname,
            lastname,
            email,
            password
    } = this.state;

    return (

      <KeyboardAvoidingView behavior='padding' style={wrapper} enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={container}>
          <Text style={header}>SIGN UP</Text>

          <TextInput style={textInput} placeholder='First Name'
            onChangeText={(firstname) => this.setState({firstname}) }
            underlineColorAndroid='transparent'
            // onBlur={() => alert("blurred")}
          />

          <TextInput style={textInput} placeholder='Last Name'
            onChangeText={(lastname) => this.setState({lastname}) }
            underlineColorAndroid='transparent'
          />

          <TextInput style={textInput} placeholder='Email'
            onChangeText={(email) => this.setState({email}) }
            underlineColorAndroid='transparent'
          />

          <TextInput style={textInput} placeholder='Password'
            onChangeText={(password) => this.setState({password}) }
            underlineColorAndroid='transparent'
          />

          <TouchableOpacity
            style={btn}
            onPress={
              () => this.signmeup(firstname + ' ' + lastname, email, password)
          }>
            <Text style={btnText}> Sign up </Text>
          </TouchableOpacity>

        </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

    );
  }

  signmeup = (username, email, password) => {
    const { navigate } = this.props.navigation;
    try{
      if(this.state.password.length<6){
        alert("password atleast length 6")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(
        (user) => {
          // console.log(user);
          user.user.updateProfile( {displayName: username} )
          .then(
            ()      => { navigate('Welcome') }
          ).catch(
            (error) => { alert(error.toString()) }
          )
        }
      ).catch(
        (error) => {
          alert(error.toString());
        }
      )
    }catch(error){
      console.log(error.toString());
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#2896d3',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    fontSize:24,
    marginBottom:60,
    color: '#000',
    // color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff'
  },
  btn: {
    alignSelf: 'stretch',
    // backgroundColor: '#01c853',
    backgroundColor: '#000',
    // color: '#fff',
    padding: 20,
    alignItems: 'center',
    margin: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});