import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Appbar } from 'react-native-paper';
import NewNotes from '../src/Component/NotesCreator/NewNotes';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

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
 describe('Test Note Detail Provider', () => {
     it('ProvideNoteDetaitProvider_WhenSnapMatches_TestShouldPass', () => {
         const component = shallow(<NewNotes/>);
         expect(component).toMatchSnapshot();
     })
 })
 describe('Test Note Detail State', () => {
   it('ProvideDetail_WhenPassedToTextBox_ShouldStoreInState', async() => {
     const compnent = shallow(<NewNotes/>);
    await compnent.instance().handleTitle('First Note');
     expect(compnent.instance().state.title).toBe('First Note');
   })

   it('ProvideDetail_WhenPassedToNote_ShouldStoreInNoteState', async() => {
    const compnent = shallow(<NewNotes/>);
    await compnent.instance().handleNote('Hello World');
    expect(compnent.instance().state.note).toBe('Hello World');
   })
 })

 describe('Test Icons and Appbar', () => {
   it('ProvideAppbar_WhenCount_ShoudReturn8icon ', () => {
     const component = shallow(<NewNotes/>);
     expect(component.find(Appbar.Action)).toHaveLength(8)
   })

   it('ProvideNoteHolder_WhenFindLogo_ShouldHaveOnScreen', () => {
     const component = shallow (<NewNotes/>);
     expect(component.find(Appbar.Action).at(0).props().icon).toEqual('keyboard-backspace');
     expect(component.find(Appbar.Action).at(1).props().icon).toEqual('pin-outline');
     expect(component.find(Appbar.Action).at(2).props().icon).toEqual('bell-plus-outline');
     expect(component.find(Appbar.Action).at(3).props().icon).toEqual('archive-arrow-down-outline');
     expect(component.find(Appbar.Action).at(4).props().icon).toEqual('plus-box-outline');
     expect(component.find(Appbar.Action).at(5).props().icon).toEqual('undo-variant');
     expect(component.find(Appbar.Action).at(6).props().icon).toEqual('redo-variant');
     expect(component.find(Appbar.Action).at(7).props().icon).toEqual('dots-vertical');
     
   })

   it('ProvideTitleAndNote_WhenPressBackButton_ShouldSaveDEtailAndNavigateToDashboard', async() => {
      const component = shallow (<NewNotes onPress = {onPressEvent} navigation = {navigation}/>);
      const navigation = { navigate: jest.fn()}
      const onPressEvent = jest.fn();
  
      await component.instance().handleTitle('First Note');
      await component.instance().handleNote('This is my first Note');
      await component.instance().handleBackButton();
      expect(navigation.navigate).toBeCalledWith("Notes")
   })

   it('ProvideTotleAndNote_WhenNull_ShouldNavigateToDashboardWithEmptyParams', async() => {
    const component = shallow (<NewNotes onPress = {onPressEvent} navigation = {navigation}/>);
    const navigation = { navigate: jest.fn()}
    const onPressEvent = jest.fn();

    await component.instance().handleBackButton();
    expect(navigation.navigate).toBeCalledWith("Notes")
   })
 })
describe('Test Delete Note', () => {
  it('deleteNotes_whenNoDataIsAdded_ShouldOpenDeleteSnakbar', () => {
    const component = shallow(<NewNotes/>);
    component.instance().handleDeleteNoteButton();
    expect(component.instance().state.isEmpty).toBe(true)
   })

   it('ProvideNotesDetail_WhenPressNoteDetail_ShouldNavigateToDashboard', async() => {
    const component = shallow (<NewNotes onPress = {onPressEvent} navigation = {navigation}/>);
    const navigation = { navigate: jest.fn()}
    const onPressEvent = jest.fn();

    await component.instance().handleTitle('First Note');
    await component.instance().handleNote('This is my first Note');
    await component.instance().handleDeleteNoteButton();
    expect(navigation.navigate).toBeCalledWith('Notes')

   })

   it('whenSnakbarDismiss_shouldFalseIsEmptyState', () => {
    const component = shallow(<NewNotes/>);
    component.instance().onDismissSnakbarHandler();
    expect(component.instance().state.isEmpty).toBe(false)
   })
})