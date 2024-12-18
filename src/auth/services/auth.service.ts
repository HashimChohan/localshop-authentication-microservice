import { HttpService, Injectable } from '@nestjs/common';
import { CollectionNames } from 'src/environment';
import * as bcrypt from 'bcrypt';
import * as murmurhash from 'murmurhash';
import { UtilService } from 'src/util/util.service';
import { v4 as uuidv4 } from 'uuid';
import { MongoBaseService, Operation } from 'mongodb-crud-operations';
import { FirebaseService } from 'src/firebase/firebase.service';
import { ResponseModel } from 'src/response.model';
import { Constants } from 'src/constants';
import { MongoService } from 'src/mongo/mongo.service';
import { ObjectId } from 'mongodb';
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { createWriteStream } = require('fs');
const { createAvatar } = require('@beyonk/initials-avatar');
const logger = require('../../logger');

@Injectable()
export class AuthService {
  constructor(
    protected readonly utilService: UtilService,
    protected readonly mongoService: MongoBaseService,
    protected readonly firebaseService: FirebaseService,
    protected readonly httpService: HttpService,
    protected readonly mongo: MongoService,
  ) { }

  public async signUp(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Sign Up Started With Data: ${JSON.stringify(data)}`);
      
      let userData: any = { ...data.user };
      let checkQuery: any = {};
  
      // Construct the query based on email or phone number
      if (data.user.email) {
        checkQuery = { email: { $eq: userData.email } };
      } else {
        checkQuery = { phoneNumber: { $eq: userData.phoneNumber } };
      }

      userData.createdOn = Date.now();
      userData.createdBy = 'System';
      // Check if the user already exists
      const findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, checkQuery);
      logger.info(`Check If User Exists`);
  
      if (findUserModel.length > 0) {
        const message = data.user.email
          ? 'Email Already Exists'
          : 'Phone Number Already Exists';
        return this.mongo.createApiResponse(false, {}, message);
      }
  
      // Hash the password if the user is not a guest
      if (userData.type !== 'guest') {
        userData.password = await bcrypt.hash(
          userData.password,
          Constants.BCRYPT_HASH_ROUNDS,
        );
      }
  

      const id = new ObjectId();
      const referenceId = murmurhash.v3(JSON.stringify(userData)).toString(); // Generate hash as a string

      // Create an array of objects with the _id field
      const idArray = [{ _id: referenceId }];
      
      // Assign the array of objects to the `id` field
      userData["id"] = idArray;
      
      // Insert the user into the database
      const addUserEntityLog: any = await this.mongo.update(
        CollectionNames.Users,
        userData,
        id, // Pass the ObjectId as a string
        true,
      );
      logger.info(`Add User To DB`);
  
      // Remove sensitive data (password) from the response
      delete addUserEntityLog.password;
  
      // Generate a token for the user
      const token = this.createToken({ _id: id });
  
      logger.info(`Sign Up Ended.`);
      return this.mongo.createApiResponse(
        true,
        { user: addUserEntityLog, token },
        'User Created Successfully',
      );
    } catch (err) {
      logger.error(`Sign Up Ended With Error: ${err.stack}`);
      return this.mongo.createApiResponse(false, {}, 'Something Went Wrong.');
    }
  }
  public async login(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Login Started With Data : ${JSON.stringify(data)}`);
      let findUserModel: any = {
        $or: [
          { email: { $eq: data.email } },
          { phoneNumber: { $eq: data.email } },
          { userName: { $eq: data.email } },
        ],
      };

      console.log('find user model');
      logger.info(`Get user by email.`);
      let users: any = await this.mongo.findByQuery(
        CollectionNames.Users,
        findUserModel,
      );

      if (users.length === 0) {
        console.log('user length 0');
        return this.mongo.createApiResponse(false, {}, 'User not found.');
      }

      let user: any = { ...users[0] };
      const areEqual = await bcrypt.compare(data.password, user.password);

