import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import UserService from '../Services/UserServices/UserService';

configure({adapter: new Adapter()})

describe ('Test User Service',() => {

    // it('ProvideSignupDetail_WhenSaved_ShouldReturnResolve', () => {

    //         const isAdded = SignupService('pk.soft29@gmail.com', 'Pk@16123114');
    //         return expect(isAdded).resolves.toBe('Success');
    // })

    it('ProvideUesrIdAndPassword_WhenAlreadyPresentInDB_ShouldReject', () => {
        const isAdded = UserService.SignupService('pk.soft29@gmail.com', 'Pk@16123114');
        return expect(isAdded).rejects.toBe('error');
    })


    it('ProvideUesrIdAndPassword_WhenAlreadyPresent_ShouldLoggedIn', () => {
        const isAdded = UserService.LoginService('pk.soft29@gmail.com', 'Pk@16123114');
        return expect(isAdded).resolves.not.toBe(null);
    })

    it('ProvideUesrIdAndPassword_WhenNotMatched_ShouldRejectWithError', () => {
        const isAdded = UserService.LoginService('pk.soft29@gmail.com', 'Pk.16123114');
        return expect(isAdded).rejects.not.toBe(null);
    })

    it('ProvideEmail_WhenFound_ShouldSendPasswordResetMail', () => {
        const isMailSent = UserService.ResetPasscodeService('pk.soft29@gmail.com');
        return expect(isMailSent).resolves.toBe('Success')
    })
    it('ProvideEmail_WhenNotFound_ShouldRejectWithError', () => {
        const isMailSent = UserService.ResetPasscodeService('pawan@gmail.com');
        return expect(isMailSent).rejects.not.toBe(null)
    })
})