<template>
  <div class="quicklyAdd">
    <div class="container">
    <div class="input-group pt-3">
      <div class="col-12 input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">餐廳名稱</span>
        </div>
        <input type="text" class="form-control" placeholder="請輸入餐廳名稱" v-model="newRestaurant" />
      </div>

      <div class="col-12 input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">到訪日期</span>
        </div>
        <input type="date" class="form-control" id="date" v-model="newDate" />
      </div>

      <div class="col-12 input-group mb-3">
        <button class="btn btn-primary w-100" type="button" @click="quicklyAdd">快速新增</button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    msg: String
  },
  data () {
    return {
      token: '',
      newRestaurant: '', // 快速新增內容暫放處
      newRestaurant_uid: '', // 快速新增內容暫放處
      newDate: this.changedateFormat(Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)), // 快速新增內容暫放處
      visitRecords: [], // 由API匯入
      restaurantList: [], // 由API匯入
      isNew: false
    }
  },
  created () {
    this.getToken()
  },
  methods: {
    // 必備----------------------------
    getToken () {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        // console.log('getToken:', this.token)
        this.initList()
      } else {
        this.$router.push('/loginpage')
      }
    },
    getRestaurantList () {
      const api = 'https://brycehuang.com/api/rest/getRestaurantList/'
      const vm = this
      this.$http
        .get(api, { params: { user_token: vm.token } })
        .then(response => {
          // console.log('restaurantList:', response.data)
          vm.restaurantList = response.data.data
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },
    getVisitRecords () {
      const api = 'https://brycehuang.com/api/rest/getVisitRecords/'
      const vm = this
      this.$http
        .get(api, { params: { user_token: vm.token } })
        .then(response => {
          // console.log('getVisitRecords:', response.data)
          vm.visitRecords = response.data.data
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },
    initList () {
      this.getRestaurantList()
      this.getVisitRecords()
    },
    // 快速新增鈕------------------------------
    quicklyAdd () {
      // 這裡處理日期欄位------------------------
      const timestampNumber = Math.floor(
        new Date(this.newDate).getTime() / 1000
      )
      const timestamp = this.changedateFormat(timestampNumber)
      // console.log('timestampNumber:', timestampNumber)
      // console.log('timestampFormat:', timestamp)

      // 這裡處理餐廳名稱欄位------------------------
      const restaurantName = this.newRestaurant.trim() // 修掉輸入的空白
      if (!restaurantName) {
        return
      }
      // --------------------- 確定輸入的名稱是否曾經輸入過
      const array = []
      const list = this.visitRecords
      list.forEach(item => {
        const restaurant = item.restaurant_name
        array.push(restaurant)
      })
      const index = array.indexOf(restaurantName)
      // console.log('array.indexOf:', index)
      if (index === -1) {
        this.isNew = true // 新的
      } else {
        this.isNew = false // 舊的
      }
      // --------------------- 用isNew分辨是否是新的餐廳，再做出相應的動作
      if (this.isNew === true) {
        console.log('這是新的餐廳，已加入餐廳列表中，並同時增加次數一次')
        this.quicklyAddRestaurant(restaurantName, timestamp) // 輸入的字
      } else {
        console.log('這間餐廳已經存在，已增加次數一次')
        this.newRestaurant_uid = this.visitRecords[index].restaurant_uid // 取出記錄中的餐廳id
        this.quicklyAddVisit(this.newRestaurant_uid, timestamp) // 增加歷史紀錄
      }
      // 完成後將input復原原樣的------------------------
      this.newRestaurant = ''
      this.newDate = this.changedateFormat(Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)) // 恢復
    },
    quicklyAddRestaurant (restaurantName, timestamp) { // 類似addRestaurant() + addVisitRecord()
      const api = 'https://brycehuang.com/api/rest/newRestaurant/'
      const formdata = new FormData()
      formdata.append('name', restaurantName)
      formdata.append('user_token', this.token)
      this.axios.post(api, formdata).then(response => {
        // console.log('quicklyAddRestaurant:', response.data)
        this.newRestaurant_uid = response.data.data.restaurant_uid
        this.quicklyAddVisit(this.newRestaurant_uid, timestamp)
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    quicklyAddVisit (id, timestamp) { // 類似addVisitRecord()
      const api = 'https://brycehuang.com/api/rest/newVisit/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('restaurant_uid', id)
      formdata.append('visit_date', timestamp)
      this.axios.post(api, formdata).then(response => {
        // console.log('quicklyAddVisit:', response.data)
        this.initList()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    // 其他---------------------------------
    changedateFormat (timestamp) {
      const date = new Date(timestamp * 1000)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      if (month < 10) {
        const addzeromonth = '0' + month
        if (day < 10) {
          const addzeroday = '0' + day
          const currentDateTime =
            String(year) +
            '-' +
            String(addzeromonth) +
            '-' +
            String(addzeroday)
          return currentDateTime
        } else {
          const currentDateTime =
            String(year) + '-' + String(addzeromonth) + '-' + String(day)
          return currentDateTime
        }
      }
      if (day < 10) {
        const addzeroday = '0' + day
        if (month < 10) {
          const addzeromonth = '0' + month
          const currentDateTime =
            String(year) +
            '-' +
            String(addzeromonth) +
            '-' +
            String(addzeroday)
          return currentDateTime
        } else {
          const currentDateTime =
            String(year) + '-' + String(month) + '-' + String(addzeroday)
          return currentDateTime
        }
      } else {
        const currentDateTime =
          String(year) + '-' + String(month) + '-' + String(day)
        return currentDateTime
      }
    }
  }
}
</script>

<style scoped lang="scss">
.quicklyAdd{
  background-color: #555; // component color
}

</style>
