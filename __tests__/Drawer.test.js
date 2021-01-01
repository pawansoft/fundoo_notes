import React from 'react';
import {configure, shallow} from 'enzyme';
import {Appbar} from 'react-native-paper';
import Adapter from 'enzyme-adapter-react-16'
import { DrawerContent } from '@react-navigation/drawer';
import MockAsyncStorage from 'mock-async-storage';

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

describe('Test Drawer Navigation', () => {
    it('test all icons from Drawer Navigation', () => {
        const component = shallow(<DrawerContent/>)
        expect(component.find(Appbar.Item).at(0).props().icon).toEqual('lightbulb-outline')
        expect(component.find(Appbar.Item).at(1).props().icon).toEqual('bell-outline')
        expect(component.find(Appbar.Item).at(2).props().icon).toEqual('archive-arrow-down-outline')
        expect(component.find(Appbar.Item).at(3).props().icon).toEqual('delete')
        expect(component.find(Appbar.Item).at(4).props().icon).toEqual('cog-outline')
        expect(component.find(Appbar.Item).at(5).props().icon).toEqual('help-circle')
        expect(component.find(Appbar.Item).at(5).props().icon).toEqual('logout')       
    })

    it('count the number of elements used in Drawer', () => {
        const component = shallow(<DrawerContent/>);
        expect(component.find(Appbar.Item)).toHaveLength(8);
        expect(component.find(Drawer.Section)).toHaveLength(3);
    })

    it('whenPressNoteButton_shouldNavigateToDashboardScreen', async() => {
      const navigation = { navigate: jest.fn()}
      const onPressEvent = jest.fn();
      const component = shallow(<DrawerContent onPress = {onPressEvent} navigation = {navigation}/>);

      await component.instance().handleNoteButton();
      expect (navigation.navigate).toBeCalledWith(Notes);
    })

    it('WhenPressDeleteButton_shouldNavigateToDeleteScreen', async () =>{
      const navigation ={navigate: jest.fn()}
      const onPressEvent = jest.fn();
      const component = shallow(<DrawerContent onPress = {onPressEvent} navigation = {navigation}/>);

      await component.instance().handleDeleteButton();
      expect(navigation.navigate).toBeCalledWith('DeleteScreen')
    })
})