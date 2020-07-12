import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Easing,
} from 'react-native';
import {connect} from 'react-redux';

import Svg, {Circle} from 'react-native-svg';

import {loginUser} from '../store/userReducer/actions';
import Input from '../Components/Input';
import images from '../images';

const {width, height} = Dimensions.get('window');

const Login2Screen = (props) => {
  const isFirstRender = useRef(true);
  const [isLogin, setIsLogin] = useState(true);
  const [imageUp] = useState(new Animated.Value(100));
  const fadeIn = useRef(new Animated.Value(0)).current;
  const fadeInSlow = useRef(new Animated.Value(0)).current;
  const fadeOut = useRef(new Animated.Value(1)).current;
  const buttonDown = useRef(new Animated.Value(0)).current;
  const [spinValue] = useState(new Animated.Value(0));

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const offset = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, isLogin ? -270 : -320],
  });

  const imageUpAnimation = () => {
    Animated.parallel([
      Animated.timing(imageUp, {
        toValue: isLogin ? -270 : -320,
        easing: Easing.linear,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInSlow, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(buttonDown, {
        toValue: 200,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeOut, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      imageUpAnimation();
    }
  }, [isLogin]);
  useEffect(() => {
    isFirstRender.current = false; // toggle flag after first render/mounting
  }, []);

  const imageDownAnimation = () => {
    Animated.parallel([
      Animated.timing(imageUp, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeInSlow, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(spinValue, {
        toValue: 0,
        easing: Easing.linear,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonDown, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(fadeOut, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center'}}
      // behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      behavior="height">
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'flex-end',
          zIndex: 1,
        }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 2,
              width: '100%',
              transform: [{translateY: imageUp}],
            },
          ]}>
          <Svg height={height + 90} width={width}>
            <Circle fill="#F3904F" r={height + 90} cx={width / 2} />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#F3904F',
                height: height + 100,
                top: -80,
              }}>
              <Image source={images.logo} />
            </View>
          </Svg>
        </Animated.View>
        <TouchableWithoutFeedback
          style={{borderColor: 'red', borderWidth: 2}}
          onPress={() => {
            setIsLogin(isLogin);
            imageDownAnimation();
          }}>
          <Animated.View
            style={{
              height: 40,
              width: 40,
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: -20,
              left: width / 2 - 20,
              shadowOffset: {width: 2, height: 2},
              shadowColor: 'black',
              shadowOpacity: 0.2,
              elevation: 5,
              zIndex: 4,
              opacity: fadeInSlow,
              transform: [{translateY: offset}, {rotate: spin}],
            }}>
            <Animated.Text style={{transform: [{rotate: spin}]}}>
              X
            </Animated.Text>
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            {
              position: 'absolute',
              zIndex: 3,
              transform: [{translateY: buttonDown}],
              opacity: fadeOut,
              height: 200,
              width: '100%',
            },
          ]}>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsLogin(true);
              imageUpAnimation();
            }}>
            <View
              style={{
                ...styles.button,
                bottom: 20,
                // opacity: buttonOpacity,
                // transf orm: [{translateY: buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              setIsLogin(false);
              imageUpAnimation();
            }}>
            <View
              style={{
                ...styles.button,
                backgroundColor: '#3B4371',
                // opacity: buttonOpacity,
                // transf orm: [{translateY: buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                SIGN UP
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
        {isLogin && (
          <Animated.View
            style={{
              zIndex: 1,
              bottom: 25,
            }}>
            <Input placeholder="EMAIL" />
            <Input placeholder="PASSWORD" />
            <TouchableWithoutFeedback onPress={props.login}>
              <View
                style={{
                  ...styles.button,
                  position: 'relative',
                  // opacity: buttonOpacity,
                  // transf orm: [{translateY: buttonY}],
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
        {!isLogin && (
          <Animated.View
            style={{
              zIndex: 1,
              bottom: 25,
            }}>
            <Input placeholder="EMAIL" />
            <Input placeholder="CONFIRM PASSWORD" />
            <Input placeholder="PASSWORD" />
            <TouchableWithoutFeedback onPress={props.login}>
              <View
                style={{
                  ...styles.button,
                  position: 'relative',
                  // opacity: buttonOpacity,
                  // transf orm: [{translateY: buttonY}],
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>SIGN UP</Text>
              </View>
            </TouchableWithoutFeedback>
          </Animated.View>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login2Screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    height: 70,
    borderRadius: 35,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
    elevation: 5,
    shadowOpacity: 0.2,
    position: 'absolute',
    // bottom: 10,
    width: '80%',
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
