<template>
  <div class="foodpocket">
    <!-- 主畫面 -->
    <div class="container">
      <div class="logout">
        <button class="btn btn-danger btn-sm mb-2" @click="logout">登出</button>
      </div>
      <!-- 輸入新資訊區 -->
      <div class="input-group mb-3">
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
          <button class="btn btn-primary w-100" type="button" @click="addRestaurant">新增</button>
        </div>
      </div>
      <!-- 主要卡片內容區(分三塊 頭、身體、腳) -->
      <div class="main-area card text-center">
        <div class="card-header">
          <!-- card-header 過濾資訊標籤(頭) -->
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'all'}"
                @click.prevent="visibility = 'all'"
                href="#"
              >全部餐廳</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'recommend'}"
                @click.prevent="visibility = 'recommend'"
                href="#"
              >推薦餐廳</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'record'}"
                @click.prevent="visibility = 'record'"
                href="#"
              >歷史紀錄</a>
            </li>
          </ul>
        </div>

        <ul class="list-group list-group-flush text-left">
          <!-- list內容區域(身體) -->
          <li class="list-group-item" v-for="(item, key) in filteredMethod" :key="key">
            <div class="d-flex">
              <!-- v-if="item.id !== cacheTodo.id" -->
              <div class="restaurant-list">
                <div class="restaurant-name">{{ item.restaurant_name }}</div>
                <div class="restaurant-description">
                  <div class="visited-times" v-if="visibility == 'all'">吃過 {{rightvisitedTimes[key]}} 次</div>
                  <!-- <div class="visited-times" v-if="visibility == 'recommend'">吃過 {{reversedvisitedTimes[key]}} 次</div> -->
                  <div class="lastTime" v-if="visibility == 'all'">上次到訪日期： {{item.visit_date}}</div>
                  <div class="lastTime" v-if="visibility == 'recommend'">上次到訪日期： {{item.visit_date}}</div>
                  <div class="lastTime" v-if="visibility == 'record'">日期： {{item.visit_date}}</div>
                </div>
              </div>
              <button class="btn btn-outline-primary btn-sm ml-auto" v-if="visibility == 'record'" @click="openModal(item)">編輯</button>
            </div>
          </li>
        </ul>

        <div class="card-footer d-flex justify-content-between">
          <!-- card-footer註腳區域(腳) -->
          <span v-if="visibility == 'all'">總共有 {{rightvisitedTimes.length}} 家好吃的餐廳</span>
          <span v-if="visibility == 'recommend'">總共有 {{rightvisitedTimes.length}} 家好吃的餐廳</span>
          <span v-if="visibility == 'record'">總共吃了 {{recordsNumber}} 餐</span>
        </div>
      </div>
    </div>

    <!-- 編輯鈕按下之後的編輯卡片區 -->
    <div
      class="modal fade"
      id="restaurantModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="restaurantModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 編輯卡片區-header -->
            <h5 class="modal-title" id="restaurantModalLabel">
              <span>編輯到訪餐廳資訊</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片區-body (2題) -->

            <div class="form-group">
              <label for="name">餐廳名稱</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="modelRestaurant.restaurant_name"
              />
            </div>

            <div class="form-group">
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" :value="modelRestaurant.visit_date" />
              <!-- v-model="modelRestaurant.date" -->
            </div>
          </div>

          <div
            class="modal fade"
            id="delRestaurantModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="delRestaurantModalLabel"
            aria-hidden="true"
          >
            <!-- 刪除按鈕按下去後的刪除卡片確認區 -->
            <div class="modal-dialog" role="document">
              <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                  <!-- modal-header -->
                  <h5 class="modal-title" id="delRestaurantModalLabel">
                    <span>刪除產品</span>
                  </h5>
                  <button type="button" class="close" aria-label="Close" @click="dontdelRestaurant">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body">
                  <!-- 刪除卡片確認區-body -->
                  是否刪除
                  <strong class="text-danger">{{modelRestaurant.restaurant_name}}</strong> 餐廳？
                  <br />(刪除後將無法恢復)
                </div>

                <div class="modal-footer">
                  <!-- 刪除卡片確認區-footer -->
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm"
                    @click="dontdelRestaurant"
                  >取消</button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="delRestaurant"
                    data-dismiss="modal"
                  >確認刪除</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <!-- 編輯卡片區-footer (按鈕*3)-->
            <button class="btn btn-outline-danger btn-sm" @click="opendelModal()">刪除</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-sm" @click="updateRestaurant">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      token: '',
      newRestaurant: '', // 取得內容暫放處
      newDate: '', // 取得內容暫放處
      newRestaurant_uid: '', // 取得內容暫放處
      visitRecords: [], // 由API匯入
      isNew: false,
      modelRestaurant: {
        // model取得內容暫放處
        create_time: '',
        restaurant_uid: '',
        restaurant_name: '',
        visit_date: ''
      },
      visibility: 'all' // 'all' 'recommend' 'record' 原始資料送來的是record
    }
  },
  created () {
    this.getToken()
  },
  computed: { // visitedTimes的部分有點分不清楚 並沒有被加入原本object中 顯得不同步
    recordsNumber: function () {
      return this.visitRecords.length
    },
    // visitedTimes: function () {
    //   if (this.visibility === 'all') {
    //     return this.rightvisitedTimes
    //   } else if (this.visibility === 'record') {
    //     return this.reversedvisitedTimes
    //   }
    //   return ''
    // },
    rightvisitedTimes: function () {
      const obj = {}
      this.recordNameList.forEach(word => {
        if (!obj[word]) obj[word] = 0
        obj[word]++
      })
      // console.log('obj:', obj)
      console.log('Object.values():', Object.values(obj))
      return Object.values(obj)
    },
    reversedvisitedTimes: function () {
      const array = []
      const list = this.visitedTimes
      list.forEach(item => {
        const reverse = Object.assign({}, item)
        array.push(reverse)
      })
      const reversedvisitedTimes = list.reverse()
      console.log('reversedvisitedTimes:', reversedvisitedTimes)
      return reversedvisitedTimes
    },
    recordNameList: function () {
      const recordNameList = []
      const list = this.visitRecords
      list.forEach(item => {
        recordNameList.push(item.restaurant_name)
      })
      return recordNameList
    },
    restaurantList: function () {
      const repeatindex = []
      this.recordNameList.forEach(item => {
        const index = this.recordNameList.indexOf(item)
        repeatindex.push(index)
      }) // console.log('repeatindex:', repeatindex)

      const norepeat = Array.from(new Set(repeatindex))
      // console.log('norepeat:', norepeat)

      const restaurantList = []
      for (let index = 0; index < norepeat.length; index++) {
        const element = norepeat[index]
        restaurantList.push(this.visitRecords[element])
      }

      return restaurantList
    },
    recommendList: function () {
      const array = []
      const list = this.restaurantList
      list.forEach(item => {
        const reverse = Object.assign({}, item)
        array.push(reverse)
      })
      const recommendList = array.reverse()
      return recommendList
    },
    filteredMethod: function () {
      if (this.visibility === 'all') {
        console.log('all_List:', this.restaurantList)
        return this.restaurantList
      } else if (this.visibility === 'record') {
        console.log('record_List:', this.visitRecords)
        return this.visitRecords
      } else if (this.visibility === 'recommend') {
        console.log('recommend_List:', this.recommendList)
        return this.recommendList
      }
      return '沒有出現什麼問題 但不知道為什麼這裡非需要一個return'
    }
  },
  methods: {
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
        window.alert('登出成功')
        this.$router.push('/loginpage')
      }
    },
    getToken: function () {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        console.log('getToken:', this.token)
        this.getVisitRecords()
      } else {
        this.$router.push('/loginpage')
      }
    },
    getVisitRecords: function () {
      const api = 'https://brycehuang.com/api/rest/getVisitRecords/'
      const vm = this
      this.$http
        .get(api, { params: { user_token: vm.token } })
        .then(response => {
          console.log('getVisitRecords:', response.data)
          vm.visitRecords = response.data.data
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },
    addRestaurant: function () {
      // 這裡處理日期欄位------------------------
      if (this.newDate === '') {
        this.newDate = Math.floor(Date.now())
      }
      const timestampNumber = Math.floor(
        new Date(this.newDate).getTime() / 1000
      )
      const timestamp = this.changedateFormat(timestampNumber)
      console.log('timestampNumber:', timestampNumber)
      console.log('timestampFormat:', timestamp)

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
      console.log('array.indexOf:', index)
      if (index === -1) {
        this.isNew = true // 新的
      } else {
        this.isNew = false // 舊的
      }
      // --------------------- 用isNew分辨是否是新的餐廳，再做出相應的動作
      if (this.isNew === true) {
        console.log('這是新的餐廳')
        this.postNewRestaurant(restaurantName, timestamp)
      } else {
        console.log('這間餐廳已經存在')
        this.restaurant_name = this.visitRecords[index].restaurant_name
        this.newRestaurant_uid = this.visitRecords[index].restaurant_uid
        console.log(
          'restaurant_name:',
          this.restaurant_name,
          'newRestaurant_uid:',
          this.newRestaurant_uid
        )
        this.postNewVisit(this.newRestaurant_uid, timestamp) // 增加歷史紀錄
      }
      // 完成後將input復原成空的------------------------
      this.newRestaurant = ''
      this.newDate = ''
    },
    postNewRestaurant: function (restaurantName, timestamp) {
      const api = 'https://brycehuang.com/api/rest/newRestaurant/'
      const formdata = new FormData()
      formdata.append('name', restaurantName)
      formdata.append('user_token', this.token)
      this.axios.post(api, formdata).then(response => {
        console.log('postNewRestaurant:', response.data)
        this.newRestaurant_uid = response.data.data.restaurant_uid
        console.log(
          'restaurantName:',
          restaurantName,
          'newRestaurant_uid:',
          this.newRestaurant_uid,
          'timestamp:',
          timestamp
        )

        this.postNewVisit(this.newRestaurant_uid, timestamp)
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    postNewVisit: function (id, timestamp) {
      const api = 'https://brycehuang.com/api/rest/newVisit/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('restaurant_uid', id)
      formdata.append('visit_date', timestamp)
      // this.visited = this.visited + 1,
      this.axios.post(api, formdata).then(response => {
        console.log('postNewVisit:', response.data)
        this.getVisitRecords()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    openModal: function (item) {
      $('#restaurantModal').modal('show')
      this.modelRestaurant = Object.assign({}, item)
    },
    opendelModal: function () {
      $('#delRestaurantModal').modal('show')
    },
    updateRestaurant: function () {
      $('#restaurantModal').modal('hide')
      console.log('成功編輯')
    },
    delRestaurant: function () {
      $('#delRestaurantModal').modal('hide')
      console.log('成功刪除')
    },
    dontdelRestaurant: function () {
      $('#delRestaurantModal').modal('hide')
      console.log('取消刪除')
    },
    changedateFormat: function (timestamp) {
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

<style lang="scss" scoped>
.logout{
  position: absolute;
  top: 10px;
  right: 10px;
  .btn{
    padding: 3px;
  }
}
.main-area{
  margin: 20px auto;
  .restaurant-list {
    .restaurant-name {
      font-size: 1.2rem;
    }
    .restaurant-description {
      display: flex;
      font-size: 0.8rem;
      .visited-times {
        margin-right: 5px;
      }
    }
  }
}
</style>
