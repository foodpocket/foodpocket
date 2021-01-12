/* eslint-disable camelcase */
import AccountApi from '@/apis/AccountApi';
import vm from '@/main';
import bus from '@/components/bus.vue';

export default class AccountHandler {
  /**
   * 處理所有登入前後的相關事務，呼叫者只需提供username, password，
   * 呼叫完後不需處理回傳值、狀態轉換。（？ 這樣好嗎？或許還是把一些控制權給caller較彈性
   * @param username
   * @param password
   */
  static async login(username: string, password: string): Promise<void> {
    try {
      vm.$store.commit('startLoading');
      const { token, last_pocket } = await AccountApi.login(username, password);

      vm.$cookies.set('token', token);

      vm.$cookies.set('getpocketid', last_pocket.pocket_uid); // 放到cookies
      vm.$cookies.set('getpocketname', last_pocket.name); // 放到cookies
      vm.$cookies.set('username', username);

      vm.$router.push('/foodpocket');
    } catch (error) {
      // vm.$bus.$emit('message:push', '帳號或密碼輸入錯誤，請再試一次', vm.$store.state.dangerbus);
    } finally {
      vm.$store.commit('stopLoading');
    }
  }
}
