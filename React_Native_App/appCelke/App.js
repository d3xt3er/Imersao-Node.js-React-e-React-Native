import React, { Component } from 'react';
import { FlatList, Text, View } from 'react-native';
import api from './services/api';

export default class HelloWorldApp extends Component {

  state = {
    usuarios: [],
  }

  async componentDidMount(){
    const response = await api.get();
  
    console.log(response.data);

    this.setState({
      usuarios: response.data,
    })
  }

  render() {
    const { usuarios } = this.state;
    {console.log(usuarios);}
    return (
      <View style={{flex: 1, paddingTop:20}}>
        <Text>Usuarios</Text>
        <FlatList
          data={usuarios}
          renderItem={({item}) => (
           <>
              <Text>Nome:{item.nome}</Text>
              <Text>Email:{item.email}</Text>
           </>
          )}
          keyExtractor={usuario =>String(usuario._id)}
        />
      </View>
    );
  }
}
