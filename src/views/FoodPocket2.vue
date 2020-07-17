<template>
  <div class="foodpocket">

    <!-- 主畫面 -->
    <div class="container">
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
          <input type="date" class="form-control" id="date" v-model="newDate"/> <!-- :value="today -->
        </div>

        <div class="col-12 input-group mb-3">
          <button class="btn btn-primary w-100" type="button" @click="addRestaurant">新增</button>
        </div>

      </div>
      <!-- 主要卡片內容區(分三塊 頭、身體、腳) -->
      <div class="card text-center">

        <div class="card-header"> <!-- card-header 過濾資訊標籤(頭) -->
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'all'}"
                @click="visibility = 'all'"
                href="#"
              >全部</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'recommend'}"
                @click="visibility = 'recommend'"
                href="#"
              >推薦餐廳</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'record'}"
                @click="visibility = 'record'"
                href="#"
              >歷史紀錄</a>
            </li>
          </ul>
        </div>

        <ul class="list-group list-group-flush text-left"> <!-- list內容區域(身體) -->
          <li class="list-group-item" v-for="(item, key) in restaurantList" :key="key">
            <div class="d-flex">   <!-- v-if="item.id !== cacheTodo.id" -->
              <div class="restaurantList">
                <div class="name">{{ item.restaurant_name }}</div>
                <div class="description">
                  <div class="times">吃過 {{item.visited}} 次</div>
                  <div class="lastTime">上次到訪日期： {{item.visit_record}}</div>
                </div>
              </div>
              <!-- <button type="button" class="close ml-auto" aria-label="Close" @click="removeRestaurant(item)">
                <span aria-hidden="true">&times;</span>
              </button>-->
              <button
                class="btn btn-outline-primary btn-sm ml-auto"
                @click="openModal(item)"
              >編輯</button>
            </div>
          </li>
        </ul>

        <div class="card-footer d-flex justify-content-between"> <!-- card-footer註腳區域(腳) -->
          <span>總共有 {{number}} 家好吃的餐廳</span>
        </div>

      </div>
    </div>

    <!-- 編輯鈕按下之後的編輯卡片區 -->
    <div class="modal fade" id="restaurantModal" tabindex="-1" role="dialog"
      aria-labelledby="restaurantModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">

          <div class="modal-header bg-dark text-white"> <!-- 編輯卡片區-header -->
            <h5 class="modal-title" id="restaurantModalLabel">
              <span>編輯到訪餐廳資訊</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body"> <!-- 編輯卡片區-body (2題) -->

            <div class="form-group">
              <label for="name">餐廳名稱</label>
              <input type="text" class="form-control" id="name" v-model="modelRestaurant.restaurant_name"/>
            </div>

            <div class="form-group">
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" :value="modelRestaurant.visit_record">
              <!-- v-model="modelRestaurant.date" -->
            </div>
          </div>

          <div class="modal fade" id="delRestaurantModal" tabindex="-1" role="dialog"
          aria-labelledby="delRestaurantModalLabel" aria-hidden="true">   <!-- 刪除按鈕按下去後的刪除卡片確認區 -->
            <div class="modal-dialog" role="document">
              <div class="modal-content border-0">

                <div class="modal-header bg-danger text-white"> <!-- modal-header -->
                  <h5 class="modal-title" id="delRestaurantModalLabel">
                    <span>刪除產品</span>
                  </h5>
                  <button type="button" class="close" aria-label="Close" @click="dontdelRestaurant">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <div class="modal-body"> <!-- 刪除卡片確認區-body -->
                  是否刪除<strong class="text-danger">{{modelRestaurant.restaurant_name}}</strong> 餐廳？
                  <br>(刪除後將無法恢復)
                </div>

                <div class="modal-footer"> <!-- 刪除卡片確認區-footer -->
                  <button type="button" class="btn btn-outline-secondary btn-sm" @click="dontdelRestaurant">取消</button>
                  <button type="button" class="btn btn-danger btn-sm" @click="delRestaurant" data-dismiss="modal">確認刪除</button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer"> <!-- 編輯卡片區-footer (按鈕*3)-->
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
      username: 'brayce',
      newRestaurant: '', // 取得內容暫放處
      newDate: '', // 取得內容暫放處
      newRestaurant_uid: '', // 取得內容暫放處
      restaurantList: [], // 由API匯入
      modelRestaurant: { // model取得內容暫放處
        restaurant_uid: '',
        restaurant_name: '',
        visited: '',
        visit_record: []
      },
      restaurants: [ // 測試時使用的
        {
          restaurant_uid: '1',
          restaurant_name: '牛肉麵',
          visited: 3,
          visit_record: ['2020-07-05', '2020-07-02', '2020-06-01']
        },
        {
          restaurant_uid: '2',
          restaurant_name: '拉麵',
          visited: 3,
          visit_record: ['2020-07-10', '2020-07-03', '2020-06-18']
        }
      ],
      visibility: 'all', // 'all' 'recommend' 'record' 基本顯示all全部

      // ----------------以下尚未用到
      cacheTodo: {},
      cacheTitle: ''
    }
  },
  created () {
    this.getRestaurantList()
  },
  methods: {
    getRestaurantList: function () {
      const api = 'https://brycehuang.com/api/rest/getRestaurantList/'
      const vm = this
      this.$http.get(api, { params: { username: vm.username } }).then(response => {
        console.log('getRestaurantList:', response.data)
        vm.restaurantList = response.data.data
      })
    },
    postNewVisit: function (username, id, timestamp) {
      const api = 'https://brycehuang.com/api/rest/newVisit/'
      const formdata = new FormData()
      formdata.append('username', username)
      formdata.append('restaurant_uid', id)
      formdata.append('visit_date', timestamp)
      this.axios.post(api, formdata).then((response) => {
        console.log('postNewVisit:', response.data)
        this.getRestaurantList()
      })
    },
    postNewRestaurant: function (restaurantName, timestamp) {
      const api = 'https://brycehuang.com/api/rest/newRestaurant/'
      const formdata = new FormData()
      formdata.append('name', restaurantName)
      this.axios.post(api, formdata).then((response) => {
        console.log('postNewRestaurant:', response.data)
        this.newRestaurant_uid = response.data.data.restaurant_uid // 取得該餐廳(restaurantName)的uid
        console.log('restaurantName:', restaurantName, 'newRestaurant_uid:', this.newRestaurant_uid)

        this.postNewVisit(this.username, this.newRestaurant_uid, timestamp)
      })
    },
    addRestaurant: function () {
      if (this.newDate === '') {
        this.newDate = Math.floor(Date.now())
      }
      const timestamp = Math.floor(new Date(this.newDate).getTime() / 1000)
      console.log('timestamp:', timestamp)
      const restaurantName = this.newRestaurant.trim() // 修掉輸入的空白
      if (!restaurantName) {
        return
      }
      this.postNewRestaurant(restaurantName, timestamp)

      this.newRestaurant = ''
      this.newDate = ''
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
    // ----------------以下尚未用到
    removeRestaurant: function (todo) {
      var newIndex = ''
      var vm = this
      vm.restaurants.forEach(function (item, key) {
        if (todo.id === item.id) {
          newIndex = key
        }
      })
      this.restaurants.splice(newIndex, 1)
    }
  },
  computed: {
    number: function () {
      return this.restaurantList.length
    },
    today: function () {
      const today = new Date()
      const year = today.getFullYear()
      const month = (today.getMonth() + 1)
      const day = today.getDate()
      if (month < 10) {
        const addzeromonth = '0' + month
        const currentDateTime = String(year) + '-' + String(addzeromonth) + '-' + String(day)
        return currentDateTime
      } else {
        const currentDateTime = String(year) + '-' + String(month) + '-' + String(day)
        return currentDateTime
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.add-new{
  .form-control{
    border-right: none;
  }
}
.restaurantList {
  .name {
    font-size: 1.2rem;
  }
  .description {
    display: flex;
    font-size: 0.8rem;
    .times {
      margin-right: 5px;
    }
  }
}

</style>
