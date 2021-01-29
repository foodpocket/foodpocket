<template>
  <div class="mainpocket">
    <navbar>
      <h1>{{seletedName}}</h1>
    </navbar>

    <bus />

    <!-- 主畫面 -->
    <div class="container">
      <!-- 主要卡片內容區(分三塊 頭、身體、腳) -->
      <div class="main-area card text-center">
        <div class="card-header">
          <!-- 過濾資訊標籤(頭) -->  <!-- 切換列表的按鈕click在這裡 -->
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

        <div class="card-body p-0">
          <!-- list-length -->
          <div class="list-length col-12">
            <span v-if="visibility === 'all'&& searchRestaurant ===''">總共有 {{restaurantList.length}} 家已登記的餐廳</span>
            <span v-if="visibility === 'all' && searchRestaurant !==''">總共有 {{searchList.length}} 家相符的餐廳</span>
            <span v-if="visibility === 'recommend'" class="redo">推薦 {{recommendList.length}} 家餐廳<i class="fas fa-redo-alt ml-3" @click="getRecommendList()"></i></span>
            <span v-if="visibility === 'record'">總共吃了 {{visitRecords.length}} 餐</span>
          </div>

          <div class="quickly-search" v-if="visibility === 'all'">
            <div class="input-group">
              <div class="col-12 input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="search">搜尋餐廳</label>
                </div>
                <input type="text" class="form-control" id="search" placeholder="請輸入餐廳名稱" v-model="searchRestaurant" @keyup.enter="quicklyAdd"/>
                <div class="input-group-prepend" v-if="searchRestaurant">
                  <span class="input-group-text" @click="searchRestaurant = ''">&times;</span>
                </div>
              </div>

              <div class="col-12 input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="date">到訪日期</label>
                </div>
                <input type="date" class="form-control" id="date" v-model="newDate" />
              </div>

              <div class="col-12 input-group mb-3">
                <button class="btn w-100" type="button" @click="quicklyAdd">快速新增</button>
              </div>
            </div>
          </div>

          <!-- 列表顯示區 -->
          <ul class="list-group list-group-flush text-left">
            <li class="main-list list-group-item" v-for="(item, key) in filteredMethod" :key="key">
              <div class="d-flex align-items-center">
                <!-- 基本資訊 -->
                <div class="restaurant-area" style="cursor:pointer;" @click.prevent="openInfoModal(item)">
                  <div class="restaurant-name">
                    {{ item.restaurant_name }}
                    <i v-if="visibility !== 'record' && item.note !== ''" class="note-icon fas fa-exclamation-circle"></i>
                    <i v-if="item.status === 'ACTIVE'" class="status-icon fas fa-thumbtack"></i>
                    <i v-if="item.status === 'HIDE'" class="status-icon fas fa-eye-slash"></i>
                  </div>
                  <div class="restaurant-description">
                    <div class="lastTime" v-if="visibility === 'all'">上次到訪日期： {{item.visit_dates[0]}}</div>
                    <div class="visited-times" v-if="visibility !== 'record'">吃過 {{item.visit_count}} 次</div>
                    <div class="lastTime" v-if="visibility === 'record'">日期： {{item.visit_date}}</div>
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
            <li class="addnew list-group-item px-0" v-if="visibility === 'all' && searchRestaurant!==''">
              <div class="col-12 input-group">
                <button class="btn w-100" type="button" @click="addRestaurant(searchRestaurant)">
                  新增<strong class="deep-color"> {{searchRestaurant}} </strong>餐廳
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- card-footer註腳區域(腳) -->
        <div class="card-footer">
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
          <div class="modal-header "> <!-- bg-dark -->
            <h5 class="modal-title" id="openInfoModalLabel">
              <span>{{infoModalObj.restaurant_name}} 資訊欄</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <!-- 叉叉鈕 -->
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body" v-if="infoModalObj.restaurant_name">
            <a class="pencil-icon" v-if="visibility !== 'record'" @click.prevent="openEditModal(infoModalObj)">
              <i class="fas fa-pen"></i>
            </a>
            <table class="table">
              <tbody>
                <tr>
                  <td style="width: 30%;">餐廳名稱：</td>
                  <td style="width: 70%;">{{ infoModalObj.restaurant_name }}</td>
                </tr>
                <tr>
                  <td>推薦模式：</td>
                  <td>
                    <span v-if="infoModalObj.status === 'RANDOM'">(預設)隨機</span>
                    <span v-if="infoModalObj.status === 'ACTIVE'"><i class="mr-1 fas fa-thumbtack" style="font-size:1rem;"></i>永遠</span>
                    <span v-if="infoModalObj.status === 'HIDE'"><i class="mr-1 fas fa-eye-slash" style="font-size:1rem;"></i>不推薦 (直到{{infoModalObj.hide_until}})</span>
                  </td>
                </tr>
                <tr>
                  <td>備註：</td>
                  <td>
                    <span v-if="infoModalObj.note" class="modal-note">{{infoModalObj.note}}</span>
                    <span v-if="!infoModalObj.note">尚無備註</span>
                  </td>
                </tr>
                <tr v-if="infoModalObj.visit_dates">
                  <td>造訪次數：</td>
                  <td v-if="infoModalObj.visit_dates.length > 0">共 {{ infoModalObj.visit_dates.length }} 次</td>
                  <td v-if="infoModalObj.visit_dates.length === 0">尚未造訪過</td>
                </tr>
                <tr v-if="infoModalObj.visit_dates && infoModalObj.visit_dates.length > 0">
                  <td>到訪日期：</td>
                  <td>
                    <li v-for="(item,key) in infoModalObj.visit_dates.slice(0,3)" :key="key">最近{{key+1}}次：{{item}}</li>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-sm" @click="openDeleteModal"
              v-if="visibility === 'all'"><i class="fas fa-trash-alt" style="font-size:1.1rem;"></i></button> <!-- btn-outline-danger -->
            <button type="button" class="btn btn-sm" data-dismiss="modal">確定</button> <!-- btn-primary -->
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
          <div class="modal-header"><!-- bg-dark -->
            <!-- 編輯卡片-header -->
            <h5 class="modal-title" id="editInfoModalLabel">
              <!-- 全部餐廳列表顯示編輯餐廳 -->
              <span>編輯 {{infoModalObj.restaurant_name}}</span>
            </h5>
            <button type="button" class="close" @click="backtoNote()" data-dismiss="modal" aria-label="Close">
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
              <textarea name="note" id="note" class="form-control mb-2" placeholder="任何備註都可以打在這裡" v-model="editModalObj.note"></textarea>
              <!-- <input type="text" class="form-control mb-2" id="note" placeholder="任何備註都可以打在這裡" v-model="editModalObj.note"/> -->

              <label for="status" class="mt-3">推薦模式</label>
              <div class="status text-left d-flex justify-content-between">
                <div class="random-input m-0">
                  <input type="radio" id="random" name="status" value="RANDOM" class="status-input mr-2" v-model="editModalObj.status"/>
                  <label for="random">(預設)隨機</label>
                </div>
                <div class="active-input m-0">
                  <input type="radio" id="active" name="status" value="ACTIVE" class="status-input mr-2" v-model="editModalObj.status"/>
                  <label for="active"><i class="mr-1 fas fa-thumbtack" style="font-size:1rem;"></i>永遠</label>
                </div>
                <div class="hide-input m-0">
                  <input type="radio" id="hide" name="status" value="HIDE" class="status-input mr-2" v-model="editModalObj.status"/>
                  <label for="hide"><i class="mr-1 fas fa-eye-slash" style="font-size:1rem;"></i>不推薦</label>
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
            <button type="button" class="btn btn-sm" @click="backtoNote()" data-dismiss="modal">取消</button> <!-- btn-outline-secondary -->
            <button type="button" class="btn btn-sm"  @click="editRestaurant(editModalObj)">確認</button> <!-- btn-primary -->
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
          <div class="modal-header"> <!-- bg-dark -->
            <!-- 編輯卡片-header -->
            <h5 class="modal-title" id="editVisitModalLabel">
              <span v-if="visibility === 'record'">編輯到訪 {{editVisitModalObj.restaurant_name}} 日期</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
            <button type="button" class="btn btn-sm" @click="openDeleteModal"><i class="fas fa-trash-alt"></i></button> <!-- btn-outline-danger -->
            <button type="button" class="btn btn-sm" @click="editVisitRecord(editVisitModalObj)">確認</button> <!-- btn-primary -->
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
          <div class="modal-header"> <!-- bg-dark -->
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
            <button type="button" class="btn btn-sm" data-dismiss="modal">取消</button> <!-- btn-outline-secondary  -->
            <button type="button" class="btn btn-sm" @click="addVisitRecord(AddrecordModalObj)">確認</button> <!-- btn-primary -->
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
          <div class="modal-header"><!-- bg-danger  -->
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
              <i class="fas fa-exclamation-triangle text-warning" style="font-size:1.5rem;"></i>
               警告 <i class="fas fa-exclamation-triangle text-warning" style="font-size:1.5rem;"></i>
              <br />刪除<strong class="text-danger"> {{infoModalObj.restaurant_name}} </strong>餐廳後<br />所有造訪此餐廳的紀錄也將⼀併刪除
            </div>
            <div v-if="visibility === 'record'">
              是否刪除<br /><strong class="text-danger">{{editVisitModalObj.visit_date}}</strong>到訪<strong>{{editVisitModalObj.restaurant_name}}</strong>的紀錄？
            </div>
            <div>(刪除後將無法恢復)</div>
          </div>

          <div class="modal-footer">
            <!-- 刪除卡片確認區-footer -->
            <button type="button" class="btn btn-sm" @click="doNotDelete" >取消</button> <!-- btn-outline-secondary  -->
            <button type="button" class="btn btn-sm btn-danger"
            @click="removeRestaurant(infoModalObj)" data-dismiss="modal" v-if="visibility === 'all'">確認刪除</button> <!-- btn-danger -->
            <button type="button" class="btn btn-sm btn-danger"
            @click="removeVisitRecord(editVisitModalObj)" data-dismiss="modal" v-if="visibility === 'record'">確認刪除</button> <!-- btn-danger  -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import navbar from '@/components/navbar.vue';
