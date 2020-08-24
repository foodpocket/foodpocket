<template>
  <div class="foodpocket">
    <navbar/>
    <Alert/>
    <!-- 主畫面 -->
      <!-- <quicklyAdd/> -->
    <div class="container">
      <!-- 輸入新資訊區 -->
      <div class="input-group pt-3">
        <div class="col-12 input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">餐廳名稱</span>
          </div>
          <input type="text" class="form-control" placeholder="請輸入餐廳名稱" v-model="tempRestaurant_name" />
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
      <!-- 主要卡片內容區(分三塊 頭、身體、腳) -->
      <div class="main-area card text-center">
        <div class="card-header">
          <!-- card-header 過濾資訊標籤(頭) -->
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility === 'all'}"
                @click.prevent="visibility = 'all',justifyContent = 'between'"
                href="#"
              >全部餐廳</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility === 'recommed'}"
                @click.prevent="visibility = 'recommed',justifyContent = 'end'"
                href="#"
              >推薦餐廳</a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{'active':visibility === 'record'}"
                @click.prevent="visibility = 'record',justifyContent = 'end'"
                href="#"
              >歷史紀錄</a>
            </li>
          </ul>
        </div>

        <!-- list內容區域(身體) -->
        <!-- all的搜尋區 -->
        <div class="input-group mt-3" v-if="visibility === 'all'">
          <div class="col-12 input-group">
            <input type="text" class="form-control" placeholder="搜尋或新增餐廳" v-model="searchRestaurant" />
            <div class="input-group-append">
              <span class="input-group-text" @click="searchRestaurant = ''">清除</span>
            </div>
          </div>
        </div>
        <!-- 內容區 -->
        <div class="list-length text-right mr-3">
          <span v-if="visibility === 'all'&& searchRestaurant ===''">總共有 {{restaurantList.length}} 家餐廳(含0次餐廳)</span>
          <span v-if="visibility === 'recommed'">推薦 {{recommedRestaurantList.length}} 家餐廳</span>
          <span v-if="visibility === 'all' && searchRestaurant !==''">總共有 {{searchList.length}} 家相符的餐廳</span>
          <span v-if="visibility === 'record'">總共吃了 {{visitRecords.length}} 餐</span>
        </div>
        <ul class="list-group list-group-flush text-left">
          <li class="main-list list-group-item" v-for="(item, key) in filteredMethod" :key="key">
            <div class="d-flex align-items-center">

              <div class="restaurant-list" style="cursor:pointer;" @click.prevent="openNoteModal(item)">
                <div class="restaurant-name">
                  {{ item.restaurant_name }}
                  <i v-if="visibility !== 'record' && item.note !== ''" class="fas fa-exclamation-circle"></i>
                </div>

                <div>

                  <!-- 測試區 -->
                  <div class="text-danger">
                    <div>
                      status：{{item.status}}
                    </div>
                  </div>
                  <!-- 測試區 -->

                  <div class="restaurant-description">
                    <div class="lastTime" v-if="visibility === 'all'">上次到訪日期： {{item.visit_dates[0]}}</div>
                    <div class="visited-times" v-if="visibility !== 'record'">吃過 {{item.visited}} 次</div>
                    <div class="lastTime" v-if="visibility === 'record'">日期： {{item.visit_date}}</div>
                  </div>
                </div>

              </div>

              <div class="button-area" :class="justifyContent">
                <a v-if="visibility === 'all'" @click.prevent="openEditModal(item)" class="pencil-icon"><i class="fas fa-pen"></i></a>
                <a v-if="visibility !== 'record'" @click.prevent="openAddrecordModal(item)" class="plus-icon"><i class="fas fa-plus"></i></a>
                <a v-if="visibility === 'record'" @click.prevent="openEditModal(item)" class="calendar-icon"><i class="far fa-calendar-alt"></i></a>
              </div>
            </div>
          </li>
          <li class="list-group-item addnew" v-if="visibility === 'all' && searchRestaurant!==''">
            <div class="d-flex align-items-center justify-content-center">
              <div class="restaurant-list">
                <div class="restaurant-name">
                  <button class="btn btn-info w-100" type="button" @click="addRestaurant(searchRestaurant)"
                    style="font-weight: 100;">新增<strong>- {{searchRestaurant}} -</strong>餐廳</button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- card-footer註腳區域(腳) -->
        <div class="card-footer d-flex justify-content-between">
          <span v-if="visibility === 'all'&& searchRestaurant ===''">總共有 {{restaurantList.length}} 家餐廳</span>
          <span v-if="visibility === 'all' && searchRestaurant !==''">總共有 {{searchList.length}} 家相符的餐廳</span>
          <span v-if="visibility === 'recommed'">推薦 {{recommedRestaurantList.length}} 家餐廳</span>
          <span v-if="visibility === 'record'">總共吃了 {{visitRecords.length}} 餐</span>
        </div>
      </div>
    </div>

    <!-- 測試區 按下後的備註卡片區 -->
    <div class="text modal fade" id="openNoteModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">

          <div class="modal-header bg-warning text-dark py-2">
            <h5 class="modal-title" id="noteModalLabel"><span>備註</span></h5>
          </div>

          <div class="modal-body">
            <div class="text-left">
              {{tempnote}}
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 驚嘆號 按下後的備註卡片區 -->
    <!-- <div class="modal fade" id="openNoteModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">

          <div class="modal-header bg-warning text-dark py-2">
            <h5 class="modal-title" id="noteModalLabel"><span>備註</span></h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="text-left">
              {{tempnote}}
            </div>
          </div>

        </div>
      </div>
    </div> -->

    <!-- 鉛筆鈕 按下之後的編輯卡片區 -->
    <div class="modal fade" id="restaurantModal" tabindex="-1" role="dialog" aria-labelledby="restaurantModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 編輯卡片-header -->
            <h5 class="modal-title" id="restaurantModalLabel">
              <span v-if="visibility === 'all'">編輯 {{tempname}}</span> <!-- 全部餐廳列表顯示編輯餐廳 -->
              <span v-if="visibility === 'record'">編輯到訪 {{tempname}} 日期</span> <!-- 歷史紀錄顯示編輯到訪日期 -->
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close"> <!-- 叉叉鈕 -->
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片-body-->
            <div class="form-group" v-if="visibility === 'all'"> <!-- 只有在全部餐廳列表才會看到 -->
              <label for="name">餐廳名稱</label>
              <input type="text" class="form-control mb-2" id="name" placeholder="請輸入餐廳名稱" v-model="modelRestaurant.restaurant_name"/>
              <label for="note">備註</label>
              <input type="text" class="form-control mb-2" id="note" placeholder="任何備註都可以打在這裡" v-model="modelRestaurant.note"/>
              <label for="status">狀態</label>
              <div class="status text-left d-flex">
                <div class="active-input m-0 mr-4">
                  <input type="radio" id="active" name="status" value="ACTIVE" class="mr-2" v-model="modelRestaurant.status" @click="hidedays=0">
                  <label for="active" @click="hidedays=0">active</label>
                </div>
                <div class="random-input m-0 mr-4">
                  <input type="radio" id="random"  name="status" value="RANDOM" class="mr-2" v-model="modelRestaurant.status" @click="hidedays=0">
                  <label for="random" @click="hidedays=0">random</label>
                </div>
                <div class="hide-input m-0 mr-4">
                  <input type="radio" id="hide"  name="status" value="HIDE" class="mr-2" v-model="modelRestaurant.status" @click="hidedays=2">
                  <label for="hide" @click="hidedays=2">hide</label>
                  <div v-if="modelRestaurant.status === 'HIDE'">
                    <label for="days" class="mr-2">隱藏</label>
                    <select name="days" id="days" v-model="hidedays">
                      <option value="2">2天</option>
                      <option value="7">7天</option>
                      <option value="10">10天</option>
                      <option value="30">30天</option>
                      <option value="60">60天</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="text-left">
              ---觀測區--- <br>
              status: {{modelRestaurant.status}} <br>
              <div v-if="modelRestaurant.status === 'HIDE'">
                上次設定隱藏至: {{modelRestaurant.hide_until}}  <br>
                預計隱藏天數: {{hidedays}}天<br>
                經過計算之後隱藏至: {{hideUntil}}
              </div>
            </div>
            </div>

            <div class="form-group" v-if="visibility === 'record'"> <!-- 只有在歷史紀錄才會看到 -->
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" v-model="modelRestaurant.visit_date" />
            </div>
          </div>

          <div class="modal-footer">
            <!-- 編輯卡片-footer (按鈕*3)-->
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDeleteModal">刪除</button>
            <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">取消</button>
            <button v-if="visibility === 'all'" type="button" class="btn btn-primary btn-sm"
              @click="editRestaurant(modelRestaurant)">確認</button> <!-- 全部餐廳列表的編輯區確認鈕 -->
            <button v-if="visibility === 'record'" type="button" class="btn btn-primary btn-sm"
              @click="editVisitRecord(modelRestaurant)">確認</button> <!-- 歷史紀錄編輯區確認鈕 -->
          </div>
        </div>
      </div>
    </div>

    <!-- 加號鈕 按下之後的新增紀錄區 -->
    <div class="modal fade" id="addRecordModal" tabindex="-1" role="dialog" aria-labelledby="addRecordModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 編輯卡片區-header -->
            <h5 class="modal-title" id="addModalLabel">
              <span>新增到訪 {{tempname}} 日期</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片區-body-->
            <div class="form-group">
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" v-model="modelRestaurant.visit_date"/>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-sm" @click="addVisitRecord(modelRestaurant)">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除鈕 按下後的刪除卡片確認區 -->
    <div class="modal fade" id="delRestaurantModal" tabindex="-1" role="dialog" aria-labelledby="delRestaurantModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <!-- modal-header -->
            <h5 class="modal-title" id="delRestaurantModalLabel" v-if="visibility === 'all'"><span>刪除餐廳</span></h5>
            <h5 class="modal-title" id="delRestaurantModalLabel" v-if="visibility === 'record'"><span>刪除到訪紀錄</span></h5>
            <button type="button" class="close" aria-label="Close" @click="doNotDelete(modelRestaurant)">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 刪除卡片確認區-body -->
            <div v-if="visibility === 'all'">
              警告！<br>
              刪除<strong class="text-danger"> {{tempname}} </strong>餐廳後<br>
              所有造訪此餐廳的紀錄也將⼀併刪除
            </div>
            <div v-if="visibility === 'record'">
              是否刪除<br>
              <strong class="text-danger">{{tempdate}} </strong>到訪<strong> {{tempname}} </strong>的紀錄？
            </div>
            <div>(刪除後將無法恢復)</div>
          </div>

          <div class="modal-footer">
            <!-- 刪除卡片確認區-footer -->
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="doNotDelete(modelRestaurant)"
            >取消</button>
            <button type="button" class="btn btn-danger btn-sm" @click="removeRestaurant(modelRestaurant)" data-dismiss="modal" v-if="visibility === 'all'">確認刪除</button>
            <button type="button" class="btn btn-danger btn-sm" @click="removeVisitRecord(modelRestaurant)" data-dismiss="modal" v-if="visibility === 'record'">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import navbar from '@/components/navbar.vue'
