/* eslint-disable camelcase */
import api from '@/libs/apis/BaseApi';
import vm from '@/main';

export default class PocketApi {
  static async create(newPocketName: string): Promise<void> {
    const token = PocketApi.getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('name', newPocketName);

    const result = await api.post('api/rest/newPocket/', formdata);
    return result.data;
  }

  static async getPockets(): Promise<any[]> {
    const token = PocketApi.getToken();

    const result = await api.get('api/rest/getPocketList/', { params: { user_token: token } });
    return result.data.data;
  }

  static async update(pocketId: string, pocketName: string): Promise<void> {
    const token = PocketApi.getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('pocket_uid', pocketId);
    formdata.append('name', pocketName);

    const result = await api.post('api/rest/editPocket/', formdata);
    return result.data;
  }

  static async remove(pocketId: string): Promise<void> {
    const token = PocketApi.getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('pocket_uid', pocketId);

    const result = await api.post('api/rest/removePocket/', formdata);
    return result.data;
  }

  // temp function for refactoring
  static getToken(): string {
    if (vm.$cookies.isKey('token')) {
      return PocketApi.getToken();
    }
    vm.$router.push('/loginpage');
    throw new Error('token not found');
  }
}
