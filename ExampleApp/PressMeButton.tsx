import * as React from 'react'
import { View, ViewStyle, TouchableWithoutFeedback } from 'react-native'
const color = require('color')

export interface PressMeButtonProps {
  onPress: () => void
  onPressIn?: () => void
  onPressOut?: () => void

  width?: number
  height: number
  style?: ViewStyle
  buttonColor: string
  // This is the color of the background behind
  // the button. If you don't set this,
  // react native will probably throw warnings
  // at you about not being able to compute
  // shadows efficiently.
  backgroundColor?: string
  shadowStyle?: ViewStyle
  frontStyle?: ViewStyle

  cornerRadius?: number

  edgeColor?: string
  edgeHeight?: number
  darkenEdgeBy?: number

  disabled?: boolean
}

export interface PressMeButtonState {
  isPressed: boolean
}

const PressMeButton: React.FC<PressMeButtonProps> = props => {
  const [isPressed, setIsPressed] = React.useState(false)

  const {
    width,
    height,
    style,
    buttonColor,
    backgroundColor = 'transparent',
    shadowStyle = {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 10,
    },
    frontStyle,
    cornerRadius = 2,
    edgeHeight = 10,
    darkenEdgeBy = 0.3,
    disabled,
    children,
  } = props

  const onPressIn = React.useCallback(() => {
    setIsPressed(true)
    if (!disabled) {
      props.onPressIn?.()
    }
  }, [setIsPressed, disabled, props.onPressIn])

  const onPressOut = React.useCallback(() => {
    setIsPressed(false)
    if (!disabled) {
      props.onPressOut?.()
    }
  }, [setIsPressed, disabled, props.onPressOut])

  const onPress = React.useCallback(() => {
    if (!disabled) {
      props.onPress()
    }
  }, [disabled, props.onPress])

  const edgeColor =
    props.edgeColor || color(buttonColor).darken(darkenEdgeBy).toString()

  const containerViewStyle: ViewStyle = {
    height: height + edgeHeight!,
    backgroundColor: backgroundColor,
    borderRadius: cornerRadius,
  }

  if (width !== undefined) {
    containerViewStyle.width = width
  }

  const isDepressed = isPressed || disabled

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
    >
      {/* Container */}
      <View style={[!isDepressed && shadowStyle, containerViewStyle, style]}>
        {/* Spacer that makes the button front move down when depressed */}
        {!isDepressed && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: cornerRadius! + edgeHeight!,
              backgroundColor: edgeColor,
              borderBottomLeftRadius: cornerRadius,
              borderBottomRightRadius: cornerRadius,
            }}
          />
        )}
        {/* Front */}
        <View
          style={[
            {
              marginTop: isDepressed ? edgeHeight : 0,
              marginBottom: isDepressed ? 0 : edgeHeight,
              backgroundColor: buttonColor,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: cornerRadius,
            },
            frontStyle,
          ]}
        >
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default PressMeButton
