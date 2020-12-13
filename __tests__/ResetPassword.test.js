import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import ForgotPasswordScreen from '../src/Component/ForgotPasswordScreen';
import ForgotPassword from '../src/Component/ForgotPassword';
configure({adapter: new Adapter()})

describe('Test State of Reset Password', () => {
    test('ProvideUserName_WhenPassedWithField_ShouldStoreAtState', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handleUserName('pk.soft29@gmail.com');
        expect(component.instance().state.userName).toBe('pk.soft29@gmail.com')
    }),
    test('ProvideUserName_WhenPassedWithField_ShouldStoreAtState', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handlePassword('Pk@12345678');
        expect(component.instance().state.password).toBe('Pk@12345678')
    })
})

describe('Test Invalid Detail', () => {
    test('ProvideUserName_WhenIncorrectFormate_ShouldGenerateError', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handleUserName('pk');
        component.instance().validateUserName();
        expect(component.instance().state.userNameValid).toBe('Invalid Email')
    }),
    test('ProvideUserName_WhenPassedWithField_ShouldStoreAtState', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handlePassword('Pk@12345678');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('Invalid OTP')
    })
})