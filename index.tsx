import * as React from 'react'
import {
  Text,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  PixelRatio,
  ViewStyle,
  TextStyle,
} from 'react-native'
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

export default class PressMeButton extends React.Component<
  PressMeButtonProps,
  PressMeButtonState
> {
  state = {
    isPressed: false,
  }

  static defaultProps: Partial<PressMeButtonProps> = {
    onPressIn: () => {},
    onPressOut: () => {},
    style: {},
    backgroundColor: 'transparent',
    shadowStyle: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 10,
    },
    frontStyle: {},

    cornerRadius: 2,

    edgeHeight: 10,
    darkenEdgeBy: 0.3,
  }

  onPressIn = () => {
    if (this.props.disabled) {
      return
    }
    this.setState({ isPressed: true })
    this.props.onPressIn!()
  }

  onPressOut = () => {
    if (this.props.disabled) {
      return
    }
    this.setState({ isPressed: false })
    this.props.onPressOut!()
  }

  onPress = () => !this.props.disabled && this.props.onPress()

  render() {
    const { disabled } = this.props

    const edgeColor =
      this.props.edgeColor ||
      color(this.props.buttonColor)
        .darken(this.props.darkenEdgeBy)
        .toString()

    const containerViewStyle: any = {
      height: this.props.height + this.props.edgeHeight!,
      backgroundColor: this.props.backgroundColor,
      borderRadius: this.props.cornerRadius,
    }

    if (this.props.width !== undefined) {
      containerViewStyle.width = this.props.width
    }

    return (
      <TouchableWithoutFeedback
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        {/* Container */}
        <View
          style={[
            !this.state.isPressed && !disabled && this.props.shadowStyle,
            containerViewStyle,
            this.props.style,
          ]}
        >
          {/* Edge */}
          {!this.state.isPressed &&
            !disabled && (
              <View
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: this.props.cornerRadius! + this.props.edgeHeight!,
                  backgroundColor: edgeColor,
                  borderBottomLeftRadius: this.props.cornerRadius,
                  borderBottomRightRadius: this.props.cornerRadius,
                }}
              />
            )}
          {/* Front */}
          <View
            style={[
              {
                marginTop:
                  disabled || this.state.isPressed ? this.props.edgeHeight : 0,
                marginBottom:
                  disabled || this.state.isPressed ? 0 : this.props.edgeHeight,
                backgroundColor: this.props.buttonColor,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: this.props.cornerRadius,
              },
              this.props.frontStyle,
            ]}
          >
            {this.props.children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
