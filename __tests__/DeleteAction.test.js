import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MockAsyncStorage from 'mock-async-storage';
import { DeleteActionScreen } from '../src/Component/Dashboard/DeleteActionScreen';
import { Appbar, Menu } from 'react-native-paper';
import NoteServices from '../Services/firebase_services/NoteServices';
import { AsyncStorage } from 'react-native';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  }
});

configure({adapter: new Adapter()})

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

describe('Test Delete Action Functionality', () =>
{
    it('ProvideDeleteAction_WhenMatchecSnapshot_testShouldPass', () => {
        const component = shallow(<DeleteActionScreen/>)
        expect(component).toMatchSnapshot();
    })
    it('test all icons from DeleteActionScreen', () => {
        const component = shallow(<DeleteActionScreen/>)
        expect(component.find(Menu.Item).at(0).props().icon).toEqual('autorenew')
        expect(component.find(Menu.Item).at(1).props().icon).toEqual('delete-outline')
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('keyboard-backspace')
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('plus-box-outline')
        expect(component.find(Appbar.Action).at(3).props().icon).toEqual('dots-vertical')
    }) 
})

describe('Test functionality of delete screen', () => {
    it('PressRestoreButton_WhenNoteRestored_shouldNavigateToDelete', async() => {
        const navigation = { navigate: jest.fn()}
        const onPressEvent = jest.fn();

        const component = shallow(<DeleteActionScreen onPress = {onPressEvent} navigation = {navigation}/>)
        NoteServices._restoreNoteService()
        await component.instance().handleNewNoteCreateButton();
        expect(navigation.navigate).toBeCalledWith("NewNotes")
    })
})