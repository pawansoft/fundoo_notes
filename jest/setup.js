import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import keyChainMock from '../_mock_/react-native-keychain';

Enzyme.configure({ adapter: new Adapter() });
