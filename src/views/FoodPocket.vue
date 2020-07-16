<template>
  <div class="foodpocket">

    <div class="container">

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
          <button class="btn btn-primary w-100" type="button" @click="addRestaurant">新增</button> <!-- @click="openModal()" -->
        </div>

      </div>

      <div class="card text-center">

        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'all'}"
                @click="visibility = 'all'"
                href="#"
              >全部</a>
            </li>
            <!-- <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'active'}"
                @click="visibility = 'active'"
                href="#"
              >進行中</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility == 'completed'}"
                @click="visibility = 'completed'"
                href="#"
              >已完成</a>
            </li>-->
          </ul>
        </div>

        <ul class="list-group list-group-flush text-left">
          <li class="list-group-item" v-for="(item, key) in restaurantList" :key="key">
            <div class="d-flex">   <!-- v-if="item.id !== cacheTodo.id" -->
              <div class="restaurantList">
                <div class="name">{{ item.restaurant_name }}</div>
                <div class="description">
                  <div class="times">吃過 {{item.visited}} 次</div>
                  <div class="lastTime">上次到訪日期： {{item.visit_record[0]}}</div>
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

        <div class="card-footer d-flex justify-content-between">
          <span>總共有 {{number}} 家好吃的餐廳</span>
        </div>

      </div>
    </div>

    <div
      class="modal fade"
      id="restaurantModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title">  <!-- id="exampleModalLabel" 再看看能不能刪-->
              <span>編輯到訪餐廳資訊</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">

            <div class="form-group">
              <label for="name">餐廳名稱</label>
              <input type="text" class="form-control" id="name" v-model="tempRestaurant.restaurant_name"/>
            </div>

            <div class="form-group">
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" :value="tempRestaurant.visit_record[0]">
              <!-- v-model="tempRestaurant.date" -->
            </div>

            <div
              class="modal fade"
              id="delRestaurantModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >   <!-- 以下是delRestaurantModal -->
              <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                  <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                      <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    是否刪除
                    <strong class="text-danger">title</strong> 商品(刪除後將無法恢復)。
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" @click="dontdelRestaurant">取消</button>
                    <button type="button" class="btn btn-danger" @click="delRestaurant" data-dismiss="modal">確認刪除</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-outline-danger btn-sm" @click="delModal()">刪除</button>
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
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
      newRestaurant: '',
      newDate: '(未填)',
      newRestaurant_uid: '',
      restaurantList: [], // 由API匯入
      tempRestaurant: { // model取得內容暫放處
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
      visibility: 'all',
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
        console.log(response.data)
        vm.restaurantList = response.data.data
        console.log(vm.restaurantList[0])
      })
    },
    postNewRestaurant: function (restaurantName, timestamp) {
      const api = 'https://brycehuang.com/api/rest/newRestaurant/'
      const formdata = new FormData()
      formdata.append('name', restaurantName)
      this.axios.post(api, formdata).then((response) => {
        console.log(response.data)
        this.newRestaurant_uid = response.data.data.restaurant_uid // 取得該餐廳(restaurantName)的uid
        console.log(restaurantName, 'newRestaurant_uid:', this.newRestaurant_uid)

        this.postNewVisit(this.username, this.newRestaurant_uid, timestamp)
        this.getRestaurantList() // 沒有自動重新讀取
      })
    },
    postNewVisit: function (username, id, timestamp) {
      const api = 'https://brycehuang.com/api/rest/newVisit/'
      const formdata = new FormData()
      formdata.append('username', username)
      formdata.append('restaurant_uid', id)
      formdata.append('visit_date', timestamp)
      console.log(formdata)
      this.axios.post(api, formdata).then((response) => {
        console.log(response.data)
      })
    },
    addRestaurant: function () {
      const timestamp = Math.floor(new Date().getTime() / 1000)
      const restaurantName = this.newRestaurant.trim() // 修掉輸入的空白
      if (!restaurantName) {
        return
      }

      this.postNewRestaurant(restaurantName, timestamp)

      this.newRestaurant = '' // 輸入完成之後 把newRestaurant的輸入空位還原
      this.newDate = ''
    },
    // addRestaurant: function () {
    //   const timestamp = Math.floor(Date.now())
    //   const value = this.newRestaurant.trim() // 修掉輸入的空白
    //   if (!value) {
    //     return
    //   }
    //   const visitDate = this.newDate
    //   console.log(value, timestamp, visitDate)

    //   const visitDates = []
    //   visitDates.push(visitDate)

    //   this.restaurantList.push({
    //     restaurant_uid: timestamp,
    //     restaurant_name: value,
    //     visited: 1,
    //     visit_record: visitDates
    //   })
    //   this.newRestaurant = '' // 輸入完成之後 把newRestaurant的輸入空位還原
    //   this.newDate = ''
    // },
    openModal: function (item) {
      $('#restaurantModal').modal('show')
      this.tempRestaurant = Object.assign({}, item)
    },
    delModal: function () {
      $('#delRestaurantModal').modal('show')
      // item
      // this.tempProduct = Object.assign({}, item)
    },
    updateProduct: function () {
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

    removeRestaurant: function (todo) {
      var newIndex = ''
      var vm = this
      vm.restaurants.forEach(function (item, key) {
        if (todo.id === item.id) {
          newIndex = key
        }
      })
      this.restaurants.splice(newIndex, 1)
    },
    clear: function () {
      this.restaurants = []
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
.add-new{
  .form-control{
    border-right: none;
  }
}
</style>
