import React from 'react'
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  PixelRatio,
} from 'react-native'
import PropTypes from 'prop-types'
import color from 'color'

export default class PressMeButton extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    pulseDuration: PropTypes.number,
    pulseMagnitude: PropTypes.number,
    bottomRadius: PropTypes.number,
    backgroundColor: PropTypes.string,
    titleStyle: PropTypes.object,
    title: PropTypes.string,
    edgeHeight: PropTypes.number,
    pulse: PropTypes.bool,
    shadowStyle: PropTypes.object,
  }

  static defaultProps = {
    style: {},
    onPress: () => {},
    pulseDuration: 1000,
    pulseMagnitude: 1.05,
    bottomRadius: 2,
    backgroundColor: 'blue',
    titleStyle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    edgeHeight: 10,
    pulse: true,
    shadowStyle: {
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
      elevation: 10,
    },
  }

  state = { isPressed: false, buttonPulse: new Animated.Value(0) }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.buttonPulse, {
          toValue: 1,
          duration: this.props.pulseDuration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(this.state.buttonPulse, {
          toValue: 0,
          duration: this.props.pulseDuration / 2,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }

  onPressIn = () => this.setState({ isPressed: true })
  onPressOut = () => this.setState({ isPressed: false })

  render() {
    const buttonScale = this.state.buttonPulse.interpolate({
      inputRange: [0, 1],
      outputRange: [1, this.props.pulseMagnitude],
    })

    return (
      <TouchableWithoutFeedback
        onPress={this.props.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View
          style={[
            !this.state.isPressed && this.props.shadowStyle,
            this.props.pulse && { transform: [{ scale: buttonScale }] },
            {
              borderBottomLeftRadius: this.props.bottomRadius,
              borderBottomRightRadius: this.props.bottomRadius,
            },
            this.props.style,
          ]}
        >
          <View
            style={{
              marginTop: this.state.isPressed ? this.props.edgeHeight : 0,
              backgroundColor: this.props.backgroundColor,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopWidth: 1 / PixelRatio.get(),
              borderLeftWidth: 1 / PixelRatio.get(),
              borderRightWidth: 1 / PixelRatio.get(),
              borderColor: color(this.props.backgroundColor)
                .darken(0.15)
                .toString(),
            }}
          >
            <Text style={this.props.titleStyle}>
              {this.props.title}
            </Text>
          </View>
          {!this.state.isPressed &&
            <View
              style={{
                backgroundColor: color(this.props.backgroundColor)
                  .darken(0.3)
                  .toString(),
                flexGrow: 0,
                height: this.props.edgeHeight,
                borderBottomLeftRadius: this.props.bottomRadius,
                borderBottomRightRadius: this.props.bottomRadius,
              }}
            />}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}