import Alert from '@/components/Alertmessages.vue'
// import quicklyAdd from '@/components/quicklyAdd.vue'

export default {
  components: {
    navbar,
    Alert
    // quicklyAdd
  },
  data () {
    return {
      token: '',
      searchRestaurant: '', // 搜尋的字串
      tempRestaurant_name: '', // 快速新增內容暫放處
      tempRestaurant_uid: '', // 快速新增內容暫放處
      newDate: this.changedateFormat(Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)), // 快速新增內容暫放處
      restaurantList: [], // 由API匯入
      visitRecords: [], // 由API匯入
      modelRestaurant: {}, // model取得內容暫放處
      tempname: '', // model取得餐廳名字暫放處
      tempdate: '', // model取得到訪日期暫放處
      tempnote: '任何備註都可以打在這裡', // model取得note暫放處
      tempstatus: '', // status暫放處，用於比較有沒有改變
      temphideUntil: '', // 更改前hideUntil的暫存區，用於判斷
      hidedays: '2',
      isNew: false,
      visibility: 'all', // 'all' 'record' 'recommed'
      justifyContent: 'between' // 'between' 'end'
    }
  },
  created () {
    this.getToken()
    this.active()
  },
  computed: {
    hideUntil () {
      const today = Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)
      if (this.hidedays === 0) {
        const result = this.changedateFormat(today)
        return result
      } else {
        const result = this.changedateFormat(today + (86400 * this.hidedays)) // 加幾天的運算
        return result
      }
    },
    recommedRestaurantList () {
      const result = []
      this.restaurantList.forEach(item => {
        const copyobject = Object.assign({}, item)
        if (copyobject.status === 'RANDOM') {
          const randomNum = Math.floor(Math.random() * Math.floor(10))
          // console.log('randomNum:', randomNum)
          if (randomNum < 5) {
            copyobject.status = 'ACTIVE'
          }
        }
        if (copyobject.status === 'ACTIVE') { // 改成HIDE的話可以查看HIDE的 但因為前面已有改變RANDOM所以不會有RANDOM出現
          result.push(copyobject)
        }
      })
      // console.log('result:', result)
      return result
    },
    trimSearchRestaurant () {
      const name = this.searchRestaurant.trim() // 修掉輸入的空白
      if (!name) { return name }
      return name
    },
    searchList () {
      const fitnameArray = []
      this.restaurantList.forEach(restaurantObject => {
        const listName = restaurantObject.restaurant_name
        const inputName = this.trimSearchRestaurant
        const indexOf = listName.toUpperCase().indexOf(inputName.toUpperCase())
        if (indexOf >= 0) {
          fitnameArray.push(listName)
        }
      })
      const result = []
      for (let i = 0; i < this.restaurantList.length; i++) {
        fitnameArray.forEach(fitname => {
          if (this.restaurantList[i].restaurant_name === fitname) {
            result.push(this.restaurantList[i])
          }
        })
      }
      return result
    },
    filteredMethod () {
      if (this.visibility === 'all') {
        if (this.trimSearchRestaurant !== '') {
          return this.searchList
        } else {
          return this.restaurantList
        }
      } else if (this.visibility === 'recommed') {
        return this.recommedRestaurantList
      } else if (this.visibility === 'record') {
        return this.visitRecords
      }
      return ''
    }
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
          console.log('restaurantList:', response.data)
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
          console.log('getVisitRecords:', response.data)
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
      const restaurantName = this.tempRestaurant_name.trim() // 修掉輸入的空白
      if (!restaurantName) {
        return
      }
      const NEWupper = restaurantName.toUpperCase()
      // --------------------- 確定輸入的名稱是否曾經輸入過
      const array = []
      const list = this.restaurantList
      list.forEach(item => {
        const restaurant = item.restaurant_name
        const upperrestaurant = restaurant.toUpperCase()
        array.push(upperrestaurant)
      })
      const index = array.indexOf(NEWupper)
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
        this.tempRestaurant_uid = this.restaurantList[index].restaurant_uid // 取出記錄中的餐廳id
        this.quicklyAddVisit(this.tempRestaurant_uid, timestamp) // 增加歷史紀錄
      }
      // 完成後將input復原原樣的------------------------
      this.tempRestaurant_name = ''
      this.newDate = this.changedateFormat(Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)) // 恢復
    },
    quicklyAddRestaurant (restaurantName, timestamp) { // 類似addRestaurant() + addVisitRecord()
      const api = 'https://brycehuang.com/api/rest/newRestaurant/'
      const formdata = new FormData()
      formdata.append('name', restaurantName)
      formdata.append('user_token', this.token)
      this.axios.post(api, formdata).then(response => {
        // console.log('quicklyAddRestaurant:', response.data)
        this.tempRestaurant_uid = response.data.data.restaurant_uid
        this.quicklyAddVisit(this.tempRestaurant_uid, timestamp)
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

    // Restaurant--------------------------
    addRestaurant (name) {
      const restaurantName = name.trim() // 修掉輸入的空白
      if (!restaurantName) { return }
      const NEWupper = restaurantName.toUpperCase()

      const array = []
      const list = this.restaurantList
      list.forEach(item => {
        const restaurant = item.restaurant_name
        const upperrestaurant = restaurant.toUpperCase()
        array.push(upperrestaurant)
      })
      const index = array.indexOf(NEWupper)
      if (index === -1) {
        this.isNew = true // 新的
      } else {
        this.isNew = false // 舊的
      }

      if (this.isNew === true) {
        console.log('這是新的餐廳，已加入餐廳列表中')
        const api = 'https://brycehuang.com/api/rest/newRestaurant/'
        const formdata = new FormData()
        formdata.append('user_token', this.token)
        formdata.append('name', restaurantName)
        this.axios.post(api, formdata).then(response => {
          // console.log('addRestaurant:', response.data)
          this.initList()
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
      } else {
        this.$bus.$emit('message:push', '這間餐廳已經存在', 'danger')
      }
    },
    editRestaurant (item) {
      if (this.tempnote !== item.note || this.tempname !== item.restaurant_name || this.tempstatus !== item.status || this.temphideUntil !== this.hideUntil) {
        // 確認note有改過、餐廳名稱、餐廳狀態、隱藏時長有改過(四擇一即可)
        if (item.restaurant_name !== '') { // 且注意餐廳名稱不等於空
          const api = 'https://brycehuang.com/api/rest/editRestaurant/'
          const formdata = new FormData()
          formdata.append('user_token', this.token)
          formdata.append('restaurant_uid', item.restaurant_uid)
          formdata.append('name', item.restaurant_name) // 更改name
          formdata.append('note', item.note) // 更改note
          formdata.append('status', item.status) // 更改status
          formdata.append('hide_until', this.hideUntil) // 更改hide_until
          this.axios.post(api, formdata).then(response => { // 發送api成功的話
            // console.log('editRestaurant:', response.data)
            if (this.tempname !== item.restaurant_name) { // 狀況一：更改名稱
              this.$bus.$emit('message:push', '成功編輯餐廳名稱', 'success')
            }
            if (this.tempnote !== item.note) { // 狀況二：更改備註
              this.$bus.$emit('message:push', '成功編輯餐廳備註', 'success')
            }
            if (this.tempstatus !== item.status) { // 狀況三：更改狀態
              this.$bus.$emit('message:push', '已將狀態從' + this.tempstatus + '改成' + item.status, 'success')
            }
            if (this.tempstatus === item.status) { // 狀況四：維持HIDE狀態
              if (this.temphideUntil !== this.hideUntil) { // 隱藏時間改變
                this.$bus.$emit('message:push', '成功編輯hide_until', 'success') // 就只顯示成功編輯hide_until的提示
              }
            }
            $('#restaurantModal').modal('hide')
            this.initList()
          }).catch((err) => {
            if (err.response.status === 401) {
              this.$bus.$emit('message:push', 'err.response.status === 401', 'danger')
              this.$router.push('/loginpage')
            }
            if (err.response.status === 400) {
              this.$bus.$emit('message:push', '餐廳名稱不可重複', 'danger')
              item.restaurant_name = this.tempname // 將input恢復原狀
            }
          })
        } else {
          this.$bus.$emit('message:push', '餐廳名稱不能為空', 'danger')
        }
      } else {
        console.log('所有條件都並未改變')
        $('#restaurantModal').modal('hide')
      }
    },
    removeRestaurant (item) {
      const api = 'https://brycehuang.com/api/rest/removeRestaurant/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('restaurant_uid', item.restaurant_uid)
      this.axios.post(api, formdata).then(response => {
        // console.log('removeVisitRecord:', response.data)
        console.log('成功刪除')
        $('#delRestaurantModal').modal('hide')
        this.initList()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },

    // VisitRecord-------------------------
    addVisitRecord (item) {
      const api = 'https://brycehuang.com/api/rest/newVisit/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('restaurant_uid', item.restaurant_uid)
      formdata.append('visit_date', item.visit_date)
      this.axios.post(api, formdata).then(response => {
        // console.log('addVisitRecord:', response.data)
        $('#addRecordModal').modal('hide')
        this.initList()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },
    editVisitRecord (item) {
      if (this.tempdate !== item.visit_date) {
        const api = 'https://brycehuang.com/api/rest/editVisitRecord/'
        const formdata = new FormData()
        formdata.append('user_token', this.token)
        formdata.append('visitrecord_uid', item.visitrecord_uid)
        formdata.append('visit_date', item.visit_date)
        this.axios.post(api, formdata).then(response => {
          // console.log('editVisitRecord:', response.data)
          console.log('成功編輯造訪日期')
          $('#restaurantModal').modal('hide')
          this.initList()
        }).catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
      } else {
        console.log('造訪日期並未改變')
        $('#restaurantModal').modal('hide')
      }
    },
    removeVisitRecord (item) {
      const api = 'https://brycehuang.com/api/rest/removeVisitRecord/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('visitrecord_uid', item.visitrecord_uid)
      this.axios.post(api, formdata).then(response => {
        // console.log('removeVisitRecord:', response.data)
        console.log('成功刪除')
        $('#delRestaurantModal').modal('hide')
        this.initList()
      }).catch((err) => {
        if (err.response.status === 401) {
          this.$router.push('/loginpage')
        }
      })
    },

    // openModal---------------------------
    openAddrecordModal (item) {
      $('#addRecordModal').modal('show')
      this.modelRestaurant = Object.assign({}, item)
      this.tempname = this.modelRestaurant.restaurant_name
      const today = Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)
      this.modelRestaurant.visit_date = this.changedateFormat(today)
    },
    openEditModal (item) {
      $('#restaurantModal').modal('show')
      this.modelRestaurant = Object.assign({}, item)
      this.tempname = this.modelRestaurant.restaurant_name
      this.tempdate = this.modelRestaurant.visit_date
      this.tempnote = this.modelRestaurant.note
      this.tempstatus = this.modelRestaurant.status
      this.temphideUntil = this.modelRestaurant.hide_until
    },
    openDeleteModal () {
      $('#delRestaurantModal').modal('show')
      $('#restaurantModal').modal('hide')
    },
    openNoteModal (item) {
      if (item.note) {
        $('#openNoteModal').modal('show')
        this.modelRestaurant = Object.assign({}, item)
        this.tempnote = this.modelRestaurant.note
      }
    },
    // 其他---------------------------------
    doNotDelete (item) {
      $('#delRestaurantModal').modal('hide')
      this.openEditModal(item)
      console.log('取消刪除')
    },
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
    },
    active () {
      document.body.addEventListener('touchend', function () { })
    }
  }
}
</script>

<style lang="scss" scoped>

.main-area{
  margin: 20px auto;
  .list-length{
    margin: 10px 0;
  }
  .restaurant-list {
    width: 75%;
    .restaurant-name {
      font-size: 1.2rem;
      i {
        font-size: 1.2rem;
        margin-left: 10px;
        color: #ffa600;
      }
    }
    .restaurant-description {
      font-size: 0.8rem;
    }
  }
  .button-area{
    width: 40%;
    display: flex;
    a{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      font-size: 1.1rem;
      transition: transform 0.3s;
    }
    a:active, a:hover{
      transform: scale(1.2,1.2);
    }
    .pencil-icon{
      border: solid 1px #ffc107;
      color: #ffc107;
    }
    .plus-icon{
      border: solid 1px #54cc24;
      color: #54cc24;
    }
    .calendar-icon{
      border: solid 1px #ffc107;
      color: #ffc107;
    }
  }
}

// :class
.between{
  justify-content: space-between;
}
.end{
  justify-content: flex-end;
}
</style>
