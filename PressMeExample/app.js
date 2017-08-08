import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PressMeButton from 'react-native-press-me-button'

export default class PressMeExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PressMeButton
          style={{ height: 50, width: 240 }}
          onPress={() => console.log('Pressed!')}
          pulseDuration={1000}
          pulseMagnitude={1.05}
          bottomRadius={2}
          backgroundColor="blue"
          titleStyle={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}
          title="Press me!"
          edgeHeight={10}
          pulse
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
