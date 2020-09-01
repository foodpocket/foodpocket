<template>
  <div class="foodpocket">
    <navbar />
    <Alert />
    <!-- 主畫面 -->
    <div class="container">  <!-- 主頁 -->
      <!-- 快速新增 -->
      <div class="input-group pt-3">
        <div class="col-12 input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">餐廳名稱</span>
          </div>
          <input type="text" class="form-control" placeholder="請輸入餐廳名稱" v-model="tempRestaurant_name" @keyup.enter="quicklyAdd"/>
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
          <!-- card-header 過濾資訊標籤(頭) -->  <!-- 切換列表的按鈕click在這裡 -->
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a class="nav-link" :class="{'active':visibility === 'all'}" @click.prevent="visibility = 'all',justifyContent = 'end'">全部餐廳</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':visibility === 'recommend'}" @click.prevent="visibility = 'recommend',justifyContent = 'end'">推薦餐廳</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':visibility === 'record'}" @click.prevent="visibility = 'record',justifyContent = 'end'">歷史紀錄</a>
            </li>
          </ul>
        </div>

        <!-- list內容區域(身體) -->

        <!-- 搜尋區 -->
        <div class="input-group mt-3" v-if="visibility === 'all'">
          <div class="col-12 input-group">
            <input type="text" class="form-control" placeholder="搜尋或新增餐廳"  v-model="searchRestaurant"/>
            <div class="input-group-append">
              <span class="input-group-text" @click="searchRestaurant = ''">清除</span>
            </div>
          </div>
        </div>
        <div class="list-length text-right mr-3">
          <span v-if="visibility === 'all'&& searchRestaurant ===''">總共有 {{restaurantList.length}} 家已登記的餐廳</span>
          <span v-if="visibility === 'all' && searchRestaurant !==''">總共有 {{searchList.length}} 家相符的餐廳</span>
          <span v-if="visibility === 'recommend'">推薦 {{recommendList.length}} 家餐廳<i class="fas fa-redo ml-3" @click="recommendListShow()"></i></span>
          <span v-if="visibility === 'record'">總共吃了 {{visitRecords.length}} 餐</span>
        </div>
        <!-- 列表顯示區 -->
        <ul class="list-group list-group-flush text-left">
          <li class="main-list list-group-item" v-for="(item, key) in filteredMethod" :key="key">
            <div class="d-flex align-items-center">
              <!-- 基本資訊 -->
              <div class="restaurant-list" style="cursor:pointer;" @click.prevent="openInfoModal(item)">
                <div class="restaurant-name">
                  {{ item.restaurant_name }}
                  <i v-if="visibility !== 'record' && item.note !== ''" class="note-icon fas fa-exclamation-circle"></i>
                  <i v-if="item.status === 'ACTIVE'" class="status-icon fas fa-thumbtack"></i>
                  <i v-if="item.status === 'HIDE'" class="status-icon fas fa-eye-slash"></i>
                </div>
                <div>
                  <div class="restaurant-description">
                    <div class="lastTime" v-if="visibility === 'all'">上次到訪日期： {{item.visit_dates[0]}}</div>
                    <div class="visited-times" v-if="visibility !== 'record'">吃過 {{item.visited}} 次</div>
                    <div class="lastTime" v-if="visibility === 'record'">日期： {{item.visit_date}}</div>
                  </div>
                </div>
              </div>

              <!-- icon-btn -->
              <div class="button-area" :class="justifyContent">
                <a v-if="visibility !== 'record'" @click.prevent="openAddrecordModal(item)" class="plus-icon"><i class="fas fa-plus"></i></a>
                <a v-if="visibility === 'record'" @click.prevent="openEditVisitModal(item)" class="calendar-icon"><i class="far fa-calendar-alt"></i></a>
              </div>

            </div>
          </li>

          <!-- 新增餐廳的按鈕 -->
          <li class="list-group-item addnew" v-if="visibility === 'all' && searchRestaurant!==''">
            <div class="d-flex align-items-center justify-content-center">
              <div class="restaurant-list">
                <div class="restaurant-name">
                  <button class="btn btn-info w-100" type="button" @click="addRestaurant(searchRestaurant)" style="font-weight: 100;">
                    新增<strong>- {{searchRestaurant}} -</strong>餐廳
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- card-footer註腳區域(腳) -->
        <div class="card-footer d-flex justify-content-between">
          <span v-if="visibility === 'all'&& searchRestaurant ===''">總共有 {{restaurantList.length}} 家餐廳</span>
          <span v-if="visibility === 'all' && searchRestaurant !==''">總共有 {{searchList.length}} 家相符的餐廳</span>
          <span v-if="visibility === 'recommend'">推薦 {{recommendList.length}} 家餐廳</span>
          <span v-if="visibility === 'record'">總共吃了 {{visitRecords.length}} 餐</span>
        </div>
      </div>
    </div>

    <!-- ---------------------------------------------------------以下是卡片區------------------------------------------------------------------ -->

    <!-- 資訊欄 按下後的資訊欄卡片區 -->
    <div
      class="modal fade"
      id="openInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="openInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="openInfoModalLabel">
              <span>{{infoModalObj.restaurant_name}} 資訊欄</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <!-- 叉叉鈕 -->
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body" v-if="infoModalObj.restaurant_name">
            <a class="pencil-icon" v-if="visibility !== 'record'" @click.prevent="openEditModal(infoModalObj)">
              <i class="fas fa-pen"></i>
            </a>
            <div class="text-left form-group">
              <div>
                <label>餐廳名稱：</label>
                <span>{{infoModalObj.restaurant_name}}</span>
              </div>

              <div>
                <label>備註：</label>
                <span v-if="infoModalObj.note" class="modal-note">{{infoModalObj.note}}</span>
              </div>

              <div>
                <label>推薦模式：</label>
                <span v-if="infoModalObj.status === 'RANDOM'">隨機(預設)</span>
                <span v-if="infoModalObj.status === 'ACTIVE'"><i class="mr-1 fas fa-thumbtack" style="font-size:0.7rem;"></i>永遠</span>
                <span v-if="infoModalObj.status === 'HIDE'"><i class="mr-1 fas fa-eye-slash" style="font-size:0.7rem;"></i>不推薦 (直到{{infoModalObj.hide_until}})</span>
              </div>

              <div v-if="infoModalObj.visit_dates">
                <label>造訪次數：</label>
                <span>{{infoModalObj.visit_dates.length}}次</span>
              </div>

              <div v-if="infoModalObj.visit_dates">
                <label>到訪日期：</label>
                <ul>
                  <li v-for="(item,key) in infoModalObj.visit_dates.slice(0,3)" :key="key">最近{{key+1}}次：{{item}}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDeleteModal"><i class="fas fa-trash-alt"></i></button>
            <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">確定</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 鉛筆鈕 按下之後的編輯卡片區 -->
    <div
      class="modal fade"
      id="editInfoModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editInfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 編輯卡片-header -->
            <h5 class="modal-title" id="editInfoModalLabel">
              <!-- 全部餐廳列表顯示編輯餐廳 -->
              <span>編輯 {{infoModalObj.restaurant_name}}</span>
            </h5>
            <button type="button" class="close text-white" @click="backtoNote()" data-dismiss="modal" aria-label="Close">
              <!-- 叉叉鈕 -->
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片-body-->
            <div class="form-group">
              <label for="name">餐廳名稱</label>
              <input type="text" class="form-control mb-2" id="name" placeholder="請輸入餐廳名稱" v-model="editModalObj.restaurant_name"/>
              <label for="note">備註</label>
              <input type="text" class="form-control mb-2" id="note" placeholder="任何備註都可以打在這裡" v-model="editModalObj.note"/>

              <label for="status" class="mt-3">推薦模式</label>
              <div class="status text-left d-flex">
                <div class="random-input m-0 mr-4">
                  <input type="radio" id="random" name="status" value="RANDOM" class="mr-2" v-model="editModalObj.status"/>
                  <label for="random">隨機(預設)</label>
                </div>
                <div class="active-input m-0 mr-4">
                  <input type="radio" id="active" name="status" value="ACTIVE" class="mr-2" v-model="editModalObj.status"/>
                  <label for="active">永遠</label>
                </div>
                <div class="hide-input m-0 mr-4">
                  <input type="radio" id="hide" name="status" value="HIDE" class="mr-2" v-model="editModalObj.status"/>
                  <label for="hide">不推薦</label>
                  <div v-if="editModalObj.status === 'HIDE'">
                    <label for="days" class="mr-2">隱藏</label>
                    <select name="days" id="days" v-model="nextHideDay">
                      <option v-for="(option, index) in editModalObj.hideDayOptions" :value="option" :key="index">{{option}}天</option>
                    </select>
                  </div>
                </div>
              </div>
              <div v-if="editModalObj.status === 'HIDE'">
                <hr>
                <p v-if="nextHideDay === 0">選擇天數為0將自動設為隨機模式</p>
                <p v-if="nextHideDay !== 0">直到 {{nextHideUntil}} 以前都不要再推薦</p>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <!-- 編輯卡片-footer (按鈕*3)-->
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="backtoNote()" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-sm"  @click="editRestaurant(editModalObj)">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 日曆鈕 按下之後的編輯卡片區 -->
    <div
      class="modal fade"
      id="editVisitModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editVisitModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 編輯卡片-header -->
            <h5 class="modal-title" id="editVisitModalLabel">
              <span v-if="visibility === 'record'">編輯到訪 {{editVisitModalObj.restaurant_name}} 日期</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <!-- 叉叉鈕 -->
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片-body-->
            <div class="form-group">
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" v-model="editVisitModalObj.visit_date"/>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="openDeleteModal"><i class="fas fa-trash-alt"></i></button>
            <button type="button" class="btn btn-primary btn-sm" @click="editVisitRecord(editVisitModalObj)">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 加號鈕 按下之後的新增紀錄區 -->
    <div
      class="modal fade"
      id="addRecordModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addRecordModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <!-- 編輯卡片區-header -->
            <h5 class="modal-title" id="addModalLabel">
              <span>新增到訪 {{AddrecordModalObj.restaurant_name}} 日期</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 編輯卡片區-body-->
            <div class="form-group">
              <label for="date">最近到訪日期</label>
              <input type="date" class="form-control" id="date" v-model="AddrecordModalObj.visit_date"/>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary btn-sm" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary btn-sm" @click="addVisitRecord(AddrecordModalObj)">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 刪除鈕 按下後的刪除卡片確認區 -->
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
            <h5 class="modal-title" id="delRestaurantModalLabel" v-if="visibility === 'all'">
              <span>刪除{{infoModalObj.restaurant_name}}餐廳</span>
            </h5>
            <h5 class="modal-title" id="delRestaurantModalLabel" v-if="visibility === 'record'">
              <span>刪除到訪紀錄</span>
            </h5>
            <button type="button" class="close" aria-label="Close" @click="doNotDelete">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 刪除卡片確認區-body -->
            <div v-if="visibility === 'all'">
              警告！<br />刪除<strong class="text-danger">{{infoModalObj.restaurant_name}}</strong>餐廳後<br />所有造訪此餐廳的紀錄也將⼀併刪除
            </div>
            <div v-if="visibility === 'record'">
              是否刪除<br /><strong class="text-danger">{{editVisitModalObj.visit_date}}</strong>到訪<strong>{{editVisitModalObj.restaurant_name}}</strong>的紀錄？
            </div>
            <div>(刪除後將無法恢復)</div>
          </div>

          <div class="modal-footer">
            <!-- 刪除卡片確認區-footer -->
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="doNotDelete" >取消</button>
            <button type="button" class="btn btn-danger btn-sm"
            @click="removeRestaurant(infoModalObj)" data-dismiss="modal" v-if="visibility === 'all'">確認刪除</button>
            <button type="button" class="btn btn-danger btn-sm"
            @click="removeVisitRecord(editVisitModalObj)" data-dismiss="modal" v-if="visibility === 'record'">確認刪除</button>
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

