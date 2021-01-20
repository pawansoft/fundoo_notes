import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Login from '../src/Component/Login';
import SocialService from '../Services/UserServices/SocialService';

import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

jest.mock('react-native-fetch-blob', () => {
    return {
      DocumentDir: () => {},
      polyfill: () => {},
    }
  });
  

jest.mock('react-native-localization', () => class RNLocalization {
    language = 'en-US'
  
    constructor (props) {
      this.props = props
      this.setLanguage(this.language)
    }
  
    setLanguage (interfaceLanguage) {
      this.language = interfaceLanguage
      if (this.props[interfaceLanguage]) {
        var localizedStrings = this.props[this.language]
        for (var key in localizedStrings) {
          if (localizedStrings.hasOwnProperty(key)) this[key] = localizedStrings[key]
        }
      }
    }
})

configure({adapter: new Adapter()})

describe('Login Test', () => {
    it('ProvideRender_WhenMatchToSnapshot_TestShouldPass', () => {
        const component = shallow(<Login/>)
        expect(component).toMatchSnapshot()
    })
}) 
describe('Test Login States', () => {
     test('ProvideUserName_WhenAdded_ShouldStoreAtState', () => {
         const component = shallow (<Login/>);
         component.instance().handleUserName('pk.soft29@gmail.com');
         expect(component.instance().state.emailId).toBe('pk.soft29@gmail.com')
     })

     test('ProvidePassword_WhenAdded_ShouldStoreAtState', () => {
         const component = shallow(<Login/>);
         component.instance().handlePassword('Pk@1234567');
         expect(component.instance().state.passcode).toBe('Pk@1234567');
     })
 })
 describe('Test Invalid input', () => {
    it('ProvideLoginDetail_WhenEmailNotFound_ShouldRejectWithError', async() => {
      const component = shallow(<Login/>)
        component.instance().handleUserName('pk.soft@gmail.com');
        component.instance().handlePassword('Pk@16123114')
        await component.instance().handleLoginButton();
        expect(component.instance().state.emailError).toBe('UserNotFound')
    })
 })

 describe('Test Navigation', () => {
    it('WhenPressSignupButton_ShouldNavigateToLogin ', async() => {
        const navigation = { navigate: jest.fn()}
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation}/>);
    
        await component.instance().handleSignupButtonNavigation();
        expect(navigation.navigate).toBeCalledWith("Signup");
    })
 })

describe('Social Login', () => {
    it('pressFacebookLoginButton_WhenLoggedInSuccessfully_ShouldNavigateToDashboard', () => {
        const navigation = { navigate : jest.fn() }
        const onPressEvent = jest.fn();
        const component = shallow(<Login onPress = {onPressEvent} navigation = {navigation} />)
        const instance = component.instance();
        instance.handleFacebookButton();
        return SocialService.facebookLogin().then(userCredential => expect(navigation.navigate).toBeCalledWith('Dashboard'))
    }, 3000)
})