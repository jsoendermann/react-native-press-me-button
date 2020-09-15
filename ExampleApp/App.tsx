import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PressMeButton from './PressMeButton'

export default function App() {
  return (
    <View style={styles.container}>
      <PressMeButton>
        <Text>Open up App.js to start working on your app!</Text>
      </PressMeButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
