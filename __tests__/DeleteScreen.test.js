import React from 'react';
import{configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Delete from '../src/Component/Dashboard/Delete';
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

describe('Delete screen', () => {
    it('ProvideDeleteScreen_WhenSnapshotMatches_ShouldPassTestCase', () =>{
        const component = shallow(<Delete/>)
        expect(component).toMatchSnapshot();
    })
})