import bus from '@/components/bus.vue';
import RestaurantApi from '@/libs/apis/RestaurantApi';
import VisitRecordApi from '@/libs/apis/VisitRecordApi';
import { MessageType } from '@/bus';

export default {
  components: {
    navbar,
    bus,
  },
  data() {
    return {
      token: '',
      searchRestaurant: '', // 搜尋的字串
      // tempRestaurant_name: '', // 快速新增-內容暫放處
      tempRestaurant_uid: '', // 快速新增-內容暫放處
      newDate: this.changedateFormat(Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000)), // 快速新增-內容暫放處(預設是'今天')
      restaurantList: [], // 由API匯入
      visitRecords: [], // 由API匯入
      infoModalObj: {}, // 資訊欄-Modal取得object暫放處
      editModalObj: {}, // 編輯頁-Modal取得object暫放處
      AddrecordModalObj: {}, // 增加次數頁-Modal取得object暫放處
      editVisitModalObj: {}, // 造訪日期編輯頁-Modal取得object暫放處
      tempdate: '',
      nextHideDay: 2, // only use this in edit modal
      isNew: false,
      recommendList: [],
      visibility: 'all', // 'all' 'record' 'recommend'
      justifyContent: 'end', // 'between' 'end',
    };
  },
  created() {
    this.getToken();
    this.touchendActive();
  },
  computed: {
    seletedID() {
      return this.$cookies.get('getpocketid');
    },
    seletedName() {
      return this.$cookies.get('getpocketname');
    },
    nextHideUntil() {
      const today = Math.floor(
        new Date(Math.floor(Date.now())).getTime() / 1000,
      );
      if (this.nextHideDay === undefined || this.nextHideDay === 0) {
        const result = this.changedateFormat(today);
        return result;
      }
      const result = this.changedateFormat(today + 86400 * this.nextHideDay); // 加幾天的運算
      return result;
    },
    trimSearchRestaurant() {
      const name = this.searchRestaurant.trim(); // 修掉輸入的空白
      if (!name) {
        return name;
      }
      return name;
    },
    searchList() {
      const fitnameArray = [];
      this.restaurantList.forEach((restaurantObject) => {
        const listName = restaurantObject.restaurant_name;
        const inputName = this.trimSearchRestaurant;
        const indexOf = listName.toUpperCase().indexOf(inputName.toUpperCase());
        if (indexOf >= 0) {
          fitnameArray.push(listName);
        }
      });
      const result = [];
      for (let i = 0; i < this.restaurantList.length; i += 1) {
        fitnameArray.forEach((fitname) => {
          if (this.restaurantList[i].restaurant_name === fitname) {
            result.push(this.restaurantList[i]);
          }
        });
      }
      return result;
    },
    filteredMethod() {
      if (this.visibility === 'all') {
        if (this.trimSearchRestaurant !== '') {
          return this.searchList;
        }
        return this.restaurantList;
      } if (this.visibility === 'recommend') {
        return this.recommendList;
      } if (this.visibility === 'record') {
        return this.visitRecords;
      }
      return '';
    },
  },
  methods: {
    // 必備----------------------------
    getToken() {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token');
        // console.log('getToken:', this.token)
        this.initList();
      } else {
        this.$router.push('/loginpage');
      }
    },
    getRestaurantList() {
      this.$store.commit('startLoading');
      RestaurantApi.getRestaurantList(this.seletedID).then((restaurantList) => {
        this.restaurantList = restaurantList;
      }).finally(() => {
        this.$store.commit('stopLoading');
      });
    },
    getRecommendList() {
      this.$store.commit('startLoading');
      RestaurantApi.getRecommendList(this.seletedID).then((recommendList) => {
        this.recommendList = recommendList;
      }).finally(() => {
        this.$store.commit('stopLoading');
      });
    },
    getVisitRecords() {
      this.$store.commit('startLoading');
      VisitRecordApi.getVisitRecords(this.seletedID).then((visitRecords) => {
        this.visitRecords = visitRecords;
      }).finally(() => {
        this.$store.commit('stopLoading');
      });
    },
    initList() {
      this.getRestaurantList();
      this.getRecommendList();
      this.getVisitRecords();
    },

    // 快速新增鈕------------------------------
    quicklyAdd() {
      // 這裡處理日期欄位------------------------
      const timestampNumber = Math.floor(
        new Date(this.newDate).getTime() / 1000,
      );
      const timestamp = this.changedateFormat(timestampNumber);
      // console.log('timestampNumber:', timestampNumber)
      // console.log('timestampFormat:', timestamp)

      // 這裡處理餐廳名稱欄位------------------------
      const restaurantName = this.searchRestaurant.trim(); // 修掉輸入的空白
      if (!restaurantName) {
        return;
      }
      const NEWupper = restaurantName.toUpperCase();
      // --------------------- 確定輸入的名稱是否曾經輸入過
      const array = [];
      const list = this.restaurantList;
      list.forEach((item) => {
        const restaurant = item.restaurant_name;
        const upperrestaurant = restaurant.toUpperCase();
        array.push(upperrestaurant);
      });
      const index = array.indexOf(NEWupper);
      // console.log('array.indexOf:', index)
      if (index === -1) {
        this.isNew = true; // 新的
      } else {
        this.isNew = false; // 舊的
      }
      // --------------------- 用isNew分辨是否是新的餐廳，再做出相應的動作
      if (this.isNew === true) {
        // console.log('這是新的餐廳，已加入餐廳列表中，並同時增加次數一次')
        this.quicklyAddRestaurant(restaurantName, timestamp); // 輸入的字
      } else {
        // console.log('這間餐廳已經存在，已增加次數一次')
        this.tempRestaurant_uid = this.restaurantList[index].restaurant_uid; // 取出記錄中的餐廳id
        this.quicklyAddVisit(this.tempRestaurant_uid, timestamp); // 增加歷史紀錄
      }
      // 完成後將input復原原樣的------------------------
      this.searchRestaurant = '';
      this.newDate = this.changedateFormat(
        Math.floor(new Date(Math.floor(Date.now())).getTime() / 1000),
      ); // 恢復
    },
    quicklyAddRestaurant(restaurantName, timestamp) {
      // 類似addRestaurant() + addVisitRecord()
      RestaurantApi.create(restaurantName, this.seletedID).then((restaurantId) => {
        this.tempRestaurant_uid = restaurantId;
        this.quicklyAddVisit(this.tempRestaurant_uid, timestamp);
      });
    },
    quicklyAddVisit(id, timestamp) {
      // 類似addVisitRecord()
      VisitRecordApi.create(id, timestamp).then(() => {
        this.initList();
      });
    },

    // openModal---------------------------
    openInfoModal(item) { // 按資訊欄
      if (this.visibility !== 'record') {
        $('#openInfoModal').modal('show');
        this.infoModalObj = item;
        // console.log('打開資訊欄、將item內容放入infoModalObj')
      }
    },
    openEditModal(item) { // 按鉛筆鈕
      $('#openInfoModal').modal('hide');
      $('#editInfoModal').modal('show');
      this.editModalObj = { ...item };

      this.editModalObj.hideDay = this.calculateDiffDate(new Date(this.editModalObj.hide_until), Date.now());
      this.nextHideDay = this.editModalObj.hideDay;
      if (this.editModalObj.hideDay !== 2 && this.editModalObj.hideDay !== 7 && this.editModalObj.hideDay !== 10 && this.editModalObj.hideDay !== 30 && this.editModalObj.hideDay !== 60) {
        this.editModalObj.hideDayOptions = [2, 7, 10, 30, 60, this.editModalObj.hideDay]; // hard copy hideDay into options
        this.editModalObj.hideDayOptions.sort((a, b) => a - b); // sort array
      } else {
        this.editModalObj.hideDayOptions = [2, 7, 10, 30, 60];
      }

      // console.log('關閉資訊欄、打開編輯卡、複製infoModalObj變成editModalObj')
    },
    openEditVisitModal(item) { // 按日曆
      $('#editVisitModal').modal('show');
      this.editVisitModalObj = { ...item };
      this.tempdate = this.editVisitModalObj.visit_date;
    },
    openAddrecordModal(item) { // 按加號鈕
      $('#addRecordModal').modal('show');
      this.AddrecordModalObj = { ...item };
      const today = Math.floor(
        new Date(Math.floor(Date.now())).getTime() / 1000,
      );
      this.AddrecordModalObj.visit_date = this.changedateFormat(today);
    },
    openDeleteModal() { // 按刪除鈕
      $('#delRestaurantModal').modal('show');
      if (this.visibility === 'all') {
        $('#openInfoModal').modal('hide');
      }
      if (this.visibility === 'record') {
        $('#editVisitModal').modal('hide');
      }
    },

    // Restaurant--------------------------
    addRestaurant(name) {
      const restaurantName = name.trim(); // 修掉輸入的空白
      if (!restaurantName) {
        return;
      }
      const NEWupper = restaurantName.toUpperCase();

      const array = [];
      const list = this.restaurantList;
      list.forEach((item) => {
        const restaurant = item.restaurant_name;
        const upperrestaurant = restaurant.toUpperCase();
        array.push(upperrestaurant);
      });
      const index = array.indexOf(NEWupper);
      if (index === -1) {
        this.isNew = true; // 新的
      } else {
        this.isNew = false; // 舊的
      }

      if (this.isNew === true) {
        // console.log('這是新的餐廳，已加入餐廳列表中')
        RestaurantApi.create(restaurantName, this.seletedID).then(() => {
          this.$bus.$emit('message:push', `已新增 ${this.searchRestaurant} 餐廳`, MessageType.successbus);
          // this.searchRestaurant = ''
          this.initList();
        });
      } else {
        this.$bus.$emit('message:push', '這間餐廳已經存在', MessageType.dangerbus);
      }
    },
    editRestaurant(item) { // 傳進來的item是editModalObj
      if (
        this.infoModalObj.restaurant_name !== item.restaurant_name
        || this.infoModalObj.note !== item.note
        || this.infoModalObj.status !== item.status
        || (
          item.status === 'HIDE'
          && this.infoModalObj.hide_until !== this.nextHideUntil
        )
      ) { // 確認note有改過、餐廳名稱、餐廳狀態、隱藏時長有改過(四擇一即可)
        if (item.restaurant_name !== '') { // 且注意餐廳名稱不等於空
          if (item.status === 'HIDE' && this.nextHideDay === 0) {
            // eslint-disable-next-line no-param-reassign
            item.status = 'RANDOM'; // 改成預設值 (RANDOM)
          }

          RestaurantApi.update(item.restaurant_uid, item.restaurant_name, item.note, item.status, this.nextHideUntil).then(() => {
            if (this.infoModalObj.restaurant_name !== item.restaurant_name) {
              // 狀況一：更改名稱
              this.$bus.$emit('message:push', '成功編輯餐廳名稱', MessageType.successbus);
            }
            if (this.infoModalObj.note !== item.note) {
              // 狀況二：更改備註
              this.$bus.$emit('message:push', '成功編輯餐廳備註', MessageType.successbus);
            }
            if (this.infoModalObj.status !== item.status) {
              // 狀況三：更改狀態
              this.$bus.$emit('message:push', '成功編輯推薦模式', MessageType.successbus);
            }
            if (this.infoModalObj.status === item.status && item.status === 'HIDE') {
              // 狀況四：維持HIDE狀態
              if (this.infoModalObj.hide_until !== this.nextHideUntil) {
                // 隱藏時間改變
                this.$bus.$emit('message:push', '成功編輯隱藏天數', MessageType.successbus); // 就只顯示成功編輯hide_until的提示
                // dirty fix: update hide_until for infoModalObj
                // eslint-disable-next-line no-param-reassign
                item.hide_until = this.nextHideUntil;
              }
            }

            // DANGEROUS: infoModalObj will reference to editModalObj (which is item), infoModalObj SHOULD reference to restaurantList item
            // API會更新整個restaurantList, 用restaurant uid找到API更新過後的原始object in restaurantList
            this.openInfoModal(item);
            $('#editInfoModal').modal('hide');
            this.initList();
          }).catch((err) => {
            if (err.response.status === 400) {
              this.$bus.$emit('message:push', '餐廳名稱不可重複', MessageType.dangerbus);
              // eslint-disable-next-line no-param-reassign
              item.restaurant_name = this.tempname; // 將input恢復原狀
            }
          });
        } else {
          this.$bus.$emit('message:push', '餐廳名稱不能為空', MessageType.dangerbus);
        }
      } else {
        // console.log('所有條件都並未改變')
        this.backtoNote();
      }
    },
    removeRestaurant(item) { // item是infoModalObj
      RestaurantApi.remove(item.restaurant_uid).then(() => {
        this.$bus.$emit('message:push', `成功刪除 ${item.restaurant_name} 餐廳`, MessageType.successbus);
        $('#delRestaurantModal').modal('hide');
        this.initList();
      });
    },

    // VisitRecord-------------------------
    addVisitRecord(item) {
      VisitRecordApi.create(item.restaurant_uid, item.visit_date).then(() => {
        $('#addRecordModal').modal('hide');
        this.$bus.$emit('message:push', '成功增加造訪次數', MessageType.successbus);
        this.initList();
      });
    },
    editVisitRecord(item) {
      if (this.tempdate !== item.visit_date) {
        VisitRecordApi.update(item.visitrecord_uid, item.visit_date).then(() => {
          this.$bus.$emit('message:push', '成功編輯造訪日期', MessageType.successbus);
          $('#editVisitModal').modal('hide');
          this.initList();
        });
      } else {
        // console.log('造訪日期並未改變')
        $('#editVisitModal').modal('hide');
      }
    },
    removeVisitRecord(item) {
      VisitRecordApi.remove(item.visitrecord_uid).then(() => {
        this.$bus.$emit('message:push', '成功刪除Record', MessageType.successbus);
        $('#delRestaurantModal').modal('hide');
        this.initList();
      });
    },

    // 其他---------------------------------
    backtoNote() { // 從編輯區回資訊欄
      $('#editInfoModal').modal('hide');
      $('#openInfoModal').modal('show');
      // console.log('回到資訊欄 (關閉編輯卡片、開啟資訊欄卡片)')
    },
    doNotDelete() {
      $('#delRestaurantModal').modal('hide');
      if (this.visibility === 'all') {
        $('#openInfoModal').modal('show');
        // console.log('取消刪除餐廳 (關閉取消卡片、開啟資訊欄)')
      }
      if (this.visibility === 'record') {
        $('#editVisitModal').modal('show');
        // console.log('取消刪除紀錄 (關閉取消卡片、開啟日曆)')
      }
    },
    changedateFormat(timestamp) {
      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (month < 10) {
        const addzeromonth = `0${month}`;
        if (day < 10) {
          const addzeroday = `0${day}`;
          const currentDateTime = `${String(year)
          }-${
            String(addzeromonth)
          }-${
            String(addzeroday)}`;
          return currentDateTime;
        }
        const currentDateTime = `${String(year)}-${String(addzeromonth)}-${String(day)}`;
        return currentDateTime;
      }
      if (day < 10) {
        const addzeroday = `0${day}`;
        if (month < 10) {
          const addzeromonth = `0${month}`;
          const currentDateTime = `${String(year)
          }-${
            String(addzeromonth)
          }-${
            String(addzeroday)}`;
          return currentDateTime;
        }
        const currentDateTime = `${String(year)}-${String(month)}-${String(addzeroday)}`;
        return currentDateTime;
      }
      const currentDateTime = `${String(year)}-${String(month)}-${String(day)}`;
      return currentDateTime;
    },
    // Replaced by getRecommendList
    recommendListShow() {
      this.recommendList = [];
      this.restaurantList.forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.show = false;
        if (item.status === 'RANDOM') {
          const randomNum = Math.floor(Math.random() * Math.floor(10));
          if (randomNum < 3) { // 原本是放5啦，現在改放3
            // eslint-disable-next-line no-param-reassign
            item.show = true;
          }
        }
        if (item.status === 'ACTIVE') {
        // eslint-disable-next-line no-param-reassign
          item.show = true;
        }
        if (item.show === true) {
          this.recommendList.push(item);
        }
        // console.log(item)
      });
      this.recommendList.reverse();
    },
    touchendActive() {
      document.body.addEventListener('touchend', () => {});
    },
    calculateDiffDate(date1, date2) { // date1 and date2 are Date object
      if (date2 < date1) {
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      }

      return 0;
    },
  },
};
</script>

