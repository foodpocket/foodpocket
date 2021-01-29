/* eslint-disable camelcase */
import api from '@/libs/apis/BaseApi';

export interface LoginResultModel {
  token: string;
  last_pocket: {
    name: string;
    pocket_uid: string;
  };

}

export default class AccountApi {
  static async login(username: string, password: string): Promise<LoginResultModel> {
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);

    const result = await api.post('api/rest/loginAccount/', formdata);
    return result.data.data;
  }

  static async register(username: string, password: string, email: string): Promise<void> {
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append('password', password);
    formdata.append('email', email);

    const result = await api.post('api/rest/registerAccount/', formdata);
    return result.data.data;
  }
}
