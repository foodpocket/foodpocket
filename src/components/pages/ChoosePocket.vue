<template>
  <div class="choosepocket">
    <navbar>
      <h1>選擇口袋名單</h1>
    </navbar>

    <bus />

    <div class="container">

      <ul class="list-group list-group-flush text-left">
        <li class="main-list list-group-item" v-for="(item, key) in pocketlist" :key="key">
          <div class="d-flex align-items-center">
            <div class="pockets-list" @click="seletedPocket(item)">
              <div class="pocket-name">{{ item.name }}
                <span v-if="seletedID === item.pocket_uid"><i class="fas fa-check-double"></i></span>
              </div>
              <div class="pocket-size">共有{{item.size}}間餐廳</div>
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

      <div class="test text-left mt-5">
        已選擇將<span style="font-size:1.2rem;color:red;"> {{seletedName}} </span>口袋設為主要口袋
        <br />
        seletedID: <span style="color:blue;">{{seletedID}}</span>
        <br />
        token: <span style="color:blue;">{{token}}</span>
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
          <div class="modal-header text-white">
            <h5 class="modal-title" id="addPocketLabel">
              <span>新增食物口袋</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
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
          <div class="modal-header text-white">
            <h5 class="modal-title" id="editPocketLabel">
              <span>編輯食物口袋</span>
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
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
          <div class="modal-header text-white">
            <!-- modal-header -->
            <h5 class="modal-title" id="removePocketModalLabel">
              <span>刪除{{copyModalObj.name}}口袋</span>
            </h5>
            <button type="button" class="close text-white" aria-label="Close" @click="doNotDelete">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <!-- 刪除卡片確認區-body -->
            <div>
              警告！
              <br />
              <strong class="text-danger">刪除</strong>
              {{copyModalObj.name}} 口袋後
              <br />所有此口袋內的餐廳不會被刪除（暫定）
            </div>
          </div>

          <div class="modal-footer">
            <!-- 刪除卡片確認區-footer -->
            <button type="button" class="btn btn-sm" @click="doNotDelete">取消</button>
            <button
              type="button"
              class="btn btn-sm"
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
      seleted: '',
      newPocketName: '',
      // pocketlist: [], // 從API來的
      copyModalObj: {}, // pocketlist的其中一個object，淺複製，代表不動的資料，仿原始資料
      editModalObj: {} // pocketlist的其中一個object，淺複製，用來編輯
    }
  },
  created () {
    this.getToken()
    this.getPocketList()
  },
  computed: {
    pocketlist () {
      return this.$store.state.pocketlist
    },
    seletedName () {
      return this.$store.state.seletedName
    },
    seletedID () {
      return this.$store.state.seletedID
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
      const api = `${process.env.VUE_APP_APIPATH}api/rest/getPocketList/`
      this.$http
        .get(api, { params: { user_token: this.token } })
        .then(response => {
          // console.log('getPocketList:', response.data)
          const pocketlist = response.data.data
          this.$store.dispatch('getpocketlist', pocketlist)
          console.log('這個呼叫來自ChoosePocket。vuex確實有得到pocketlist喔')
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
    openEditPocketModal (item) { // item是pocketlist的其中一個object
      $('#editPocket').modal('show')
      this.editModalObj = Object.assign({}, item)
      this.copyModalObj = Object.assign({}, item)
    },
    openRemovePocketModal (item) { // item是copyModalObj
      $('#editPocket').modal('hide')
      $('#removePocket').modal('show')
    },
    doNotDelete () {
      $('#removePocket').modal('hide')
    },

    // (真)針對Pocket的動作 --------
    addNewPocket () {
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
    editPocket (item) { // item是copyModalObj
      if (this.editModalObj.name !== item.name) { // 確認名字有改過
        console.log('this.editModalObj.name:', this.editModalObj.name)
        console.log('item.name:', item.name)
        if (this.editModalObj.name !== '') { // 且注意名字不等於空
          const api = `${process.env.VUE_APP_APIPATH}api/rest/editPocket/`
          const formdata = new FormData()
          formdata.append('user_token', this.token)
          formdata.append('pocket_uid', this.editModalObj.pocket_uid)
          formdata.append('name', this.editModalObj.name)
          this.axios
            .post(api, formdata)
            .then(response => {
              // console.log('editPocket:', response.data)
              console.log('成功')
              this.getPocketList()
              $('#editPocket').modal('hide')
              this.$bus.$emit('message:push', '成功編輯口袋名稱', 'success')
            })
            .catch(err => {
              if (err.response.status === 401) {
                this.$router.push('/loginpage')
              }
            })
        } else {
          this.$bus.$emit('message:push', '口袋名稱不能為空', 'danger')
        }
      } else {
        console.log('並未改變')
        $('#editPocket').modal('hide')
      }
    },
    removePocket (item) { // item是copyModalObj
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
            'success'
          )
          this.getPocketList()
          $('#removePocket').modal('hide')
        })
        .catch(err => {
          if (err.response.status === 401) {
            this.$router.push('/loginpage')
          }
        })
      $('#removePocket').modal('hide')
    },

    // 選擇的動作 --------
    seletedPocket (item) {
      // console.log('item:', item)
      // console.log('item.name:', item.name)
      // console.log('item.pocket_uid:', item.pocket_uid)
      // console.log('item.size:', item.size)
      // ------------------------------------------------
      const pocketid = item.pocket_uid
      const pocketname = item.name
      this.$store.dispatch('getpocketid', pocketid)
      this.$store.dispatch('getpocketname', pocketname)
      // ------------------------------------------------
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
  background-color: $light-background;
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
  .list-group {
    margin-top: 20px;
    .pockets-list {
      width: 75%;
      // background-color: aquamarine;
      .pocket-name {
        font-size: 1.2rem;
      }
      .pocket-size {
        font-size: 0.8rem;
      }
    }
    .edit-btn {
      width: 40%;
      // background-color: rgb(113, 138, 130);
      justify-content: flex-end;
      a:active,
      a:hover {
        color: #ffa600;
      }
      .pen-icon {
        border: solid 1px #ffa600;
        color: #ffa600;
      }
    }
  }
  .addpocket-btn {
    justify-content: center;
    align-items: center;
    margin: 40px;
    a:active,
    a:hover {
      color: #54cc24;
    }
    .plus-icon {
      border: solid 1px #54cc24;
      color: #54cc24;
    }
  }

  .modal {
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .modal-header {
      background-color: $point;
    }
    .modal-body {
      background-color: $light-background;
    }
    .modal-footer {
      background-color: $second;
    }
    .btn {
      background-color: $primary;
      color: $light-background;
      border: none;
      outline: none;
    }
  }
}
</style>
