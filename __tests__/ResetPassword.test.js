import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import ForgotPassword from '../src/Component/ForgotPassword';

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

describe('Reset Password Test', () => {
    it('ProvideRender_WhenMatchToSnapshot_TestShouldPass', () => {
        const component = shallow(<ForgotPassword/>)
        expect(component).toMatchSnapshot()
    })
})
describe('Test State of Reset Password', () => {
    test('ProvideUserName_WhenPassedWithField_ShouldStoreAtState', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handleEmailId('pk.soft29@gmail.com');
        expect(component.instance().state.emailId).toBe('pk.soft29@gmail.com')
    })
})

describe('Test Invalid Detail', () => {
    test('ProvideUserName_WhenIncorrectFormate_ShouldGenerateError', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handleEmailId('pk');
        component.instance().findValidEmail();
        expect(component.instance().state.isEmailValid).toBe('Invalid Email')
    }),

    test('ProvideUserName_WhencorrectFormate_ShouldRemoveAnError', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handleEmailId('pk');
        component.instance().findValidEmail();
        expect(component.instance().state.isEmailValid).toBe('Invalid Email')
        component.instance().handleEmailId ('pk.soft29@gmail.com');
        component.instance().findValidEmail();
        expect(component.instance().state.isEmailValid).toBe('');
    })
    
})
describe('test OnPressEvent',() => {
        it('test onPressEvent of Login button ', async() => {
            const navigation = { navigate: jest.fn()}
            const onPressEvent = jest.fn();
            const component = shallow(<ForgotPassword onPress = {onPressEvent} navigation = {navigation}/>);
        
            await component.instance().handleLoginButton();
            expect(navigation.navigate).toBeCalledWith("Login");
        })
})