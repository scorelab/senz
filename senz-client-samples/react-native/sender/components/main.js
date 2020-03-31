import React, {Component} from 'react'
import {View, TextInput, Button} from 'react-native';

const styles = StyleSheet.create({
  button: { 
    margin: 5, 
    padding: 5 
  }
});

class Main extends Component {
  state = {
    deviceId: "",
    signature: "",
    publicKey: ""
  };
  onDeviceIdChange = value => {
    this.setState({ deviceId: value });
  };
  onSignatureChange = value => {
    this.setState({ signature: value });
  };
  onPublicKeyChange = value => {
    this.setState({ publicKey: value });
  };
  render() {
    return (
      <View>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="Sender device Id"
            value={this.state.deviceId}
            onChangeText={text => {
              this.onDeviceIdChange(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Sender public key"
            value={this.state.publicKey}
            onChangeText={text => {
              this.onPublicKeyChange(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="signature"
            value={this.state.signature}
            onChangeText={text => {
              this.onSignatureChange(text);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Send"
            onPress={() =>
              this.props.navigation.navigate("Send", {deviceId: this.state.deviceId,signature: this.state.signature,publicKey: this.state.publicKey})
            }
          />
        </View>
      </View>
    );
  }
}

export default Main;