import Vue from 'vue';

export const MessageType = {
  successbus: {
    bg: '#008800cc',
    color: '#fff',
  },
  dangerbus: {
    bg: '#c40000cc',
    color: '#fff',
  },
  infobus: {
    bg: '#ffc107cc',
    color: '#000',
  },
};

const bus = new Vue();
Vue.prototype.$bus = bus;

export default bus;

// 使用提示：
// vm.$bus.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String):Alert的樣式

// this.$bus.$emit('message:push', '輸入錯誤', 'danger')
