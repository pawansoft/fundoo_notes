import React from 'react';
import{configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NoteScreen from '../src/Component/NotesCreator/NoteScreen';

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

describe('Test note screen', () => {
    it('ProvideNoteScreen_WhenSnapshotMatches_ShouldPassTestCase', () =>{
        const component = shallow(<NoteScreen/>)
        expect(component).toMatchSnapshot();
    })
})