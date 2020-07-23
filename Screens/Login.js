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
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';

// import Svg, {Circle} from 'react-native-svg';
import Svg, {Circle, ClipPath} from 'react-native-svg';
import Modal from 'react-native-modal';

import {loginUser} from '../store/userReducer/actions';
import Input from '../Components/Input';
import images from '../images';

import {
  confirmSignUpCognito,
  signUpCognito,
  resendConfirmationCodeCognito,
  signInCognito,
} from '../utils/aws-cognito';

const {width, height} = Dimensions.get('window');

const Login2Screen = (props) => {
  const isFirstRender = useRef(true);
  const [isLogin, setIsLogin] = useState(true);
  const [imageUp] = useState(new Animated.Value(100));
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [isSignUpError, setIsSignUpError] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  // errorIndex denotes the error field 0 - email, 1- password, 2 - confirm password
  const [errorIndex, setErrorIndex] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [signUpVerification, setSignUpVerification] = useState('');
  const [isModalError, setIsModalError] = useState(false);
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
  handleSignUp = (email, password) => {
    if (signUpEmail === '') {
      setSignUpError('Email cannot be empty');
      setIsSignUpError(true);
      setErrorIndex(0);
      return;
    }
    if (signUpPassword === '') {
      setSignUpError('Password cannot be empty');
      setIsSignUpError(true);
      setErrorIndex(1);
      return;
    }
    if (signUpConfirmPassword === '') {
      setSignUpError('Confirm Password cannot be empty');
      setIsSignUpError(true);
      setErrorIndex(2);
      return;
    }
    if (signUpPassword !== signUpConfirmPassword) {
      setSignUpError('Passwords do not match');
      setIsSignUpError(true);
      setErrorIndex(2);
      return;
    }
    signUpCognito(email, password).then((reply) => {
      if (reply.error) {
        console.log('error: ' + reply.error.message);
        setIsSignUpError(true);
        if (reply.error.message.includes('must have length greater than')) {
          setErrorIndex(1);
          setSignUpError('Password should be longer than 8 chars.');
        } else if (
          reply.error.message.includes('must have uppercase characters')
        ) {
          setErrorIndex(1);
          setSignUpError(
            'Password should include at least one capital letter.',
          );
        } else if (
          reply.error.message.includes('must have numeric characters')
        ) {
          setErrorIndex(1);
          setSignUpError(
            'Password should include at least one numeric character.',
          );
        } else if (
          reply.error.message.includes('Username should be an email')
        ) {
          setErrorIndex(0);
          setSignUpError('Invalid email');
        } else if (reply.error.message.includes('Password not long enough')) {
          setErrorIndex(1);
          setSignUpError('Password is not long enough.');
        } else if (
          reply.error.message.includes(
            'An account with the given email already exists',
          )
        ) {
          setSignUpError('');
          setIsSignUpError(false);
          setErrorIndex(0);
          setIsModalVisible(true);
        }
      } else {
        setSignUpError('');
        setIsSignUpError(false);
        setErrorIndex(-1);
        setIsModalVisible(true);
      }
    });
  };

  handleSignUpConfirm = () => {
    if (signUpVerification === '') {
      setIsModalError(true);
      setSignUpError('Empty verification code');
    } else {
      confirmSignUpCognito(signUpEmail, signUpVerification).then((reply) => {
        if (reply.error) {
          console.log(reply.error.message);
          if (reply.error.message.includes('please request a code again.')) {
            console.log('invalid code');
            setIsModalError(true);
            setSignUpError('Please request a new auth code.');
          } else if (
            reply.error.message.includes('Invalid verification code provided')
          ) {
            setIsModalError(true);
            setSignUpError('Invalid code, please try again');
          } else if (
            reply.error.message.includes('Current status is CONFIRMED')
          ) {
            setIsModalError(true);
            setSignUpError('User already exists');
          }
        } else {
          console.log(reply);
          setIsModalError(false);
          setSignUpError('');
          props.login();
        }
      });
    }
  };

  handleNewSignUpCodeRequest = () => {
    resendConfirmationCodeCognito(signUpEmail).then((reply) => {
      console.log(reply);
      setIsModalError(false);
      setSignUpError('');
    });
  };

  handleSignIn = () => {
    console.log('SIGN IN');
    if (signInEmail === '') {
      setErrorIndex(0);
      setSignInError('Email cannot be empty');
      return;
    }
    if (signInPassword === '') {
      console.log('password empty');
      setErrorIndex(1);
      setSignInError('Password cannot be empty');
      return;
    }
    signInCognito(signInEmail, signInPassword).then((reply) => {
      if (reply.error) {
        if (reply.error.message.includes('Incorrect username or password')) {
          setErrorIndex(0);
          setSignInError('Incorrect username or password');
        }
      } else if (reply.success) {
        props.login();
      }
    });
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, justifyContent: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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
            // Keyboard.dismiss();
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
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <Input
              onChange={(text) => setSignInEmail(text)}
              placeholder="EMAIL"
              isError={errorIndex === 0}
              errorText={errorIndex === 0 ? signInError : undefined}
            />
            <Input
              onChange={(text) => setSignInPassword(text)}
              placeholder="PASSWORD"
              isError={errorIndex === 1}
              errorText={errorIndex === 1 ? signInError : undefined}
            />
            <TouchableWithoutFeedback onPress={handleSignIn}>
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
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
            }}>
            <Input
              placeholder="EMAIL"
              // value={signUpEmail}
              onChange={(text) => setSignUpEmail(text)}
              isError={errorIndex === 0 ? isSignUpError : undefined}
              errorText={errorIndex === 0 ? signUpError : undefined}
            />
            <Input
              placeholder="PASSWORD"
              onChange={(text) => setSignUpPassword(text)}
              isError={errorIndex === 1 ? isSignUpError : undefined}
              errorText={errorIndex === 1 ? signUpError : undefined}
            />
            <Input
              placeholder="CONFIRM PASSWORD"
              onChange={(text) => setSignUpConfirmPassword(text)}
              isError={errorIndex === 2 ? isSignUpError : undefined}
              errorText={errorIndex === 2 ? signUpError : undefined}
            />
            <TouchableWithoutFeedback
              onPress={() => handleSignUp(signUpEmail, signUpPassword)}>
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
      <Modal
        style={{flex: 1}}
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn={'slideInUp'}
        animationOut={'slideOutUp'}>
        <View
          style={{
            width: 'auto',
            height: 190,
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
          }}>
          <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10}}>
            Please check your email!
          </Text>
          <Input
            onChange={(text) => setSignUpVerification(text)}
            placeholder="Verification code"
            isError={isModalError || undefined}
            errorText={isModalError ? signUpError : undefined}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={handleNewSignUpCodeRequest}>
              <View
                style={{
                  ...styles.button,
                  flex: 1,
                  height: 40,
                  position: 'relative',
                  marginTop: 10,
                  marginHorizontal: 20,
                  backgroundColor: '#2E71DC',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  New code
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={handleSignUpConfirm}>
              <View
                style={{
                  ...styles.button,
                  height: 40,
                  marginHorizontal: 20,
                  flex: 1,
                  position: 'relative',
                  marginTop: 10,
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Submit
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Modal>
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
