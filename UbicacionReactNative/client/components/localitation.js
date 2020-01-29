import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacityBase, TextInput } from 'react-native';

const url = "http://192.168.100.12:3000/server/ubication"

export default class Localitation extends Component {

  constructor(props){
    super(props);
    this.state = {
      nombre: 'Default'
    }
  }

  getLocalitation(){
    navigator.geolocation.getCurrentPosition((posiscion) => {
      let latitud= posiscion.coords.latitude;
      let longitud = posiscion.coords.longitude;
      var fecha = new Date();
      let data =  {
        fecha: fecha,
        ubicacion: `${latitud.toString()}, ${longitud.toString()}`,
        user: ''
      }

      const header = {
        method:'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
  
      return fetch(url,header)
      .then((response) => response.json())
      .then((responseJson) => {
        alert('Ubicacion guardada exitosamente!')
      })
      .catch((error) => {
        console.log(error)
      })
    })
  }

  handleNombre = text => {
    this.setState({ nombre: text });
  }

  render(){
    return(
      <View style={styles.container}>
        <View>
          <Text>Ingresa tu nombre</Text>
            <TextInput style={{ height: 50}} onChangeText={this.handleNombre} placeholder='Nombre'/>
        </View>
          <Button title="Ubicación" style={styles.boton} onPress={this.getLocalitation}/>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    backgroundColor: '#367698',
    color: 'white'
  }
});