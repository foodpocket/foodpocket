<template>
  <div class="message-alert">
    <div class="alert alert-dismissible py-2 m-0"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close p-2" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      messages: [
        // {
        //   message: '輸入錯誤',
        //   status: 'danger'
        // }
      ]
    }
  },
  methods: {
    // push message and auto remove it after 3 seconds
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        id: timestamp // use push timestamp as id
      })

      // auto remove message
      this.removeMessageById(timestamp, 3000)
    },

    // push message with self-defined trackId
    // message will not be removed until user remove it by trackId
    showMessage (message, status, trackId) {
      this.messages.push({
        message,
        status,
        id: trackId
      })
    },

    // remove message by index
    removeMessage (index) {
      this.messages.splice(index, 1)
    },

    // remove message by id with delay (ms)
    removeMessageById (id, delay = 0) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.id === id) {
            vm.messages.splice(i, 1)
          }
        })
      }, delay)
    }
  },
  created () {
    const vm = this

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
    // vm.$bus.$emit('message:push');

    // 自定義名稱 'messsage:show'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // trackId: 自定義id, 用於刪除此message
    vm.$bus.$on('message:show', (message, status = 'warning', trackId) => {
      vm.showMessage(message, status, trackId)
    })

    // 自定義名稱 'messsage:remove'
    // trackId: 指定欲刪除的message id
    vm.$bus.$on('message:remove', (trackId) => {
      vm.removeMessageById(trackId)
    })
  }
}
</script>

<style lang="scss" scope>
.message-alert {
  position: fixed;
  width: 100%;
  bottom: 0px;
  z-index: 1100;

  .alert-dismissible {
    padding-right: 0;
  }
}
.alert {
  border-radius: 0;
}
</style>
