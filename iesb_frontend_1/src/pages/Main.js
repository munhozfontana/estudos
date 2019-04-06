import React, { Component } from 'react';
import { View, StyleSheet, Dimensions,Text ,FlatList } from 'react-native';
import { connect } from 'react-redux';
import Input from '../components/Input';
import { Button } from '../components/Button';
import Card from '../components/Card';
import colors from '../utils/utils';


export class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: 'teste'
    }
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
            <Input placeholder='Primeiro Nome' />
          </View>
          <View style={{ flex: 6 }}>
            <Input placeholder='Apelidoo' />
          </View>
        </View>

        <View style={[styles.row, { flexDirection: 'row' }]}>
          <View style={{ flex: 12 }}>
            <Input placeholder='O que pretende salvar?' />
          </View>
          <View style={{ flex: 7 }}>
            <Button />
          </View>
        </View>

        <View style={[styles.container, flexDirection = 'row']}>
				<FlatList
					data={dados.users}
					renderItem={(item) => (
                <Card  card={item} />
					)}
					keyExtractor={item => item.email}
					numColumns={2}
					ListHeaderComponent={props => (<View style={styles.marginTop} />)}
					ListFooterComponent={props => (<View style={styles.marginBottom} />)}
				/>
        </View>




      </View>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

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


export default connect(mapStateToProps, mapDispatchToProps)(Main)
