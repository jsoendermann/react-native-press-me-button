import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PressMeButton from 'react-native-press-me-button'

export default class PressMeExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PressMeButton
          title="Press me!"
          style={{ height: 50, width: 240 }}
          bottomRadius={3}
          pulse={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DFDFDF',
  },
})
