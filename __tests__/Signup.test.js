import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import Signup from '../src/Component/Signup';

configure({adapter: new Adapter()})
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

describe('Test validation of each field', () => {
    // it('provideFirstName_WhenFirstLetterIsNotCap_ShouldSetValidateFNameState', async() => {
    //     const component = shallow(<Signup/>)
    //     await component.instance().handleFName('p');
    //     await component.instance().validateUserName();
    //     expect(component.instance().state.fnameValid).toBe('invalid')
    // })
})