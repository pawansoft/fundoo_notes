import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import UserService from '../Services/UserServices/UserService';
import MockAsyncStorage from 'mock-async-storage';

const mockImpl = new MockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage', () => mockImpl);

jest.mock('react-native-fetch-blob', () => {
    return {
      DocumentDir: () => {},
      polyfill: () => {},
    }
  });

configure({adapter: new Adapter()})

describe ('Test User Service',() => {

    // it('ProvideSignupDetail_WhenSaved_ShouldReturnResolve', () => {

    //         const isAdded = UserService.SignupService('pk.soft29@gmail.com', 'Pk@16123114');
    //         return expect(isAdded).resolves.toBe('Success');
    // })

    it('ProvideUesrIdAndPassword_WhenAlreadyPresentInDB_ShouldReject', () => {
        const isAdded = UserService.SignupService('pk.soft29@gmail.com', 'Pk@16123114');
        return expect(isAdded).rejects.toBe("email in use!");
    })


    it('ProvideUesrIdAndPassword_WhenAlreadyPresent_ShouldLoggedIn', () => {
        jest.setTimeout(30000);
        const isAdded = UserService.LoginService('pk.soft29@gmail.com', 'Pk@16123114');
        return expect(isAdded).resolves.not.toBe(null);
    })

    it('ProvideUesrIdAndPassword_WhenNotMatched_ShouldRejectWithError', () => {
        const isAdded = UserService.LoginService('pk.soft29@gmail.com', 'Pk.16123114');
        return expect(isAdded).rejects.not.toBe(null);
    })

    // it('ProvideEmail_WhenFound_ShouldSendPasswordResetMail', () => {
    //     const isMailSent = UserService.ResetPasscodeService('pk.soft29@gmail.com');
    //     return expect(isMailSent).resolves.toBe('Success')
    // })
    it('ProvideEmail_WhenNotFound_ShouldRejectWithError', () => {
        const isMailSent = UserService.ResetPasscodeService('pawan@gmail.com');
        return expect(isMailSent).rejects.toBe('User not found')
    })

    it('WhenSelectLogout_ShouldReturnSuccessPromis', () =>{
        const isLoggedOut = UserService.logoutService();
        return expect(isLoggedOut).resolves.toBe('LoggedOut')
    })
})