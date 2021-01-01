import React from 'react';
import {configure, shallow} from 'enzyme';
import {Appbar} from 'react-native-paper';
import Adapter from 'enzyme-adapter-react-16'
import BottomBar from '../src/Component/Dashboard/dashboardFooter';
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

describe('Test dashboard footer',() => {
    it('ProvideDashbaordFooter_WhenMatchecSnapshot_testShouldPass', () => {
        const component = shallow(<BottomBar/>)
        expect(component).toMatchSnapshot();
    })

    it('test all icons from dashboard footer', () => {
        const component = shallow(<BottomBar/>)
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('check-box-outline')
        expect(component.find(Appbar.Action).at(1).props().icon).toEqual('brush')
        expect(component.find(Appbar.Action).at(2).props().icon).toEqual('microphone-outline')
        expect(component.find(Appbar.Action).at(3).props().icon).toEqual('panorama')
    })
    it('test count of appbar in dashboard footer', () => {
        const component = shallow(<BottomBar/>)
        expect(component.find(Appbar.Action)).toHaveLength(5);
    })
})

describe('Test Navigation In Dashboard Footer', () => {
  it('PressPlusButton_WhenEventOccure_ShouldNavigateToNotScreen', async() => {
    const navigation = { navigate: jest.fn()}
    const onPressEvent = jest.fn();

    const component = shallow(<BottomBar onPress = {onPressEvent} navigation = {navigation}/>)
    await component.instance().handleNewNoteCreateButton();
    expect(navigation.navigate).toBeCalledWith("NewNotes")
  })
})

