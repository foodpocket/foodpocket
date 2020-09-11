<template>
  <div class="choosepocket">
    <navbar>
      <h1>選擇口袋名單</h1>
    </navbar>
    <div class="container">

      <div v-for="(item, index) in pockets" :key="index">
        <input type="radio" :id="item.pocketName" name="pockets" :value="item.pocketName" v-model="seleted"/>
        <label class="pockets" :for="item.pocketName">
          <h1>{{item.pocketName}}</h1>
          <p>共有{{item.dataNum}}筆資料</p>
        </label>
      </div>

       <div class="addpocket-btn">
        <a @click.prevent="openAddPocketModal" class="plus-icon"><i class="fas fa-plus"></i></a>
       </div>

      <div class="mt-5">
        已選擇將<span style="font-size:1.2rem;"> {{seleted}} </span>口袋設為主要口袋
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
              <input type="text" class="form-control mb-2" id="name" placeholder="請輸入餐廳名稱" v-model="newPocketName"/>
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
  </div>
</template>

<script>
import $ from 'jquery'
import navbar from '@/components/navbar.vue'

export default {
  components: {
    navbar
  },
  data () {
    return {
      seleted: '我的日常餐廳',
      pockets: [
        {
          pocketName: '我的日常餐廳',
          dataNum: 30
        },
        {
          pocketName: '台南美食',
          dataNum: 20
        },
        {
          pocketName: '台北美食',
          dataNum: 12
        }
      ],
      newPocketName: ''
    }
  },
  methods: {
    selectPocket () {
      console.log('您已選擇這個口袋')
    },
    openAddPocketModal () {
      this.newPocketName = '' // 清空
      $('#addPocket').modal('show')
    },
    addNewPocket () {
      console.log('addNewPocket:', this.newPocketName)
      $('#addPocket').modal('hide')
      this.pockets.push({
        pocketName: this.newPocketName,
        dataNum: 0
      })
      this.newPocketName = '' // 清空
    }
  }
}
</script>

<style lang="scss" scoped>

.choosepocket{
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: $light-background;
  .pockets {
    background-color: $second;
    color: $deep;
    margin: 20px auto;
    padding: 10px 20px;
    border-radius: 50px;
    display: flex;
    justify-content: space-between;
    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    p{
      margin: 0;
    }
  }

  .addpocket-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 40px;
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
      border: solid 1px $point;
      color: $point;
      i{
        font-size: 1.4rem;
      }
    }
  }

  input[type="radio"]{
    display: none;
  }
  input:checked + .pockets{
    background: $primary;
    color: $light-background;
    transition: 0.2s;
  }

  .modal{
    max-height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .modal-header{
      background-color: $point;
    }
    .modal-body{
      background-color: $light-background;
    }
    .modal-footer{
      background-color: $second;
    }
    .btn{
      background-color: $primary;
      color: $light-background;
      border: none;
      outline: none;
    }
  }
}
</style>
