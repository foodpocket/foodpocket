/* eslint-disable camelcase */
import api, { getToken } from '@/libs/apis/BaseApi';

export default class VisitRecordApi {
  static async create(restaurantId: string, visitDate: number): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('restaurant_uid', restaurantId);
    formdata.append('visit_date', String(visitDate));

    await api.post('api/rest/newVisit/', formdata);
  }

  static async getVisitRecords(pocketId: string): Promise<any[]> {
    const token = getToken();

    const result = await api.get('api/rest/getVisitRecords/', { params: { user_token: token, pocket_uid: pocketId } });
    return result.data.data;
  }

  static async update(visitRecordId: string, visitDate: number): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('visitrecord_uid', visitRecordId);
    formdata.append('visit_date', String(visitDate));

    await api.post('api/rest/editVisitRecord/', formdata);
  }

  static async remove(visitRecordId: string): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('visitrecord_uid', visitRecordId);

    await api.post('api/rest/removeVisitRecord/', formdata);
  }
}
