<template>
  <div class="foodpocket">
    <div id="nav">
      <h1>FoodPocket 食物口袋</h1>
      <div class="logout">
        <button class="btn btn-info btn-sm" @click="logout">登出</button>
      </div>
    </div>
    <!-- 主畫面 -->
    <div class="container">
      <!-- 輸入新資訊區 -->
      <div class="input-group mt-3">
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

        <!-- 搜尋區 -->
        <div class="input-group mt-3" v-if="visibility == 'all'">
          <div class="col-12 input-group mb-3">
            <input type="text" class="form-control" placeholder="快速搜尋" v-model="searchRestaurant" />
          </div>
        </div>

        <ul class="list-group list-group-flush text-left">
          <!-- list內容區域(身體) -->
          <li class="list-group-item" v-for="(item, key) in filteredMethod" :key="key">
            <div class="d-flex align-items-center">
              <div class="restaurant-list">
                <div class="restaurant-name">{{ item.restaurant_name }}</div>
                <div class="restaurant-description">
                  <div class="visited-times" v-if="visibility == 'all'">吃過 {{item.visit_dates.length}} 次</div>
                  <div class="lastTime" v-if="visibility == 'all'">上次到訪日期： {{item.visit_dates[0]}}</div>
                  <div class="lastTime" v-if="visibility == 'recommend'">上次到訪日期： {{item.visit_dates[0]}}</div>
                  <div class="lastTime" v-if="visibility == 'record'">日期： {{item.visit_date}}</div>
                </div>
              </div>
              <!-- <a v-if="visibility == 'all'" @click.prevent="openEditModal(item)">編輯</a>
              <a v-if="visibility == 'all'" @click.prevent="openEditModal(item)">加</a> -->
              <button class="btn btn-outline-primary btn-sm ml-auto"
              v-if="visibility == 'record'" @click="openEditModal(item)">編輯</button>
            </div>
          </li>
        </ul>

        <div class="card-footer d-flex justify-content-between">
          <!-- card-footer註腳區域(腳) -->
          <span v-if="visibility == 'all'">總共有 {{restaurantList.length}} 家好吃的餐廳</span>
          <span v-if="visibility == 'recommend'">總共有 {{recommendList.length}} 家好吃的餐廳</span>
          <span v-if="visibility == 'record'">總共吃了 {{visitRecords.length}} 餐</span>
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
              <span>編輯到訪 {{modelRestaurant.restaurant_name}} 日期</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片區-body (2題) -->

            <div class="form-group" v-if="visibility !== 'record'">
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
              <input type="date" class="form-control" id="date" v-model="modelRestaurant.visit_date" />
              <!-- v-model="modelRestaurant.date" -->
            </div>
          </div>

          <div class="modal-footer">
            <!-- 編輯卡片區-footer (按鈕*3)-->
            <button class="btn btn-outline-danger btn-sm" @click="openDeleteModal()">刪除</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-sm" @click="editVisitRecord(modelRestaurant)">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除按鈕按下去後的刪除卡片確認區 -->
    <div
      class="modal fade"
      id="delRestaurantModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="delRestaurantModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <!-- modal-header -->
            <h5 class="modal-title" id="delRestaurantModalLabel"><span>刪除產品</span></h5>
            <button type="button" class="close" aria-label="Close" @click="doNotDelete(modelRestaurant)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 刪除卡片確認區-body -->
            是否刪除
            <strong class="text-danger">{{modelRestaurant.visit_date}}</strong>
            到訪<strong>{{modelRestaurant.restaurant_name}}</strong>的紀錄？
            <br />(刪除後將無法恢復)
          </div>

          <div class="modal-footer">
            <!-- 刪除卡片確認區-footer -->
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="doNotDelete(modelRestaurant)"
            >取消</button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              @click="removeVisitRecord(modelRestaurant)"
              data-dismiss="modal"
            >確認刪除</button>
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
      searchRestaurant: '', // 搜尋的字串
      newRestaurant: '', // 取得內容暫放處
      newDate: '', // 取得內容暫放處
      newRestaurant_uid: '', // 取得內容暫放處
      visitRecords: [], // 由API匯入
      restaurantListAPI: [], // 由API匯入
      isNew: false,
      modelRestaurant: {
        // model取得內容暫放處
        create_time: '',
        restaurant_uid: '',
        restaurant_name: '',
        visit_date: '',
        visitrecord_uid: ''
      },
      visibility: 'all' // 'all' 'recommend' 'record' 原始資料送來的是record
    }
  },
  created () {
    this.init_getToken()
  },
  computed: {
    // 以下取消使用，以此紀念-----
    visitedTimes: function () {
      const map = {}
      this.recordNameList.forEach(restaurantName => {
        if (!map[restaurantName]) map[restaurantName] = 0
        map[restaurantName]++
      })
      // console.log('obj:', obj)
      console.log('Object.values():', Object.values(map))
      return Object.values(map)
    },
    recordNameList: function () {
      const recordNameList = []
      const list = this.visitRecords
      list.forEach(item => {
        recordNameList.push(item.restaurant_name)
      })
      return recordNameList
    },
    restaurantList1: function () {
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
    recommendList1: function () {
      const array = []
      const list = this.restaurantList
      list.forEach(item => {
        const reverse = Object.assign({}, item)
        array.push(reverse)
      })
      const recommendList = array.reverse()
      return recommendList
    },
    // -----------------------
    restaurantMap () {
      const map = new Map()
      this.visitRecords.forEach(record => {
        if (!map.has(record.restaurant_name)) { // 如果api來的資料中沒有這個名字的話
          map.set(record.restaurant_name, {
            // 就加入restaurant_uid、restaurant_name、visit_dates(自己創的)
            restaurant_uid: record.restaurant_uid,
            restaurant_name: record.restaurant_name,
            visit_dates: [record.visit_date]
          })
        } else { // 如果有的話
          map.get(record.restaurant_name).visit_dates.push(record.visit_date)
          // 就把這個餐廳的visit_dates加到visit_dates的array中
        }
      })
      // console.log('map:', map)
      return map
    },
    restaurantList () {
      return Array.from(this.restaurantMap.values())
    },
    recommendList () {
      return Array.from(this.restaurantMap.values()).reverse()
    },
    searchResult: function () {
      const nameArray = []
      this.restaurantList.forEach(restaurantObject => {
        const indexOf = restaurantObject.restaurant_name.indexOf(this.searchRestaurant)
        if (indexOf >= 0) {
          nameArray.push(restaurantObject.restaurant_name)
        }
      })
      const result = []
      for (let index = 0; index < this.restaurantList.length; index++) {
        nameArray.forEach(searchname => {
          if (this.restaurantList[index].restaurant_name === searchname) {
            result.push(this.restaurantList[index])
          }
        })
      }
      console.log('result:', result)
      return result
    },
    filteredMethod: function () {
      if (this.visibility === 'all') {
        if (this.searchRestaurant !== '') {
          return this.searchResult
        } else {
          console.log('all_List:', this.restaurantList)
          return this.restaurantList
        }
      } else if (this.visibility === 'record') {
        console.log('record_List:', this.visitRecords)
        return this.visitRecords
      } else if (this.visibility === 'recommend') {
        console.log('recommend_List:', this.recommendList)
        return this.recommendList
      }
      return ''
    }
  },
  methods: {
    getRestaurantList: function () {
      const api = 'https://brycehuang.com/api/rest/getRestaurantList/'
      const vm = this
      this.$http
        .get(api, { params: { user_token: vm.token } })
        .then(response => {
          // console.log('restaurantListAPI:', response.data)
          vm.restaurantListAPI = response.data.data
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },
    init_getToken: function () {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        console.log('getToken:', this.token)
        this.getRestaurantList()
        this.getVisitRecords()
      } else {
        this.$router.push('/loginpage')
      }
    },
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
      }
      window.alert('登出成功')
      this.$router.push('/loginpage')
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
          'restaurantName:', restaurantName,
          'newRestaurant_uid:', this.newRestaurant_uid,
          'timestamp:', timestamp
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
      this.axios.post(api, formdata).then(response => {
        console.log('postNewVisit:', response.data)
        this.getVisitRecords()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    editVisitRecord: function (item) {
      const api = 'https://brycehuang.com/api/rest/editVisitRecord/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('visitrecord_uid', item.visitrecord_uid)
      formdata.append('visit_date', item.visit_date)
      this.axios.post(api, formdata).then(response => {
        // console.log('editVisitRecord:', response.data)
        console.log('成功編輯')
        $('#restaurantModal').modal('hide')
        this.getVisitRecords()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    removeVisitRecord: function (item) {
      const api = 'https://brycehuang.com/api/rest/removeVisitRecord/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('visitrecord_uid', item.visitrecord_uid)
      this.axios.post(api, formdata).then(response => {
        // console.log('removeVisitRecord:', response.data)
        console.log('成功刪除')
        $('#delRestaurantModal').modal('hide')
        this.getVisitRecords()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    openEditModal: function (item) {
      $('#restaurantModal').modal('show')
      this.modelRestaurant = Object.assign({}, item)
    },
    openDeleteModal: function () {
      $('#delRestaurantModal').modal('show')
      $('#restaurantModal').modal('hide')
    },
    doNotDelete: function (item) {
      $('#delRestaurantModal').modal('hide')
      this.openEditModal(item)
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
#nav {
  padding: 30px 0;
  display: flex;
  justify-content: space-around;
  h1{
    margin: 0;
    font-size: 1.6rem;
  }
  .logout{
    align-self: center;
    .btn{
      padding: 3px;
      font-weight: lighter;
    }
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
