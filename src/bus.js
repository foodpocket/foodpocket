import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// 使用提示：
// vm.$bus.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String):Alert的樣式

// this.$bus.$emit('message:push', '輸入錯誤', 'danger')
