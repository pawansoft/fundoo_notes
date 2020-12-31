import React from 'react';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Menu,} from 'react-native-paper';
import NewNotes from '../src/Component/NotesCreator/NewNotes';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
configure({adapter: new Adapter()})
describe('Test Three Dot Vertical RBSheet', () => {
    it('WhenCountMenu_ShouldReturn5', () =>{
        const component = shallow(<NewNotes/>);
        expect(component.find(Menu.Item)).toHaveLength(5)
    })
})