<style lang="scss" scoped>

.deep-color {
  color: $deep;
  font-weight: 400;
  background-color: rgb(255, 255, 255);
  margin: 0 1rem;
  border-radius: 1px;
}
.input-group-text{
  background-color: $word-background-light;
  border: solid 1px $word-background-light;
}
.btn{
  background-color: $normal-btn;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: none;
}
.card{
  .card-header, .card-footer{
    background-color: $word-background-light;
  }
}
.modal{
  .modal-header{
    background-color:#e3e3e3;
    color: #575757;
  }
  .modal-body{
    background-color: $white-background;
  }
  .modal-footer{
    background-color: $word-background-light;
  }
}
// 以上是試色區----------------------------

.mainpocket{
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $main-background;

  // 以下在card裡面
  .main-area {
    border-radius: 0.25rem;
    margin: 20px auto;
    border: none;
    background-color: $white-background;
    .card-header{
      background-color: transparent;
      // 全部餐廳、推薦餐廳、歷史紀錄的分頁tab
      .nav-tabs{
        justify-content: center;
        margin: auto;
      }
      .nav-tabs .nav-link,
      .nav-tabs .nav-link:hover,
      .nav-tabs .nav-link:active{
        border: none;
        border-radius: 1px;
        cursor: pointer;
        padding: 8px;
      }
      .nav-tabs .nav-link:hover,
      .nav-tabs .nav-link:active,
      .active{
        background-color: #e9e7de;
      }
    }
    .card-body{
      .quickly-search{
        .input-group {
          .input-group-text{
            border:none;
            background-color: #e9e7de;
            border-radius: 1px;
          }
          .form-control{
            border:none;
            background-color: #e9e7de;
            border-radius: 1px;
            box-shadow: none;
          }
          .btn{
            border-radius: 1px;
            box-shadow: none;
          }
          .btn:hover{
            color:#fff;
          }
        }
      }
      .list-length {
        text-align: right;
        margin: 10px 0;
        .redo{
          display: flex;
          justify-content: flex-end;
          align-items: center;
          i {
            font-size: 1.5rem;
          }
        }
      }
      .list-group{
        .main-list{
          background-color: transparent;
          .restaurant-area {
            width: 75%;
            .restaurant-name {
              font-size: 1.2rem;
              i{
                margin-left: 10px;
              }
              .note-icon {
                font-size: 1.4rem;
                color: $main-yellow;
              }
              .status-icon{
                font-size: 1.2rem;
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
              border: solid 1px$main-green;
              color: $main-green;
              i{
                font-size: 1.4rem;
              }
            }
            .calendar-icon {
              border: solid 1px $main-yellow;
              color: $main-yellow;
              i{
                font-size: 1.6rem;
              }
            }
          }
        }
        .addnew{
          .btn{
            border-radius: 1px;
          }
          .btn:hover{
            border-radius: 1px;
            color: #fff;
          }
        }
      }
    }
    .card-footer{
      background-color: transparent;
      display: flex;
      justify-content: flex-start;
    }
  }

  // modal單獨使用
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
        top: 1rem;
        right: 1rem;
        border: solid 1px #555;
        font-size: 1.4rem;
      }
      table{
        table-layout: fixed;
        td{
          text-align: justify;
        }
      }
      .modal-note{
        display: block;
        background-color: $main-yellow;
        color:#fff;
        border-radius:10px;
        padding: 2px 10px;
      }
    }
  }
  #editInfoModal {
    .modal-body{
      .status{
        display: flex;
        justify-content: flex-start;
        input[type="radio"] {
          opacity: 0; //設置透明度，隱藏原有input樣式
          display: none;
        }
        .status-input+label {
          border: 1px solid transparent;
          border-bottom: 1px solid #999;
          padding: 5px;
        }
        input:checked+label {
          background-color: $word-background-light;
          border: 1px solid $word-background-light;
        }
      }
    }
  }

   // modal共用
  .modal{
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 10vh;
    .modal-header{
      h5{
        font-size: 1.2rem;
      }
    }
    .modal-body{
      padding-bottom: 0;
    }
    .modal-footer{
      border-top: none;
      background-color: transparent;
    }
    .btn-danger{
      background-color: $danger;
    }
    .table {
      margin: 0;
      td {
        border: none;
        text-align: left;
        padding: 5px 0;
        li{
          list-style-type: none;
        }
      }
    }
  }

  // 整篇共用
  .fa-thumbtack{
    // modal有 主畫面也有
    transform: rotate(-35deg);
  }

  // :class
  .between {
    justify-content: space-between;
  }
  .end {
    justify-content: flex-end;
  }
}
</style>
