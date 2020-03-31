import React, { Component } from "react";
import { View, TextInput, Button } from "react-native";
import io from 'socket.io-client';

const styles = StyleSheet.create({
  button: { 
    margin: 5, 
    padding: 5 
  }
});

class Send extends Component {
  state = {
    receiverDeviceId: "",
    message: ""
  };
  componentDidMount(){
    console.log('sender client')
    this.socket = io('http://61000127.ngrok.io');
    this.socket.on("connect", () => {
      console.log("sender connected: ",this.socket.connected);
    });
  }
  onDeviceIdChange = value => {
    this.setState({ 
      receiverDeviceId: value 
    });
  };
  onMessageChange = value => {
    this.setState({ 
      message: value 
    });
  };
  sendMessage =()=>{
    const { deviceId:senderDeviceId, publicKey:senderPublicKey, signature } = this.props.route.params;
    const messageData = {senderDeviceId,signature,senderPublicKey,receiverDeviceId:this.state.receiverDeviceId,message:this.state.message}
    this.socket.emit("send data", messageData);
  }
  render() {
    return (
      <View>
        <View>
          <TextInput
            autoCapitalize="none"
            placeholder="Receivers Device Id"
            value={this.state.receiverDeviceId}
            onChangeText={text => {
              this.onDeviceIdChange(text);
            }}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Message"
            value={this.state.message}
            onChangeText={text => {
              this.onMessageChange(text);
            }}
          />
        </View>
        <View style={styles.button}>
          <Button title="Send" onPress={()=>this.sendMessage()} />
        </View>
      </View>
    );
  }
}

export default Send;