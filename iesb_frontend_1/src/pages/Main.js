import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';
import { insertTodo } from "../actions";


export class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      apelido: '',
      todo: ''
    }
  }

  componentDidMount() {

  }

  save() {
    console.log(this.state);
    
    //  this.props.saveTodo(this.state);
  }

  render() {

    const dados = {
      "users":
        [
          {
            "name": "Proxima Midnight",
            "email": "proxima@appdividend.com"
          },
          {
            "name": "Ebony Maw",
            "email": "ebony@appdividend.com"
          },
          {
            "name": "Ebony Maw",
            "email": "ebony@appdividend.com"
          },
          {
            "name": "Ebony Maw",
            "email": "ebony@appdividend.com"
          },
          {
            "name": "Black Dwarf",
            "email": "dwarf@appdividend.com"
          }
        ]
    }

    return (
      <View style={[styles.container]}>

        <View style={[styles.row, { flexDirection: 'row' }]}>
          <View style={{ flex: 12 }}>
            <Input value={value => this.setState({ nome: value })} placeholder='Primeiro Nome' />
          </View>
          <View style={{ flex: 6 }}>
            <Input value={value => this.setState({ apelido: value })} placeholder='Apelidoo' />
          </View>
        </View>

        <View style={[styles.row, { flexDirection: 'row' }]}>
          <View style={{ flex: 12 }}>
            <Input value={value => this.setState({ todo: value })} placeholder='O que pretende salvar?' />
          </View>
          <View style={{ flex: 7 }}>
            <Button click={() => this.save()} />
          </View>
        </View>


        <FlatList
          data={dados.users}
          renderItem={(item) => (
            <Card card={item} />
          )}
          showsVerticalScrollIndicator={true}
          keyExtractor={item => item.email}
          numColumns={2}
          ListHeaderComponent={props => (<View style={styles.marginTop} />)}
          ListFooterComponent={props => (<View style={styles.marginBottom} />)}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  row: {
    marginTop: '3%',
    marginBottom: '3%',
    height: 50
  },
  marginTop: {
    marginTop: 5,
  },
  marginBottom: {
    marginBottom: 5,
  }

})



const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
  return {
    saveTodo: todo => dispatch(insertTodo(todo))
  }

}

export default connect(null, mapDispatchToProps)(Main)
