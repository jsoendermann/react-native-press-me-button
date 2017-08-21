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
  title: string

  onPress: () => void

  width: number
  height: number
  style?: ViewStyle
  titleStyle?: TextStyle
  buttonColor: string
  // This is the color of the background behind
  // the button. If you don't set this,
  // react native will probably throw warnings
  // at you about not being able to compute
  // shadows efficiently.
  backgroundColor?: string
  shadowStyle?: ViewStyle

  cornerRadius?: number

  edgeColor?: string
  edgeHeight?: number
  darkenEdgeBy?: number
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
    style: {},
    titleStyle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    backgroundColor: 'transparent',
    shadowStyle: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 10,
    },

    cornerRadius: 2,

    edgeHeight: 10,
    darkenEdgeBy: 0.3,
  }

  onPressIn = () => this.setState({ isPressed: true })
  onPressOut = () => this.setState({ isPressed: false })

  render() {
    const edgeColor =
      this.props.edgeColor ||
      color(this.props.buttonColor).darken(this.props.darkenEdgeBy).toString()

    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        {/* Container */}
        <View
          style={[
            !this.state.isPressed && this.props.shadowStyle,
            {
              width: this.props.width,
              height: this.props.height + this.props.edgeHeight!,
              backgroundColor: this.props.backgroundColor,
              borderRadius: this.props.cornerRadius,
            },
            this.props.style,
          ]}
        >
          {/* Edge */}
          {!this.state.isPressed &&
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
            />}
          {/* Front */}
          <View
            style={{
              marginTop: this.state.isPressed ? this.props.edgeHeight : 0,
              marginBottom: this.state.isPressed ? 0 : this.props.edgeHeight,
              backgroundColor: this.props.buttonColor,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: this.props.cornerRadius,
            }}
          >
            <Text style={this.props.titleStyle}>
              {this.props.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
