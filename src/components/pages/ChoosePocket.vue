<template>
  <div class="choosepocket">
    <loading :active.sync="isLoading"></loading>
    <navbar>
      <h1>選擇口袋名單</h1>
    </navbar>

    <bus />

    <div class="container">

      <ul class="list-group list-group-flush text-left">
        <li class="main-list list-group-item" v-for="(item, key) in pocketlist" :key="key">
          <div class="pockets d-flex align-items-center">
            <div class="item" @click="seletedPocket(item)">

              <div v-if="seletedID === item.pocket_uid" style="color: rgb(211, 0, 0);">
                <div class="pocket-name">
                  {{ item.name }}
                  <span>
                    <i class="fas fa-check-double ml-2" style="color: rgb(211, 0, 0);"></i>
                  </span>
                </div>
                <div class="pocket-size">共有{{item.size}}間餐廳</div>
              </div>

              <div v-if="seletedID !== item.pocket_uid">
                <div class="pocket-name">{{ item.name }}</div>
                <div class="pocket-size">共有{{item.size}}間餐廳</div>
              </div>

            </div>

            <div class="icon-button edit-btn">
              <a class="pen-icon" @click.prevent="openEditPocketModal(item)">
                <i class="fas fa-pen"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>

      <div class="icon-button addpocket-btn">
        <a class="plus-icon" @click.prevent="openAddPocketModal">
          <i class="fas fa-plus"></i>
        </a>
      </div>
    </div>

    <!-- addPocket 加號鈕卡片 -->
    <div
      class="modal fade"
      id="addPocket"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addPocketLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <!-- header(標題) -->
          <div class="modal-header">
            <h5 class="modal-title" id="addPocketLabel">
              <span>新增食物口袋</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- body(內容) -->
          <div class="modal-body">
            <div class="form-group">
              <label for="name">新增口袋名稱</label>
              <input
                type="text"
                class="form-control mb-2"
                id="name"
                placeholder="請輸入餐廳名稱"
                v-model="newPocketName"
              />
            </div>
          </div>

          <div class="modal-footer">
            <!-- footer (按鈕)-->
            <button type="button" class="btn btn-sm" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-sm" @click="addNewPocket">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- editPocket 編輯鈕卡片 -->
    <div
      class="modal fade"
      id="editPocket"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editPocketLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <!-- header(標題) -->
          <div class="modal-header">
            <h5 class="modal-title" id="editPocketLabel">
              <span>編輯食物口袋</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- body(內容) -->
          <div class="modal-body">
            <div class="form-group">
              <label for="editname">編輯口袋名稱</label>
              <input
                type="text"
                class="form-control mb-2"
                id="editname"
                placeholder="請輸入餐廳名稱"
                v-model="editModalObj.name"
              />
            </div>
          </div>

          <div class="modal-footer">
            <!-- footer (按鈕)-->
            <button type="button" class="btn btn-sm" @click="openRemovePocketModal(copyModalObj)">
              <i class="fas fa-trash-alt" style="font-size:1.1rem;"></i>
            </button>
            <button type="button" class="btn btn-sm" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-sm" @click="editPocket(copyModalObj)">確認</button>
          </div>
        </div>
      </div>
    </div>

    <!-- removePocket 刪除鈕卡片 -->
    <div
      class="modal fade"
      id="removePocket"
      tabindex="-1"
      role="dialog"
      aria-labelledby="removePocketLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <!-- modal-header -->
            <h5 class="modal-title" id="removePocketModalLabel">
              <span>刪除{{copyModalObj.name}}口袋</span>
            </h5>
            <button type="button" class="close" aria-label="Close" @click="doNotDelete">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 刪除卡片確認區-body -->
            <div>
              <i class="fas fa-exclamation-triangle text-warning" style="font-size:1.5rem;"></i>警告<i class="fas fa-exclamation-triangle text-warning" style="font-size:1.5rem;"></i>
              <br />刪除
              <strong class="text-danger">{{copyModalObj.name}} </strong>
              口袋後
              <br />此口袋內的餐廳及到訪記錄
              <strong class="text-danger">都會被刪除</strong>
              <div>(刪除後將無法恢復)</div>
            </div>
          </div>

          <div class="modal-footer">
            <!-- 刪除卡片確認區-footer -->
            <button type="button" class="btn btn-sm" @click="doNotDelete">取消</button>
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="removePocket(copyModalObj)"
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
import navbar from '@/components/navbar.vue'
import bus from '@/components/bus.vue'

