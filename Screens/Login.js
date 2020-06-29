import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {loginUser} from '../store/userReducer/actions';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Input from '../Components/Input';
function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
});

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

const LoginScreen = (props) => {
  const [isSignup, setSignup] = useState(false);
  let buttonOpacity = new Value(1);
  const onStateChange = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 1, 0)),
          ),
        ]),
      // block([cond(eq(state, State.END)), set(buttonOpacity, 0)]),
    },
  ]);
  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 3 - 50, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  const textInputY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: Extrapolate.CLAMP,
  });
  const textInputOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  const onCloseState = event([
    {
      nativeEvent: ({state}) =>
        block([
          cond(
            eq(state, State.END),
            set(buttonOpacity, runTiming(new Clock(), 0, 1)),
          ),
        ]),
    },
  ]);

  // function onCloseState(e) {
  //   const state = e.nativeEvent.state;
  //   console.log(state);
  //   console.log(State.END);
  //   if (state == State.END) {
  //     const timing = runTiming(new Clock(), 0, 1);
  //     buttonOpacity.setValue(timing);
  //   }
  // return event([
  //   {
  //     nativeEvent: () =>
  //       block([
  //         cond(
  //           eq(state, State.END),
  //           set(buttonOpacity, runTiming(new Clock(), 0, 1)),
  //         ),
  //       ]),
  //     // block([cond(eq(state, State.END)), set(buttonOpacity, 0)]),
  //   },
  // ]);
  // }
  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center'}}
      behavior="padding">
      <View
        style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: bgY}],
            zIndex: 2,
          }}>
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../assets/bg.jpg')}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3, justifyContent: 'center', zIndex: 3}}>
          <TapGestureHandler onHandlerStateChange={onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: buttonOpacity,
                transform: [{translateY: buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          {/* <TouchableOpacity onPress={() => setSignup(true)}> */}
          <TapGestureHandler onHandlerStateChange={onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2E71DC',
                opacity: buttonOpacity,
                transform: [{translateY: buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN UP</Text>
            </Animated.View>
          </TapGestureHandler>
          {/* </TouchableOpacity> */}
          <Animated.View
            style={{
              zIndex: textInputZindex,
              opacity: textInputOpacity,
              transform: [{translateY: textInputY}],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={onCloseState}>
              <Animated.View
                style={{
                  ...styles.closeButton,
                  transform: [{rotate: concat(rotateCross, 'deg')}],
                }}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                    setSignup(false);
                  }}>
                  <View
                    style={{
                      height: 40,
                      width: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                    }}>
                    <Text>X</Text>
                  </View>
                </TouchableWithoutFeedback>
              </Animated.View>
            </TapGestureHandler>
            <Input placeholder="EMAIL" />
            <Input placeholder="PASSWORD" />
            {isSignup && <Input placeholder="CONFIRM PASSWORD" />}
            <TouchableWithoutFeedback onPress={props.login}>
              <View style={styles.button}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

mapStateToProps = (state) => {
  return {
    hasToken: state.user.hasToken,
  };
};

mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(loginUser());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
