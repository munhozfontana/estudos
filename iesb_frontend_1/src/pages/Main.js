import React, { Component } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { tryInsertTodo, tryListAllTodo ,tryDeleteTodo } from "../actions";
import { Button } from '../components/Button';
import Card from '../components/Card';
import Input from '../components/Input';



class Main extends Component {


  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      apelido: '',
      idade: '',
      todo: '',
      listaTodos: []
    }
  }

  componentDidMount() {
    this.listarCards();
  }

  listarCards() {
    this.props.tryListAllTodo()
    .then(list => {
      this.setState({
        listaTodos: list
      })
    })
    .catch(error => {
      console.log('error insert');
    });
  }

  deleteCard(id) {
    this.props.tryDeleteTodo(id)
      .then(()=>{
        this.listarCards();
      })
  }

  save() {
    this.props.tryInsertTodo(this.state)
      .then(insert => {
        this.listarCards();
      })
      .catch(error => {
        console.log('error insert');
      });
  }

  render() {

    return (
      <View style={[styles.container]}>

        {/* <View style={[styles.row, { flexDirection: 'row' }]}>
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

          <View style={{ flex: 6 }}>
            <Input value={value => this.setState({ idade: value })} placeholder='Idade' />
          </View>

        </View>

        <View style={[styles.row, { flexDirection: 'row' }]}>
          <View style={{ flex: 1 }}>
            <Button click={() => this.save()} />
          </View>
        </View>


        <FlatList
          data={this.state.listaTodos}
          renderItem={(item) => (
            <Card deleteCard={(id)=> this.deleteCard(id)} card={item} />
          )}
          showsVerticalScrollIndicator={true}
          keyExtractor={item => item.id}
          numColumns={2}
          ListHeaderComponent={props => (<View style={styles.marginTop} />)}
          ListFooterComponent={props => (<View style={styles.marginBottom} />)}
        /> */}

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
const mapStateToProps = (state) => {
  return {
    open: state,
  }
};



export default connect( null , { tryListAllTodo , tryInsertTodo, tryDeleteTodo })(Main)
