/* eslint-disable camelcase */
import api, { getToken } from '@/libs/apis/BaseApi';

export default class PocketApi {
  static async create(newPocketName: string): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('name', newPocketName);

    const result = await api.post('api/rest/newPocket/', formdata);
    return result.data;
  }

  static async getPockets(): Promise<any[]> {
    const token = getToken();

    const result = await api.get('api/rest/getPocketList/', { params: { user_token: token } });
    return result.data.data;
  }

  static async update(pocketId: string, pocketName: string): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('pocket_uid', pocketId);
    formdata.append('name', pocketName);

    const result = await api.post('api/rest/editPocket/', formdata);
    return result.data;
  }

  static async remove(pocketId: string): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('pocket_uid', pocketId);

    const result = await api.post('api/rest/removePocket/', formdata);
    return result.data;
  }
}
