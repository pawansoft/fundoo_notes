import React from 'react';
import{
    View,
    ScrollView
} from 'react-native';

import Dashboard from './Dashboard';
import DashboardFooter from './DashboardFooter';
import DashboardHeader from './DashboardHeader';

const DashboardScreen = ({navigation}) => {
    return(
        <View style = {{flex : 1}}>
            <View>
                <DashboardHeader/>
            </View>
            <ScrollView>
                <View >
                
                    <Dashboard navigation = {navigation}/>
                </View>
            </ScrollView>
            <View>
                <DashboardFooter/>
            </View>
        </View>
                    
    )
}
export default DashboardScreen;