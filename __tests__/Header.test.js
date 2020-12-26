import React from 'react';
import {configure, shallow} from 'enzyme';

import {Appbar, Avatar, Searchbar} from 'react-native-paper';

import Adapter from 'enzyme-adapter-react-16'
import DashboardHeader from '../src/Component/Dashboard/DashboardHeader';

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

describe('test DashboardScreen', () => {
    it('provideSnapshot_whenMatched_testShouldpass', () =>{
        const componnt = shallow(<DashboardHeader/>)
        expect(componnt).toMatchSnapshot();
    })

    it('ProvideHeaderComponent_WhenCountNumberOfAppbarAction_ShouldReturn5', () => {
        const component = shallow(<DashboardHeader />)
        expect(component.find(Appbar.Action)).toHaveLength(2)
    })

    it('test all the icons are rendring in header', () => {
        const component = shallow(<DashboardHeader />)
        expect(component.find(Appbar.Action).at(0).props().icon).toEqual('menu')
        expect(component.find(Searchbar)).toHaveLength(1)
        expect(component.find(Avatar.Image)).toHaveLength(1)   
     })

     it('test list and grid view onpress event', async() => {
        const onPressEvent = jest.fn();
        const component = shallow(<DashboardHeader onPress = {onPressEvent}/>)
        expect(component.instance().state.listView).toBe(true);
        await component.instance().selectView();
        expect(component.instance().state.listView).toBe(false);
     })

})