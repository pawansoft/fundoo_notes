import LocalizedStrings from 'react-native-localization';
import Localization from 'react-native-localization';
import Chinies from './Chinise';
import English from './English';
import French from './French';
import hindi from './Hindi';
import Marathi from './Marathi';


export let strings = new LocalizedStrings({
    "en-US" : English,
    hi :hindi,
    mr: Marathi,
    zh: Chinies,
    fre: French

})