import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import PressMeButton from './PressMeButton'

console.log(PressMeButton)

export default function App() {
  const [disabled, setDisabled] = React.useState(false)

  return (
    <View style={styles.container}>
      <PressMeButton
        onPress={() => {
          setDisabled(true)
          setTimeout(() => setDisabled(false), 1000)
        }}
        height={40}
        buttonColor='#8c231a'
        cornerRadius={10}
        disabled={disabled}
      >
        <Text style={styles.text}>Press me!</Text>
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
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
})
