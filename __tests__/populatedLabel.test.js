import React from 'react';
import{configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import MockAsyncStorage from 'mock-async-storage';
import PopulatedLabel from '../src/Component/Dashboard/Label/PopulatedLabel';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

jest.mock('react-native-fetch-blob', () => {
  return {
    DocumentDir: () => {},
    polyfill: () => {},
  }
});

jest.mock('react-native-sqlite-storage', () => {
  // const mockSQLite = require('react-native-sqlite-storage');
  const mockSQLite = {
    openDatabase: (...args) => {
      return {
        transaction: (...args) => {
          executeSql: (query) => { return []; }
        }
      };
    }
  }

  return mockSQLite;
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

describe('create new Label screen', () => {
    it('ProvideCreateLabelScreen_WhenSnapshotMatches_ShouldPassTestCase', () =>{
        const component = shallow(<PopulatedLabel/>)
        expect(component).toMatchSnapshot();
    })
})