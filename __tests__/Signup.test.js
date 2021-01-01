import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Signup from '../src/Component/Signup';
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

describe('Signup Test', () => {
    it('ProvideRender_WhenMatchToSnapshot_TestShouldPass', () => {
        const component = shallow(<Signup/>)
        expect(component).toMatchSnapshot()
    })
})
describe('Test Signup Text Field', () => {
  
    it('ProvideTextFieldValue_WhenAdded_ShouldStoreAtState', () =>{
        const component = shallow(<Signup/>)
        component.instance().handleFName('Pawan');
        expect(component.instance().state.fname).toBe('Pawan')
    })

    it('ProvideLastName_WhenPassedToTextInput_ShouldStoredAtState', () => {
        const component = shallow(<Signup/>)
        component.instance().handleLName('Kumar');
        expect(component.instance().state.lname).toBe('Kumar')
    })

    it('ProvideUserName_WhenPassedToTextInput_ShouldStoredAtState', () => {
        const component = shallow(<Signup/>)
        component.instance().handleUserName('pk.soft29@gmail.com');
        expect(component.instance().state.userName).toBe('pk.soft29@gmail.com')
    })

    it('ProvidePassword_WhenPassedToTextInput_ShouldStoredAtState', () => {
        const component = shallow(<Signup/>)
        component.instance().handlePassword('pksoft29@gmail');
        expect(component.instance().state.password).toBe('pksoft29@gmail')
    })

    it('ProvideConfirmPassword_WhenPassedToTextInput_ShouldStoredAtState', () => {
        const component = shallow(<Signup/>)
        component.instance().handleConfirm('pksoft29@gmail');
        expect(component.instance().state.confirm).toBe('pksoft29@gmail')
    })
})
describe('Test Regex validation',() => {
    it('ProvideFirstName_WhenInvalid_ShouldGenerateError', () => {
        const component = shallow(<Signup/>) 
        component.instance(). handleFName('pawan');
        component.instance().validateFName();
        expect(component.instance().state.fnameValid).toBe('invalid')
    })

    it('ProvideFirstName_WhenValid_ErrorMessageshouldREmoved', () => {
        const component = shallow(<Signup/>) 
        component.instance(). handleFName('pawan');
        component.instance().validateFName();
        expect(component.instance().state.fnameValid).toBe('invalid')
        component.instance().handleFName('Pawan');
        component.instance().validateFName();
        expect(component.instance().state.fnameValid) .toBe ('')
    })

    it('ProvideLastName_WhenInvalid_ShouldGenerateInvalidMessage', () => {
        const component = shallow(<Signup/>)
        component.instance().handleLName('kumar');
        component.instance().validateLName();
        expect(component.instance().state.lnameValid).toBe('invalid')
    })

    it('ProvideLastName_WhenValid_ErrorMessageShouldRemoved', () => {
        const component = shallow(<Signup/>)
        component.instance().handleLName('kumar');
        component.instance().validateLName();
        expect(component.instance().state.lnameValid).toBe('invalid');
        component.instance().handleLName('Kumar');
        component.instance().validateLName();
        expect(component.instance().state.lnameValid) .toBe ('');
    })

    it('ProvideUserName_WhenInvalidFormat_ShouldGenerateInvalidMessage', () => {
        const component = shallow(<Signup/>)
        component.instance().handleUserName('1234567');
        component.instance().validateUserName();
        expect(component.instance().state.userNameValid).toBe('Invalid Email')
    })

    it('ProvideUserName_WhenValid_ErrorMessageShouldRemove', () => {
        const component = shallow(<Signup/>)
        component.instance().handleUserName('1234567');
        component.instance().validateUserName();
        expect(component.instance().state.userNameValid).toBe('Invalid Email');
        component.instance().handleUserName('pk.soft29@gmail.com');
        component.instance().validateUserName();
        expect(component.instance().state.userNameValid).toBe('')
    })

    it('ProvidePassword_WhenInvalidFormat_ShouldGenerateInvalidMessage', () => {
        const component = shallow(<Signup/>)
        component.instance().handlePassword('1234567');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('Not Strong')
    })

    it('ProvidePassword_WhenValid_ErrorMessageShouldRemoved', () => {
        const component = shallow(<Signup/>)
        component.instance().handlePassword('1234567');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('Not Strong');
        component.instance().handlePassword('Pk@16123114');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('');
    })

    it('ProvideConfirmPassword_WhenNotMatchecWithPassword_ShouldGenerateErrorMessage', () => {
        const component = shallow(<Signup/>)
        component.instance().handlePassword('pk.soft29');
        component.instance().handleConfirm('abc@12345');
        component.instance().comparePassword();
        expect(component.instance().state.passMatch).toBe('Wrong Password')
    })

    it('ProvideConfirmPassword_WhenMatchecWithPassword_ErrorMessageShouldRemoved', () => {
        const component = shallow(<Signup/>)
        component.instance().handlePassword('pk.soft29');
        component.instance().handleConfirm('abc@12345');
        component.instance().comparePassword();
        expect(component.instance().state.passMatch).toBe('Wrong Password');
        component.instance().handleConfirm('pk.soft29');
        component.instance().comparePassword();
        expect(component.instance().state.passMatch).toBe('');
    })
})
describe('Test Signup Button', () => {
    // it('PressSignupButton_WhenAllFieldValueIsCorrect_ShouldNavigateToLogin ', async() => {
    //     const navigation = { navigate: jest.fn()}
    //     const onPressEvent = jest.fn();
    //     const component = shallow(<Signup onPress = {onPressEvent} navigation = {navigation}/>);
    //     component.instance().handleFName('Pawan');
    //     component.instance().handleLName('Kumar');
    //     component.instance().handleUserName('pk.soft29@gmail.com');
    //     component.instance().handlePassword('PK@16123114');
    //     component.instance().handleConfirm('Pk@16123114')
        
    //     await component.instance().handleSignUpButton();

    //     expect(navigation.navigate).toBeCalledWith("Login");
    // })
    it('WhenPressSignupButton_ShouldNavigateToLogin ', async() => {
        const navigation = { navigate: jest.fn()}
        const onPressEvent = jest.fn();
        const component = shallow(<Signup onPress = {onPressEvent} navigation = {navigation}/>);
        
        await component.instance().SigninInsteadNavigationHandler();
        expect(navigation.navigate).toBeCalledWith("Login");
    })
})
    