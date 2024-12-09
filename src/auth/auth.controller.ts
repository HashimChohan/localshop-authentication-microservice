import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './services/auth.service';
import { MultitenantService } from './services/multitenant-auth.service';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTHSERVICE') private readonly authService: AuthService,
  ) {}

  @MessagePattern({ cmd: 'signup' })
  public async signUp(data: any) {
    return this.authService.signUp(data);
  }

  // @MessagePattern({ cmd: "signupwithinvite" })
  // public async signUpWithInvite(data) {
  //   return (this.authService as MultitenantService).signUpWithInvite(data);
  // }

  @MessagePattern({ cmd: 'login' })
  public async login(data: any) {
    return this.authService.login(data);
  }

  @MessagePattern({ cmd: 'sociallogin' })
  public async sociallogin(data: any) {
    return this.authService.socialLogin(data);
  }

  @MessagePattern({ cmd: 'forgotpassword' })
  public async forgotPassword(data: any) {
    return this.authService.forgotPassword(data);
  }

  @MessagePattern({ cmd: 'resetpassword' })
  public async resetPassword(data: any) {
    return this.authService.resetPassword(data); 
  }

  @MessagePattern({ cmd: 'changepassword' })
  public async changePassword(data: any) {
    return this.authService.changePassword(data);
  }

  @MessagePattern({ cmd: 'validatetoken' })
  public async validatetoken(data: any) {
    return this.authService.validateToken(data);
  }

  @MessagePattern({ cmd: 'emailverificationlink' })
  public async emailVerificationLink(data: any) {
    return this.authService.emailVerificationLink(data);
  }

  @MessagePattern({ cmd: 'verifyemail' })
  public async verifyEmail(data: any) {
    return this.authService.verifyEmail(data);
  }

  // new login methods

  @MessagePattern({ cmd: 'signupWithphone' })
  public async signupWithphone(data: any) {
    return this.authService.signupWithPhone(data);
  }

  @MessagePattern({ cmd: 'loginWithToken' })
  public async loginWithToken(data: any) {
    return this.authService.loginWithToken(data);
  }

  @MessagePattern({ cmd: 'verifyLoginToken' })
  public async verifyLoginToken(data: any) {
    return this.authService.verifyLoginToken(data);
  }

  @MessagePattern({ cmd: 'firebaseLogin' })
  public async firebaseLogin(data: any) {
    return this.authService.firebaseLogin(data);
  }

  @MessagePattern({ cmd: 'validateResetPasswordToken' })
  public async validatePasswordResetToken(data: any) {
    return this.authService.validateResetPasswordToken(data);
  }
}
