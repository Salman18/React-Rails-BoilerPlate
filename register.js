import React, { Component } from 'react';
import {
 TextInput,
 TouchableHighlight,
 //AsyncStorage,
 Text,
 View
} from 'react-native';


class Register extends Component {
  constructor() {
    super();

this.state = {
      email: '',
      name: '',
      password: '',
      password_confirmation: '',
      errors: [],
      showProgress: false,
    };
}

async onRegisterPressed() {
    try {
      let response = await fetch('https://afternoon-beyond-22141.herokuapp.com/api/users', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user: {
                                  name: this.state.name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                }
                              })
                            });
          let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let accessToken = res;
          console.log(accessToken);
          //On success we will store the access_token in the AsyncStorage
          this.storeToken(accessToken);
          this.redirect('home');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch (errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      //We will store all the errors in the array.
      let errorsArray = [];
      for (let key in formErrors) {
        //If array is bigger than one we need to split it.
        if (formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({ errors: errorsArray });
}
}
render() {
    return (
      <View style={styles.container}>
      <TextInput
       onChangeText={(text) => this.setState({ email: text })}
       style={styles.input} placeholder="Email"
       underlineColorAndroid='transparent'
      />
     <TextInput
       onChangeText={(text) => this.setState({ name: text })}
       style={styles.input} placeholder="Name"
       underlineColorAndroid='transparent'
     />
     <TextInput
       onChangeText={(text) => this.setState({ password: text })}
       style={styles.input}
       placeholder="Password"
       secureTextEntry={true}
       underlineColorAndroid='transparent'
     />
     <TextInput
       onChangeText={(text) => this.setState({ password_confirmation: text })}
       style={styles.input}
       placeholder="Confirm Password"
       secureTextEntry={true}
       underlineColorAndroid='transparent'
     />
     <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
         <Text style={styles.buttonText}>
           Register
         </Text>
      </TouchableHighlight>

      <Errors errors={this.state.errors} />
    </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
};

const styles = {
   container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    width: 350,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
};

export default Register;
