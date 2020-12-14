import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Signup from '../src/Component/Signup';

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
    