export default {
  components: {
    navbar,
    bus
  },
  data () {
    return {
      token: '',
      isLoading: false,
      seletedName: '',
      seletedID: '',
      newPocketName: '',
      pocketlist: [], // 從API來的
      copyModalObj: {},
      // pocketlist的其中一個object，淺複製，代表不動的資料，仿原始資料
      editModalObj: {}
      // pocketlist的其中一個object，淺複製，用來編輯
    }
  },
  created () {
    this.getToken()
    this.getPocketList()
  },
  computed: {
    successbus () {
      return this.$store.state.successbus
    },
    dangerbus () {
      return this.$store.state.dangerbus
    }
  },
  methods: {
    // 必要的 --------
    getToken () {
      if (this.$cookies.isKey('token')) {
        this.token = this.$cookies.get('token')
        // console.log(this.token)
      } else {
        this.$router.push('/loginpage')
      }
    },
    getPocketList () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}api/rest/getPocketList/`
      this.$http
        .get(api, { params: { user_token: this.token } })
        .then(response => {
          this.isLoading = false
          // console.log('getPocketList:', response.data)
          this.pocketlist = response.data.data
          this.seletedName = this.$cookies.get('getpocketname')
          this.seletedID = this.$cookies.get('getpocketid')
          this.$cookies.set('pocketnum', this.pocketlist.length)
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
    },

    // 開啟/關閉Modal --------
    openAddPocketModal () {
      this.newPocketName = '' // 清空
      $('#addPocket').modal('show')
    },
    openEditPocketModal (item) {
      // item是pocketlist的其中一個object
      $('#editPocket').modal('show')
      this.editModalObj = Object.assign({}, item)
      this.copyModalObj = Object.assign({}, item)
    },
    openRemovePocketModal (item) {
      // item是copyModalObj
      $('#editPocket').modal('hide')
      $('#removePocket').modal('show')
    },
    doNotDelete () {
      $('#removePocket').modal('hide')
    },

    // (真)針對Pocket的動作 --------
    addNewPocket () {
      if (this.newPocketName === '') {
        this.$bus.$emit('message:push', '口袋名稱不可為空', 'danger')
      }
      const newPocketName = this.newPocketName.trim() // 修掉輸入的空白
      if (!newPocketName) {
        return
      }
      const api = `${process.env.VUE_APP_APIPATH}api/rest/newPocket/`
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('name', this.newPocketName)
      this.axios
        .post(api, formdata)
        .then(response => {
          // console.log('newPocket:', response.data)
          this.getPocketList()
          $('#addPocket').modal('hide')
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
      $('#addPocket').modal('hide')
      this.newPocketName = '' // 清空
    },
    editPocket (item) {
      // item是copyModalObj
      if (this.editModalObj.name !== item.name) {
        // 確認名字有改過
        if (this.editModalObj.name !== '') {
          // 且注意名字不等於空
          const api = `${process.env.VUE_APP_APIPATH}api/rest/editPocket/`
          const formdata = new FormData()
          formdata.append('user_token', this.token)
          formdata.append('pocket_uid', this.editModalObj.pocket_uid)
          formdata.append('name', this.editModalObj.name)
          this.axios
            .post(api, formdata)
            .then(response => {
              // console.log('editPocket:', response.data)
              this.getPocketList()
              $('#editPocket').modal('hide')
              this.$cookies.set('getpocketid', item.pocket_uid) // 放到cookies
              this.$cookies.set('getpocketname', item.name) // 放到cookies
              this.$bus.$emit('message:push', '成功編輯口袋名稱', this.successbus)
            })
            .catch(err => {
              if (err.response.status === 401) {
                this.$router.push('/loginpage')
              }
            })
        } else {
          this.$bus.$emit('message:push', '口袋名稱不能為空', this.dangerbus)
        }
      } else {
        console.log('並未改變')
        $('#editPocket').modal('hide')
      }
    },
    removePocket (item) {
      // item是copyModalObj
      const api = `${process.env.VUE_APP_APIPATH}api/rest/removePocket/`
      const formdata = new FormData()
      formdata.append('user_token', this.token)
      formdata.append('pocket_uid', item.pocket_uid)
      this.axios
        .post(api, formdata)
        .then(response => {
          // console.log('removePocket:', response.data)
          this.$bus.$emit(
            'message:push',
            '成功刪除 ' + item.name + ' 口袋',
            this.successbus
          )
          this.$cookies.set('getpocketid', this.pocketlist[0].pocket_uid) // 放到cookies
          this.$cookies.set('getpocketname', this.pocketlist[0].name) // 放到cookies
          this.getPocketList()
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
          if (err.response.status === 403) {
            this.$bus.$emit(
              'message:push',
              '不可刪除，帳號內至少需要一個口袋',
              this.dangerbus
            )
          }
        })
      $('#removePocket').modal('hide')
    },

    // 選擇的動作 --------
    seletedPocket (item) {
      this.$cookies.set('getpocketid', item.pocket_uid) // 放到cookies
      this.$cookies.set('getpocketname', item.name) // 放到cookies
      this.$router.push('/foodpocket')
    }
  }
}
</script>

<style lang="scss" scoped>
.choosepocket {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $main-background;
  .txt {
    background: rgba(255, 166, 0, 0.3);
    border-radius: 10px;
    text-align: center;
    padding: 3px 0;
    span {
      color: $main-red;
      padding: 0 10px;
      margin: 0 10px;
    }
  }
  .list-group {
    margin-top: 20px;
    border-radius: 0.25rem;
    .main-list {
      background-color: $white-background;
      .pockets {
        .item {
          width: 75%;
          .pocket-name {
            font-size: 1.2rem;
          }
          .pocket-size {
            font-size: 0.8rem;
          }
        }
        .edit-btn {
          width: 40%;
          justify-content: flex-end;
          a:active,
          a:hover {
            color: $main-yellow;
          }
          .pen-icon {
            border: solid 1px $main-yellow;
            color: $main-yellow;
          }
        }
      }
    }
  }
  .icon-button {
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
    i {
      font-size: 1.4rem;
    }
  }
  .addpocket-btn {
    justify-content: center;
    align-items: center;
    margin: 40px;
    a:active,
    a:hover {
      color: $main-green;
    }
    .plus-icon {
      border: solid 1px $main-green;
      color: $main-green;
    }
  }
  .modal {
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 10vh;
    .modal-header {
      background-color:#e3e3e3;
      color: #575757;
      h5{
        font-size: 1.2rem;
      }
    }
    .modal-body {
      background-color: $white-background;
      padding-bottom: 0;
    }
    .modal-footer {
      border-top: none;
      background-color: transparent;
      .btn-danger{
        background-color: $danger;
      }
    }
    .btn {
      background-color: $normal-btn;
      color: #fff;
      border: none;
      outline: none;
    }
  }
}
</style>
