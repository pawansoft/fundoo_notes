import Adapter from 'enzyme-adapter-react-16'
import {shallow, configure} from 'enzyme'
import { LoginService, ResetPasscodeService, SignupService } from '../Services/UserServices/UserService';

configure({adapter: new Adapter()})

describe ('Test User Service',() => {

    // it('ProvideSignupDetail_WhenSaved_ShouldReturnResolve', () => {

    //         const isAdded = SignupService('pk.soft29@gmail.com', 'Pk@16123114');
    //         return expect(isAdded).resolves.toBe('Success');
    // })

    it('ProvideUesrIdAndPassword_WhenAlreadyPresentInDB_ShouldReject', () => {
        const isAdded = SignupService('pk.soft29@gmail.com', 'Pk@16123114');
        return expect(isAdded).rejects.toBe('error');
    })


    it('ProvideUesrIdAndPassword_WhenAlreadyPresent_ShouldLoggedIn', () => {
        const isAdded = LoginService('pk.soft29@gmail.com', 'Pk@16123114');
        return expect(isAdded).resolves.toBe('Success');
    })

    it('ProvideUesrIdAndPassword_WhenNotMatched_ShouldRejectWithError', () => {
        const isAdded = LoginService('pk.soft29@gmail.com', 'Pk.16123114');
        return expect(isAdded).rejects.toBe('error');
    })

    it('ProvideEmail_WhenFound_ShouldSendPasswordResetMail', () => {
        const isMailSent = ResetPasscodeService('pk.soft29@gmail.com');
        return expect(isMailSent).resolves.toBe('Success')
    })
    it('ProvideEmail_WhenNotFound_ShouldRejectWithError', () => {
        const isMailSent = ResetPasscodeService('pawan@gmail.com');
        return expect(isMailSent).rejects.toBe('error')
    })
})