import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Menu,} from 'react-native-paper';
import NewNotes from '../src/Component/NotesCreator/NewNotes';
import MockAsyncStorage from 'mock-async-storage';

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
describe('Test Three Dot Vertical RBSheet', () => {
    it('WhenCountMenu_ShouldReturn5', () =>{
        const component = shallow(<NewNotes/>);
        expect(component.find(Menu.Item)).toHaveLength(5)
    })
})