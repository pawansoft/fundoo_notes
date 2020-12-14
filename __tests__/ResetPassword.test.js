import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import ForgotPasswordScreen from '../src/Component/ForgotPasswordScreen';
import ForgotPassword from '../src/Component/ForgotPassword';
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
    test('ProvideUserName_WhencorrectFormate_ShouldRemoveAnError', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handleUserName('pk');
        component.instance().validateUserName();
        expect(component.instance().state.userNameValid).toBe('Invalid Email')
        component.instance().handleUserName ('pk.soft29@gmail.com');
        component.instance().validateUserName();
        expect(component.instance().state.userNameValid).toBe('');
    }),
    test('ProvideUserName_WhenPasswordIsInvalid_ShouldGenerateError', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handlePassword('12345678');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('Not Strong')
    })

    test('ProvideUserName_WhenPasswordIsValid_ShouldStoreAtState', () =>{
        const component = shallow(<ForgotPassword/>);
        component.instance().handlePassword('2345678');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('Not Strong');
        component.instance().handlePassword('Pk@16123114');
        component.instance().validatePassword();
        expect(component.instance().state.passwordValid).toBe('')
    })
})