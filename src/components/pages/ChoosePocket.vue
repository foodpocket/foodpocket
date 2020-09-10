<template>
  <div class="foodpocket">
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
        <h1 @click="addPocket">+</h1>
      </div>

      <div class="mt-5">
        已選擇將<span style="font-size:1.2rem;"> {{seleted}} </span>口袋設為主要口袋
      </div>
    </div>
  </div>
</template>

<script>
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
      ]
    }
  },
  methods: {
    selectPocket () {
      // this.$router.push('/foodpocket')
      console.log('您已選擇這個口袋')
    },
    addPocket () {
      // window.confirm('啊！您還不是會員呢！開通會員可享口袋無上限！')
      if (window.confirm('啊！您還不是會員呢！開通會員可享口袋無上限！')) {
        window.alert('好消息！免費取得口袋無上限！')
      } else {
        window.alert('沒關係，您可以再考慮！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

* {
  margin: 0;
}

input[type="radio"]{
  display: none;
}

input:checked + .pockets{
  border: solid 2px $point;
  transition: border 0.2s;
}

.pockets {
  background-color: $second;
  color: $word;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 50px;
  display: flex;
  justify-content: space-between;
  border: solid 2px transparent;
  h1 {
    font-size: 1.5rem;
  }
}
.addpocket-btn {
  margin-top: 50px;
  h1 {
    display: inline;
    background-color: $second;
    color: $word;
    padding: 0 20px;
    border-radius: 50%;
  }
}
</style>
