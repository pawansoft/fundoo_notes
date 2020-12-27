import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Appbar } from 'react-native-paper';
import NotesContainer from '../src/Component/Dashboard/NotesContainer';

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
describe('Test Note Container', () => {
    it('ProvideNoteContainer_WhenSnapMatches_TestShouldPass', () => {
        const component = shallow(<NotesContainer/>);
        expect(component).toMatchSnapshot();
    })

    it('whenReadingNotesFromDatabase_ShouldStoreAtTheStateNotes', async () => {
        const component = shallow(<NotesContainer/>);
        await component.instance().componentDidMount();
        expect(component.instance().state.notes).not.toBe(null)
    })
})