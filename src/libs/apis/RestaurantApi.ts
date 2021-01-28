/* eslint-disable camelcase */
import api, { getToken } from '@/libs/apis/BaseApi';

export default class RestaurantApi {
  static async create(restaurantName: string, pocketId: string): Promise<string> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('name', restaurantName);
    formdata.append('pocket_uid', pocketId);

    const result = await api.post('api/rest/newRestaurant/', formdata);
    return result.data.data.restaurant_uid;
  }

  static async getRecommendList(pocketId: string): Promise<any[]> {
    const token = getToken();

    const result = await api.get('api/rest/getRecommendList/', { params: { user_token: token, pocket_uid: pocketId } });
    return result.data.data;
  }

  static async getRestaurantList(pocketId: string): Promise<any[]> {
    const token = getToken();

    const result = await api.get('api/rest/getRestaurantList/', { params: { user_token: token, pocket_uid: pocketId } });
    return result.data.data;
  }

  static async update(restaurantId: string, newName: string, newNote: string, status: string, nextHideUntil: number): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('restaurant_uid', restaurantId);
    formdata.append('name', newName); // 更改name
    formdata.append('note', newNote); // 更改note
    formdata.append('status', status); // 更改status

    if (status === 'HIDE') {
      formdata.append('hide_until', String(nextHideUntil)); // 更改hide_until
    }

    await api.post('api/rest/editRestaurant/', formdata);
  }

  static async remove(restaurantId: string): Promise<void> {
    const token = getToken();
    const formdata = new FormData();
    formdata.append('user_token', token);
    formdata.append('restaurant_uid', restaurantId);

    await api.post('api/rest/removeRestaurant/', formdata);
  }
}