export default {
  components: {
    navbar,
    Alert
  },
  data () {
    return {
      token: '',
      searchRestaurant: '', // 搜尋的字串
      tempRestaurant_name: '', // 快速新增-內容暫放處
      tempRestaurant_uid: '', // 快速新增-內容暫放處
      newDate: this.changedateFormat(Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)), // 快速新增-內容暫放處(預設是'今天')
      restaurantList: [], // 由API匯入
      visitRecords: [], // 由API匯入
      infoModalObj: {}, // 資訊欄-Modal取得object暫放處
      editModalObj: {}, // 編輯頁-Modal取得object暫放處
      AddrecordModalObj: {}, // 增加次數頁-Modal取得object暫放處
      editVisitModalObj: {}, // 造訪日期編輯頁-Modal取得object暫放處
      tempdate: '',
      nextHideDay: 0, // only use this in edit modal
      isNew: false,
      recommendList: [],
      visibility: 'all', // 'all' 'record' 'recommend'
      justifyContent: 'end' // 'between' 'end'
    }
  },
  created () {
    this.getToken()
    this.touchendActive()
  },
  computed: {
    nextHideUntil () {
      const today = Math.floor(
        new Date(Math.floor(Date.now())).getTime() / 1000
      )
      if (this.nextHideDay === undefined || this.nextHideDay === 0) {
        const result = this.changedateFormat(today)
        return result
      } else {
        const result = this.changedateFormat(today + 86400 * this.nextHideDay) // 加幾天的運算
        return result
      }
    },
    trimSearchRestaurant () {
      const name = this.searchRestaurant.trim() // 修掉輸入的空白
      if (!name) {
        return name
      }
      return name
    },
    searchList () {
      const fitnameArray = []
      this.restaurantList.forEach((restaurantObject) => {
        const listName = restaurantObject.restaurant_name
        const inputName = this.trimSearchRestaurant
        const indexOf = listName.toUpperCase().indexOf(inputName.toUpperCase())
        if (indexOf >= 0) {
          fitnameArray.push(listName)
        }
      })
      const result = []
      for (let i = 0; i < this.restaurantList.length; i++) {
        fitnameArray.forEach((fitname) => {
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
      } else if (this.visibility === 'recommend') {
        if (this.recommendList.length === 0) {
          this.recommendListShow()
        }
        return this.recommendList
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
        .then((response) => {
          // console.log('restaurantList:', response.data)
          vm.restaurantList = response.data.data
        })
        .catch((err) => {
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
        .then((response) => {
          // console.log('getVisitRecords:', response.data)
          vm.visitRecords = response.data.data
        })
        .catch((err) => {
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
      list.forEach((item) => {
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
      this.newDate = this.changedateFormat(
        Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)
      ) // 恢復
    },
    quicklyAddRestaurant (restaurantName, timestamp) {
      // 類似addRestaurant() + addVisitRecord()
      const api = 'https://brycehuang.com/api/rest/newRestaurant/'
      const formdata = new FormData()
      formdata.append('name', restaurantName)
      formdata.append('user_token', this.token)
      this.axios
        .post(api, formdata)
        .then((response) => {
          // console.log('quicklyAddRestaurant:', response.data)
          this.tempRestaurant_uid = response.data.data.restaurant_uid
          this.quicklyAddVisit(this.tempRestaurant_uid, timestamp)
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },
    quicklyAddVisit (id, timestamp) {
      // 類似addVisitRecord()
      const api = 'https://brycehuang.com/api/rest/newVisit/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('restaurant_uid', id)
      formdata.append('visit_date', timestamp)
      this.axios
        .post(api, formdata)
        .then((response) => {
          // console.log('quicklyAddVisit:', response.data)
          this.initList()
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },

    // openModal---------------------------
    openInfoModal (item) { // 按資訊欄
      if (this.visibility !== 'record') {
        $('#openInfoModal').modal('show')
        this.infoModalObj = item
        console.log('打開資訊欄、將item內容放入infoModalObj')
      }
    },
    openEditModal (item) { // 按鉛筆鈕
      $('#openInfoModal').modal('hide')
      $('#editInfoModal').modal('show')
      this.editModalObj = Object.assign({}, item)

      this.editModalObj.hideDay = this.calculateDiffDate(new Date(this.editModalObj.hide_until), Date.now())
      this.nextHideDay = this.editModalObj.hideDay
      if (this.editModalObj.hideDay !== 2 && this.editModalObj.hideDay !== 7 && this.editModalObj.hideDay !== 10 && this.editModalObj.hideDay !== 30 && this.editModalObj.hideDay !== 60) {
        this.editModalObj.hideDayOptions = [2, 7, 10, 30, 60, this.editModalObj.hideDay] // hard copy hideDay into options
        this.editModalObj.hideDayOptions.sort((a, b) => a - b) // sort array
      } else {
        this.editModalObj.hideDayOptions = [2, 7, 10, 30, 60]
      }

      console.log('關閉資訊欄、打開編輯卡、複製infoModalObj變成editModalObj')
    },
    openEditVisitModal (item) { // 按日曆
      $('#editVisitModal').modal('show')
      this.editVisitModalObj = Object.assign({}, item)
      this.tempdate = this.editVisitModalObj.visit_date
    },
    openAddrecordModal (item) { // 按加號鈕
      $('#addRecordModal').modal('show')
      this.AddrecordModalObj = Object.assign({}, item)
      const today = Math.floor(
        new Date(Math.floor(Date.now())).getTime() / 1000
      )
      this.AddrecordModalObj.visit_date = this.changedateFormat(today)
    },
    openDeleteModal () { // 按刪除鈕
      $('#delRestaurantModal').modal('show')
      if (this.visibility === 'all') {
        $('#openInfoModal').modal('hide')
      }
      if (this.visibility === 'record') {
        $('#editVisitModal').modal('hide')
      }
    },

    // Restaurant--------------------------
    addRestaurant (name) {
      const restaurantName = name.trim() // 修掉輸入的空白
      if (!restaurantName) {
        return
      }
      const NEWupper = restaurantName.toUpperCase()

      const array = []
      const list = this.restaurantList
      list.forEach((item) => {
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
        this.axios
          .post(api, formdata)
          .then((response) => {
            // console.log('addRestaurant:', response.data)
            this.initList()
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push('/loginpage')
            }
          })
      } else {
        this.$bus.$emit('message:push', '這間餐廳已經存在', 'danger')
      }
    },
    editRestaurant (item) { // 傳進來的item是editModalObj
      if (
        this.infoModalObj.restaurant_name !== item.restaurant_name ||
        this.infoModalObj.note !== item.note ||
        this.infoModalObj.status !== item.status ||
        (
          item.status === 'HIDE' &&
          this.infoModalObj.hide_until !== this.nextHideUntil
        )
      ) { // 確認note有改過、餐廳名稱、餐廳狀態、隱藏時長有改過(四擇一即可)
        if (item.restaurant_name !== '') { // 且注意餐廳名稱不等於空
          const api = 'https://brycehuang.com/api/rest/editRestaurant/'
          const formdata = new FormData()
          formdata.append('user_token', this.token)
          formdata.append('restaurant_uid', item.restaurant_uid)
          formdata.append('name', item.restaurant_name) // 更改name
          formdata.append('note', item.note) // 更改note
          if (item.status === 'HIDE' && this.nextHideDay === 0) {
            item.status = 'RANDOM'
          }
          formdata.append('status', item.status) // 更改status
          if (item.status === 'HIDE') {
            formdata.append('hide_until', this.nextHideUntil) // 更改hide_until
          }

          this.axios.post(api, formdata).then((response) => {
            // console.log('editRestaurant:', response.data) // 發送api成功的話
            if (this.infoModalObj.restaurant_name !== item.restaurant_name) {
              // 狀況一：更改名稱
              this.$bus.$emit('message:push', '成功編輯餐廳名稱', 'success')
            }
            if (this.infoModalObj.note !== item.note) {
              // 狀況二：更改備註
              this.$bus.$emit('message:push', '成功編輯餐廳備註', 'success')
            }
            if (this.infoModalObj.status !== item.status) {
              // 狀況三：更改狀態
              this.$bus.$emit('message:push', '成功編輯推薦模式', 'success')
            }
            if (this.infoModalObj.status === item.status && item.status === 'HIDE') {
              // 狀況四：維持HIDE狀態
              if (this.infoModalObj.hide_until !== this.nextHideUntil) {
                // 隱藏時間改變
                this.$bus.$emit('message:push', '成功編輯隱藏天數', 'success') // 就只顯示成功編輯hide_until的提示
                // dirty fix: update hide_until for infoModalObj
                item.hide_until = this.nextHideUntil
              }
            }

            // DANGEROUS: infoModalObj will reference to editModalObj (which is item), infoModalObj SHOULD reference to restaurantList item
            // API會更新整個restaurantList, 用restaurant uid找到API更新過後的原始object in restaurantList
            this.openInfoModal(item)
            $('#editInfoModal').modal('hide')
            this.initList()
          })
            .catch((err) => {
              if (err.response.status === 401) {
                this.$bus.$emit(
                  'message:push',
                  'err.response.status === 401',
                  'danger'
                )
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
        this.backtoNote()
      }
    },
    removeRestaurant (item) { // item是infoModalObj
      const api = 'https://brycehuang.com/api/rest/removeRestaurant/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('restaurant_uid', item.restaurant_uid)
      this.axios
        .post(api, formdata)
        .then((response) => {
          // console.log('removeRestaurant:', response.data)
          this.$bus.$emit('message:push', '成功刪除 ' + item.restaurant_name + ' 餐廳', 'success')
          $('#delRestaurantModal').modal('hide')
          this.initList()
        })
        .catch((err) => {
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
      this.axios
        .post(api, formdata)
        .then((response) => {
          // console.log('addVisitRecord:', response.data)
          $('#addRecordModal').modal('hide')
          this.$bus.$emit('message:push', '成功增加造訪次數', 'success')
          this.initList()
        })
        .catch((err) => {
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
        this.axios
          .post(api, formdata)
          .then((response) => {
            // console.log('editVisitRecord:', response.data)
            console.log('成功編輯造訪日期')
            this.$bus.$emit('message:push', '成功編輯造訪日期', 'success')
            $('#editVisitModal').modal('hide')
            this.initList()
          })
          .catch((err) => {
            if (err.response.status === 401) {
              this.$router.push('/loginpage')
            }
          })
      } else {
        console.log('造訪日期並未改變')
        $('#editVisitModal').modal('hide')
      }
    },
    removeVisitRecord (item) {
      const api = 'https://brycehuang.com/api/rest/removeVisitRecord/'
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('visitrecord_uid', item.visitrecord_uid)
      this.axios
        .post(api, formdata)
        .then((response) => {
          // console.log('removeVisitRecord:', response.data)
          this.$bus.$emit('message:push', '成功刪除Record', 'success')
          $('#delRestaurantModal').modal('hide')
          this.initList()
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },

    // 其他---------------------------------
    backtoNote () { // 從編輯區回資訊欄
      $('#editInfoModal').modal('hide')
      $('#openInfoModal').modal('show')
      console.log('回到資訊欄 (關閉編輯卡片、開啟資訊欄卡片)')
    },
    doNotDelete () {
      $('#delRestaurantModal').modal('hide')
      if (this.visibility === 'all') {
        $('#openInfoModal').modal('show')
        console.log('取消刪除餐廳 (關閉取消卡片、開啟資訊欄)')
      }
      if (this.visibility === 'record') {
        $('#editVisitModal').modal('show')
        console.log('取消刪除紀錄 (關閉取消卡片、開啟日曆)')
      }
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
    recommendListShow () {
      this.recommendList = []
      this.restaurantList.forEach((item) => {
        const copyobject = Object.assign({}, item) // 用於增加copyobject.show
        copyobject.show = false
        if (item.status === 'RANDOM') {
          const randomNum = Math.floor(Math.random() * Math.floor(10))
          if (randomNum < 3) { // 原本是放5啦，現在改放3
            copyobject.show = true
          }
        }
        if (item.status === 'ACTIVE') {
          copyobject.show = true
        }
        if (copyobject.show === true) {
          this.recommendList.push(copyobject)
        }
        this.recommendList.reverse()
      })
    },
    touchendActive () {
      document.body.addEventListener('touchend', function () {})
    },
    calculateDiffDate (date1, date2) { // date1 and date2 are Date object
      if (date2 >= date1) {
        return 0
      }
      if (date2 < date1) {
        const diffTime = Math.abs(date2 - date1)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-area {
  margin: 20px auto;
  .list-length {
    margin: 10px 0;
  }
  .restaurant-list {
    width: 75%;
    .restaurant-name {
      font-size: 1.2rem;
      i{
        margin-left: 10px;
      }
      .note-icon {
        font-size: 1.2rem;
        color: #ffa600;
      }
      .status-icon{
        font-size: 0.8rem;
      }
    }
    .restaurant-description {
      font-size: 0.8rem;
    }
  }
  .button-area {
    width: 40%;
    display: flex;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      font-size: 1.1rem;
      transition: transform 0.3s;
    }
    a:active,
    a:hover {
      transform: scale(1.2, 1.2);
    }
    .plus-icon {
      border: solid 1px #54cc24;
      color: #54cc24;
    }
    .calendar-icon {
      border: solid 1px #ffc107;
      color: #ffc107;
    }
  }
}
#openInfoModal {
  .modal-body {
    position: relative;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3rem;
      height: 3rem;
      border-radius: 100%;
      font-size: 1.1rem;
      transition: transform 0.3s;
    }
    a:active, a:hover {
      transform: scale(1.2, 1.2);
    }
    .pencil-icon {
      position: absolute;
      top: 10px;
      right: 10px;
      border: solid 1px #555;
      // border: solid 1px #ffc107;
      // color: #ffc107;
    }
    .modal-note{
      background-color:#ffa600;
      color:#fff;
      border-radius:10px;
      padding: 0 10px;
    }
  }
}
.modal{
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

// :class
.between {
  justify-content: space-between;
}
.end {
  justify-content: flex-end;
}
</style>
