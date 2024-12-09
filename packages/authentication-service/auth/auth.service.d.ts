import { ClientProxy } from '@nestjs/microservices';
import { ChangePasswordModel } from '../models/changepassword.model';
import { ForgotPasswordModel } from '../models/forgotpassword.model';
import { LoginModel } from '../models/login.model';
import { ResetPasswordModel } from '../models/resetpassword.model';
import { ResponseModel } from '../models/response.model';
import { SignupModel } from '../models/signup.model';
import { SocialLoginModel } from '../models/sociallogin.model';
import { ValidateTokenModel } from '../models/validatetoken.model';
import { VerifyEmailModel } from '../models/verifyemail.model';
export declare class AuthenticationService {
    private readonly tcpService;
    constructor(tcpService: ClientProxy);
    signUp(signUpModel: SignupModel): Promise<ResponseModel>;
    login(loginModel: LoginModel): Promise<ResponseModel>;
    changePassword(changePasswordModel: ChangePasswordModel): Promise<ResponseModel>;
    validateToken(validateTokenModel: ValidateTokenModel): Promise<ResponseModel>;
    socialLogin(socailLoginModel: SocialLoginModel): Promise<ResponseModel>;
    forgotPassword(forgotPasswordModel: ForgotPasswordModel): Promise<ResponseModel>;
    resetPassword(resetPasswordToken: ResetPasswordModel): Promise<ResponseModel>;
    emailVerificationLink(emailVerificationLink: ForgotPasswordModel): Promise<any>;
    verifyEmail(verifyEmailModel: VerifyEmailModel): Promise<any>;
}
//# sourceMappingURL=auth.service.d.ts.map