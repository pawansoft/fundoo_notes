import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import DashboardScreen from '../src/Component/Dashboard/DashboardScreen';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

configure({adapter: new Adapter()})
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

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

describe('test DashboardScreen', () => {
    it('provideSnapshot_whenMatched_testShouldpass', () =>{
        const componnt = shallow(<DashboardScreen/>)
        expect(componnt).toMatchSnapshot();
    })

})