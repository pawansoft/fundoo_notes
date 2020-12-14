import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Login from '../src/Component/Login';

configure({adapter: new Adapter()})
 describe('Test Login States', () => {
     test('ProvideUserName_WhenAdded_ShouldStoreAtState', () => {
         const component = shallow (<Login/>);
         component.instance().handleUserName('pk.soft29@gmail.com');
         expect(component.instance().state.userName).toBe('pk.soft29@gmail.com')
     })

     test('ProvidePassword_WhenAdded_ShouldStoreAtState', () => {
         const component = shallow(<Login/>);
         component.instance().handlePassword('Pk@1234567');
         expect(component.instance().state.password).toBe('Pk@1234567');
     })
 })
 describe('Test Invalid input', () => {
     test('ProvideUserName_WhenIncorrectFormat_ShouldGenerateInvalidField', () => {
        const component = shallow(<Login/>);
        component.instance().handleUserName('1234567');
        component.instance().validateUserName()
        expect(component.instance().state.userNameValid).toBe('Invalid Email'); 
     })

     test('ProvidePassword_WhenIncorrectFormat_ShouldGenerateInvalidField', () => {
        const component = shallow(<Login/>);
        component.instance().handlePassword('1234567');
        component.instance().validatePassword()
        expect(component.instance().state.passwordValid).toBe('Invalid Format');
     })
 })