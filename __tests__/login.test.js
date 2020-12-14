import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Login from '../src/Component/Login';

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

     test('ProvideUserName_WhenFollowCorrectForment_ErrorMessageShouldRemove', () => {
         const component = shallow(<Login/>);
         component.instance().handleUserName('123456');
         component.instance().validateUserName();
         expect(component.instance().state.userNameValid).toBe('Invalid Email');
         component.instance().handleUserName('pk.soft29@gmail.com');
         component.instance().validateUserName();
         expect(component.instance().state.userNameValid).toBe('');
     })

     test('ProvidePassword_WhenIncorrectFormat_ShouldGenerateInvalidField', () => {
        const component = shallow(<Login/>);
        component.instance().handlePassword('1234567');
        component.instance().validatePassword()
        expect(component.instance().state.passwordValid).toBe('Invalid Format');
     })


     test('ProvidePassword_WhenFollowCorrectForment_ErrorMessageShouldRemove', () => {
        const component = shallow(<Login/>);
        component.instance().handlePassword('123456');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('Invalid Format');
        component.instance().handlePassword('pk.soft29com');
        component.instance().validatePassword();
        expect(component.instance().state.validatePassword).toBe(undefined)
    })
 })
