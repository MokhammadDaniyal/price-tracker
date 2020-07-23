import {Auth} from 'aws-amplify';

export async function signUpCognito(email, password) {
  try {
    const user = await Auth.signUp({
      username: email,
      password,
    });
    // console.log({user});
    return user;
  } catch (error) {
    return {error};
  }
}

export async function confirmSignUpCognito(email, code) {
  console.log(code);
  try {
    const response = await Auth.confirmSignUp(email, code);
    return response;
  } catch (error) {
    return {error};
  }
}

export async function resendConfirmationCodeCognito(email) {
  try {
    await Auth.resendSignUp(email);
    console.log('code resent successfully');
    return {success: 'Code resent successfully'};
  } catch (error) {
    console.log('error resending code: ', err);
    return {error};
  }
}

export async function signInCognito(email, password) {
  console.log(email);
  console.log(password);
  try {
    const user = await Auth.signIn(email, password);
    return {success: 'User is authenticated'};
  } catch (error) {
    console.log('error signing in', error);
    return {error};
  }
}