      if (!areEqual) {
        console.log('credentials wrong');
        return this.mongo.createApiResponse(false, {}, 'Invalid Credentials.');
      }

      delete user.password;
      let token = this.createToken({ _id: user._id });
      console.log('token');

      logger.info(`Login Ended.`);
      return this.mongo.createApiResponse(
        true,
        { user: user, token: token },
        'User Login Successfully.',
      );
    } catch (err) {
      logger.info(`Login Ended With Error : ${err.stack}.`);
      console.error(err);
      return this.mongo.createApiResponse(false, 'Something Went Wrong.');
    }
  }

  public async socialLogin(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Phone Number Login Started With Data: ${JSON.stringify(data)}`);
  
      // Verify Firebase Token
      const isValidToken =
        (await this.firebaseService.verifyAccessToken(data.token)) ===
        data.user.uid;
      logger.info(`Firebase Token Verification Completed.`);
  
      if (!isValidToken) {
        return this.mongo.createApiResponse(false, 'Invalid Credentials');
      }
  
      let checkQuerry: any = {};
      if (data.user.email) {
        checkQuerry = { email: data.user.email };
      } else if (data.user.phoneNumber) {
        checkQuerry = { phoneNumber: data.user.phoneNumber };
      }
      data.user.createdOn = Date.now();
      const findUserModel: any = await this.mongo.findByQuery(
        CollectionNames.Users,
        checkQuerry,
      );
  
      // If user does not exist, create a new user
      if (findUserModel.length === 0) {
        logger.info(`User not found, creating new user.`);
  
        const userId = new ObjectId(); // Generate ObjectId
        const referenceId = murmurhash.v3(JSON.stringify(data)).toString(); // Generate hash as a string

        // Create an array of objects with the _id field
        const idArray = [{ _id: referenceId }];
        
        // Assign the array of objects to the `id` field
        data.user["id"] = idArray;
        const userEntityLog: any = await this.mongo.update(
          CollectionNames.Users,
          data.user,
          userId,
          true,
        );
        logger.info(`New User Added To DB.`);
  
        return this.mongo.createApiResponse(
          true,
          { user: userEntityLog, token: data.token },
          'User Registered and Logged in Successfully',
        );
      }
     
      // If user exists, return the user details and token
      const user = { ...findUserModel[0] };
      logger.info(`User Found. Returning user details.`);
    
      return this.mongo.createApiResponse(
        true,
        { user: user, token: data.token },
        'User Logged in Successfully',
      );
    } catch (err) {
      logger.error(`Phone Number Login Failed With Error: ${err.stack}`);
      return this.mongo.createApiResponse(false, 'Something Went Wrong.');
    }
  } 
  
  



  public async forgotPassword(data: any): Promise<ResponseModel> {
    try {
      logger.info(
        `Forgot Password Started With Data : ${JSON.stringify(data)}`,
      );

      logger.info(`Finding User From DB.`);
      let users: any = await this.mongo.findByQuery(
        CollectionNames.Users,
        { email: data.email, }
      );
      if (users.length === 0) {
        return this.mongo.createApiResponse(false, 'User Not Found.');
      }
      let user = { ...users[0] };
      user.forgetPassword = {};
      user.forgetPassword.newPasswordToken = this.makeid(6);
      user.forgetPassword.timestamp = new Date();
      let userId = user._id;
      delete user._id;
      let userEntityLog = this.mongo.update(
        CollectionNames.Users,
        user,
        userId,
        true,
      );
      logger.info(`Updating User In DB.`);
      // await this.mongo.update(CollectionNames.Users, userEntityLog, '');
      logger.info(`Forgot Password Ended.`);
      return this.mongo.createApiResponse(
        true,
        user.forgetPassword.newPasswordToken,
        'This code will expire in 24 hours.',
      );
    } catch (err) {
      logger.info(`Forgot Password Ended With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, 'Something Went Wrong.');
    }
  }

  async resetPassword(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Reset Password Started With Data : ${JSON.stringify(data)}`);
      if (!data.token) {
        return this.mongo.createApiResponse(
          false,
          '',
          'Password Reset Token Not Found.',
        );
      }
      logger.info(`Finding User From DB.`);
      let users: any = await this.mongo.findByQuery(
        CollectionNames.Users,
        {
          'forgetPassword.newPasswordToken': data.token,
        }
      );
      if (users.length === 0) {
        return this.mongo.createApiResponse(false, '', 'Invalid Code.');
      }
      let user = { ...users[0] };
      let diffInMinutes = this.diff_minutes(
        new Date(),
        new Date(user.forgetPassword.timestamp),
      );

      if (diffInMinutes > 60) {
        return this.mongo.createApiResponse(
          false,
          { isValid: false },
          'The forget password token has expired.',
        );
      }
      user.password = await bcrypt.hash(
        data.newPassword,
        Constants.BCRYPT_HASH_ROUNDS,
      );
      user.forgetPassword = {
        newPasswordToken: '',
        timestamp: 0,
      };
      let userId = user._id;
      logger.info(`Updating User In DB.`);
      await this.mongo.update(CollectionNames.Users, user, userId, true);
      logger.info(`Reset Password Ended.`);
      return this.mongo.createApiResponse(
        true,
        '',
        'Password Reset Successfully.',
      );
    } catch (err) {
      logger.info(`Reset Password Ended With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }
  async changePassword(data: any): Promise<ResponseModel> {
    try {
      logger.info(
        `Change Password Started With Data : ${JSON.stringify(data)}`,
      );
      const findUserQuery: any = await this.mongo.findById(
        CollectionNames.Users,
        data.userId,
      );
      logger.info(`Find User From DB.`);

      if (!findUserQuery) {
        return this.mongo.createApiResponse(false, '', 'User Not Found');
      } else {
        const areEqual = await bcrypt.compare(
          data.currentPassword,
          findUserQuery.password,
        );
        if (!areEqual) {
          return this.mongo.createApiResponse(
            false,
            '',
            'Current Password didn`t match!',
          );
        } else {
          findUserQuery.password = await bcrypt.hash(
            data.newPassword,
            Constants.BCRYPT_HASH_ROUNDS,
          );
          let id = findUserQuery._id;
          const userEntityLog = this.mongo.update(
            CollectionNames.Users,
            findUserQuery,
            id,
          );
          logger.info(`Update User In DB.`);
          // await this.mongo.update(CollectionNames.Users, userEntityLog, '');
          this.createToken({ _id: id }).accessToken;
          logger.info(`Change Password Ended.`);
          return this.mongo.createApiResponse(
            true,
            '',
            'Password Changed Successfully!',
          );
        }
      }
    } catch (err) {
      logger.info(`Change Password Ended With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, '', 'Something went wrong.');
    }
  }

  async validateToken(token): Promise<ResponseModel> {
    try {
      logger.info(
        `Validate Token Started With Data : ${JSON.stringify(token)}`,
      );
      if (token.type === 'firebase') {
        logger.info(`Firebase Token Validation`);
        let accessTokenFlag: any = await this.firebaseService.verifyAccessToken(
          token.token,
        );
        if (accessTokenFlag) {
          let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, {
            uid: accessTokenFlag,
          });
          logger.info(`Find User From DB`);

          if (findUserModel.length > 0) {
            logger.info(`Validate Token Ended.`);
            return this.mongo.createApiResponse(true, findUserModel[0]._id, '');
          } else {
            logger.info(`Unauthorized`);
            return this.mongo.createApiResponse(false, '', 'Unauthorized.');
          }
        } else {
          logger.info(`Unauthorized`);
          return this.mongo.createApiResponse(false, '', 'Unauthorized.');
        }
      } else {
        logger.info(`Bearer Token Verification`);
        const options = {
          expiresIn: '2d',
        };
        logger.info(`Verify Bearer Token`);
        let result = jwt.verify(
          token.token,
          Constants.JWT_CONSTANT_CONFIG.secret,
          options,
        );
        logger.info(`Validate Token Ended.`);
        return this.mongo.createApiResponse(true, result._id, '');
      }
    } catch (err) {
      logger.info(`Validate Token Ended With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, '', 'Unauthorized.');
    }
  }

  async emailVerificationLink(data: any) {
    try {
      logger.info(
        `Email Verification Link Started With Data : ${JSON.stringify(data)}`,
      );
      let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, {
        email: data.email,
      });
      logger.info(`Find User From DB`);

      let user = { ...findUserModel[0] };
      user.emailVerificationToken = this.makeid(6);
      user.isEmailVerified = false;
      let userId = user._id;
      delete user._id;
      let userEntityLog: any = this.mongo.update(
        CollectionNames.Users,
        user,
        userId,
      );
      logger.info(`Update User In DB`);
      logger.info(`Email Verification Link Ended.`);
      return this.mongo.createApiResponse(
        true,
        process.env.EMAIL_VERIFICATION_URL
          ? `http://${process.env.EMAIL_VERIFICATION_URL ??
          process.env.EMAIL_VERIFICATION_URL
          }?token=${user.emailVerificationToken}`
          : { code: user.emailVerificationToken },
        'This link will expire in 24 hours.',
      );
    } catch (err) {
      logger.info(`Email Verification Link Ended With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }

  async verifyEmail(data: any) {
    try {
      logger.info(`Verify Email Started With Data : ${JSON.stringify(data)}`);
      if (!data.token) {
        return this.mongo.createApiResponse(false, 'Verify Token Not Found.');
      }
      let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, {
        emailVerificationToken: data.token,
      });
      logger.info(`Find User From DB.`);

      if (findUserModel.length === 0) {
        return this.mongo.createApiResponse(false, '', 'User not found.');
      }
      let user = { ...findUserModel[0] };
      user.isEmailVerified = true;
      user.emailVerificationToken = null;
      let userId = user._id;
      delete user._id;
      let userEntityLog = this.mongo.update(
        CollectionNames.Users,
        user,
        userId,
      );
      logger.info(`Update User In DB.`);
      logger.info(`Verify Email Ended.`);
      return this.mongo.createApiResponse(
        true,
        '',
        'Email Verified Successfully',
      );
    } catch (err) {
      logger.info(`Verify Email Ended With Email : ${err.stack}.`);
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }

  async uploadImageForGoogleSignIn(
    profileUrl: string,
    profilePicture: number,
    userId: string,
  ) {
    try {
      const response = await this.httpService
        .get(profileUrl, { responseType: 'arraybuffer' })
        .toPromise();
      let baseDirectory = __dirname.replace('\\upload', '');
      await this.makeDirectory(baseDirectory);
      let filePath =
        baseDirectory + `\\images\\${new Date().getTime().toString()}.png`;
      await this.copyFile(filePath, response.data);
      await this.firebaseService.uploadToFirebase(
        filePath,
        `profilepicture_${userId}_v_${profilePicture + 1}`,
        'image/png',
      );
      await this.deleteFile(filePath);
      return response.data;
    } catch (err) {
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }

  // new login method implementation

  public async signupWithPhone(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Sign Up Started With Data : ${JSON.stringify(data)}`);
      let userData: any = { ...data.user };
      let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, {
        phoneNumber: userData.phoneNumber,
      });
      logger.info(`Check If   Exists`);

      if (findUserModel.length > 0) {
        return this.mongo.createApiResponse(
          false,
          '',
          'Phone Number Already Exists',
        );
      }
      userData.createdOn = Date.now()
      userData.createdBy = 'System';
      let id = new ObjectId();
      let addUserEntityLog: any = await this.mongo.update(
        CollectionNames.Users,
        userData,
        id,
      );
      logger.info(`Add User To DB`);

      let token = this.createToken({ _id: id });
      logger.info(`Sign Up Ended.`);
      return this.mongo.createApiResponse(true, { addUserEntityLog, token }, '');
    } catch (err) {
      logger.info(`Sign Up Ended With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, 'Something Went Wrong.');
    }
  }

  public async loginWithToken(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Login Started With Data : ${JSON.stringify(data)}`);
      var query: any = {
        $and: [],
      };
      if (data.credential.email) {
        query['$and'].push({ email: data.credential.email ?? null });
      } else {
        query['$and'].push({
          phoneNumber: data.credential.phoneNumber ?? null,
        });
      }
      let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, query);

      if (findUserModel.length === 0) {
        console.log('user length 0');
        return this.mongo.createApiResponse(false, '', 'User not found.');
      }
      let user = { ...findUserModel[0] };
      var token = this.makeid(6);
      if (data.credential.email) {
        user.password = await bcrypt.hash(token, Constants.BCRYPT_HASH_ROUNDS);
      } else {
        user.phoneNumberVerified = false;
      }
      let userId = user._id;
      delete user._id;
      let userEntityLog = this.mongo.update(
        CollectionNames.Users,
        user,
        userId,
      );
      logger.info(`Updating User In DB.`);
      user._id = userId;
      logger.info(`credential creating started Password Ended.`);
      return this.mongo.createApiResponse(
        true,
        { userEntityLog, token },
        'This code will expire in 24 hours.',
      );
    } catch (err) {
      logger.info(`Login Ended With Error : ${err.stack}.`);
      console.log(err);
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }

  public async verifyLoginToken(data: any): Promise<ResponseModel> {
    try {
      let findUserModel: any = await this.mongo.findByQuery(
        CollectionNames.Users,
        data.userId,
      );

      if (!findUserModel) {
        return this.mongo.createApiResponse(false, ' ', 'User not found.');
      } else {
        if (findUserModel.credentials.token == data.token) {
          findUserModel.emailVerified = true;
          findUserModel.credentials = null;
          let userId = findUserModel._id;
          delete findUserModel._id;
          let userEntityLog = this.mongo.update(
            CollectionNames.Users,
            findUserModel,
            userId,
          );
          logger.info(`Update User In DB.`);
          await this.mongo.findByQuery(CollectionNames.Users, userEntityLog);
          logger.info(`Verify Email Ended.`);
          let token = this.createToken({ _id: findUserModel._id });
          return this.mongo.createApiResponse(
            true,
            { token },
            'Token Verified Succesfully',
          );
        } else {
          return this.mongo.createApiResponse(false, '', 'Invalid Token');
        }
      }
    } catch (err) {
      logger.info(`Token Verification With Error : ${err.stack}.`);
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }

  public async firebaseLogin(data: any): Promise<ResponseModel> {
    try {
      logger.info(`Firebase Login Started With Data : ${JSON.stringify(data)}`);
      let accessTokenFlag =
        (await this.firebaseService.verifyAccessToken(data.token)) ===
          data.user.uid
          ? true
          : false;
      logger.info(`Firebase Verify Token Done.`);
      if (!accessTokenFlag) {
        return this.mongo.createApiResponse(false, '', 'Invalid Credentials');
      }
      // { userType: data.userType }
      var query: any = {
        $and: [],
      };
      if (data.user.email) {
        query['$and'].push({ email: data.user.email ?? null });
      } else {
        query['$and'].push({
          phoneNumber: data.user.phoneNumber ?? null,
        });
      }
      logger.info(query);
      let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, query);
      console.log('findUserModel');
      logger.info(`Find User From DB.`);

      logger.info('length of users ==0 line 1');
      if (findUserModel.length === 0 || !findUserModel[0].uid) {
        var userDoc: any = {};
        let userId = new ObjectId();
        if (findUserModel.length > 0) {
          userDoc = findUserModel[0];
          userId = findUserModel[0]._id;
        } else {
          userDoc._id = userId;
          if (data.user.email) {
            userDoc.email = data.user.email;
          }
          if (data.user.phoneNumber) {
            userDoc.phoneNumber = data.user.phoneNumber;
          }
        }
        userDoc.uid = data.user.uid;
        userDoc.modifiedOn = new Date().getTime().toString();
        userDoc.modifiedBy = 'System';
        let userEntityLog = this.mongo.update(
          CollectionNames.Users,
          userDoc,
          userId,
        );
        logger.info(`Add User To DB.`);
        // let user = await this.mongo.update(
        //   CollectionNames.Users,
        //   userEntityLog,
        //   '',
        // );
        console.log('length of users ==0 line secondLast');
        logger.info(`Social Login Ended.`);
        return this.mongo.createApiResponse(
          true,
          { user: userEntityLog, token: { accessToken: data.token } },
          'User Login Successfully',
        );
      } else {
        // Object.assign(user, data.user);
        console.log('else wala error');

        logger.info(`Social Login Ended.`);
        return this.mongo.createApiResponse(
          true,
          { user: findUserModel[0], token: { accessToken: data.token } },
          'User Login Successfull.',
        );
      }
    } catch (err) {
      logger.info(`Social Login Ended With Error : ${err.stack}.`);
      console.log(err);
      return this.mongo.createApiResponse(false, '', 'Something Went Wrong.');
    }
  }

  //PRIVATE FUNCTIONS

  private createToken({ _id }: any): any {
    const expiresIn = Constants.JWT_CONSTANT_CONFIG.expiresIn;

    const user: any = { _id };
    const accessToken = jwt.sign(user, Constants.JWT_CONSTANT_CONFIG.secret);
    return {
      expiresIn,
      accessToken,
    };
  }

  private diff_minutes(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  private makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    if (process.env.CODE_PATTERN) {
      characters = process.env.CODE_PATTERN;
    }
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private async deleteFile(filepath: string) {
    return new Promise((resolve, reject) => {
      try {
        fs.unlinkSync(filepath);
        resolve(true);
      } catch (ex) {
        reject(false);
      }
    });
  }

  private async makeDirectory(baseDirectory: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        fs.mkdir(baseDirectory + `\\images\\`, () => {
          resolve(true);
        });
      } catch (ex) {
        reject(false);
      }
    });
  }

  private async copyFile(filePath: string, buffer: any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (typeof Buffer.from === 'function') {
        fs.writeFile(filePath, Buffer.from(buffer), () => {
          resolve(true);
        });
      } else {
        reject(false);
      }
    });
  }

  private async uploadAvatar(
    fullName: string,
    userId: string,
    profilePicture: number,
  ) {
    let baseDirectory = __dirname.replace('\\upload', '');
    await this.makeDirectory(baseDirectory);
    let filePath =
      baseDirectory + `\\images\\${new Date().getTime().toString()}.png`;
    const output = createWriteStream(filePath);
    await createAvatar(
      {
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').length > 1 ? fullName.split(' ')[1] : '',
      },
      output,
    );
    await this.firebaseService.uploadToFirebase(
      filePath,
      `profilepicture_${userId}_v_${profilePicture + 1}`,
      'image/png',
    );
    await this.deleteFile(filePath);
  }

  async validateResetPasswordToken(data: any) {
    console.log('validateResetPasswordToken begins');
    if (!data.token) {
      return this.mongo.createApiResponse(
        false,
        {},
        'Password Reset Token Not Found.',
      );
    }
    let findUserModel: any = await this.mongo.findByQuery(CollectionNames.Users, {
      'forgetPassword.newPasswordToken': data.token,
    });

    if (findUserModel.length === 0) {
      return this.mongo.createApiResponse(
        false,
        {},
        'Password Reset Token Is Invalid.',
      );
    } else {
      let user = { ...findUserModel[0] };
      let diffInMinutes = this.diff_minutes(
        new Date(),
        new Date(user.forgetPassword.timestamp),
      );

      if (diffInMinutes > 60) {
        return this.mongo.createApiResponse(
          false,
          { isValid: false },
          'The forget password link has expired.',
        );
      }
      return this.mongo.createApiResponse(
        true,
        {},
        'Password Reset Token Is Valid',
      );
    }
  }
}
