<template>
  <div style="z-index: 9999;">
    <nav id="sidebar" class="active">
      <div class="sidebar-header">
        <h1>FoodPocket</h1>
      </div>

      <ul class="navbar-nav list-unstyled components">
        <li class="nav-item" @click="controlsidebar">
            <router-link class="nav-link after" to="/foodpocket">
              <i class="fas fa-home"></i>主頁
            </router-link>
        </li>

        <li class="nav-item" @click="controlsidebar">
            <router-link class="nav-link after" to="/foodpocket/choosepocket">
              <i class="fas fa-clipboard-list"></i>口袋名單
            </router-link>
        </li>

        <li class="nav-item" @click="controlsidebar">
            <router-link class="nav-link after" to="/foodpocket/userinfo">
              <i class="fas fa-user"></i>個人資訊
            </router-link>
        </li>

        <!-- <li class="nav-item" @click="controlsidebar">
            <router-link class="nav-link after" to="/foodpocket/setting">
              <i class="fas fa-cog"></i>設定
            </router-link>
        </li> -->

        <li class="logout" @click.prevent="logout">
          <a href="#">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  methods: {
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
        this.$cookies.remove('getpocketid')
        this.$cookies.remove('getpocketname')
        this.$cookies.remove('username')
        this.$cookies.remove('pocketnum')
      }
      window.alert('登出成功')
      this.$router.push('/landingpage')
    },
    controlsidebar () {
      // 配合sidebar使用 用id就會只有一個，就不會呼叫錯了
      $('#sidebar').toggleClass('active')
      $('#overlay').toggleClass('active')
    }
  }
}
</script>

<style scoped lang="scss">

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.2s;
}

.activee{
  color: $deep;
  background: $sidebar-second;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  min-height: 100%;
  background: $sidebar-main;
  color: $deep;
  transition: all 0.3s;
  box-shadow: 0 0 5px #777;
  .sidebar-header {
    padding: 20px;
    background: $sidebar-second;
    h1{
      font-size: 1.6rem;
    }
  }
  ul.components {
    text-align: left;
    padding: 20px 0;
    border-bottom: 1px solid $sidebar-second;
    li a {
      padding: 10px;
      font-size: 1.1em;
      display: block;
      .fas {
        padding-right: 10px;
      }
    }
    li a:hover {
      color: $deep;
      background: $sidebar-second;
    }
    li.logout {
      margin: 50px 0;
      text-align: center;
      color: $main-red;
      background: $sidebar-second;
    }
  }
  // ul li.active > a,
  // a[aria-expanded="true"] {
  //   color: $word;
  //   background: $sidebar-second;
  // }
}

#sidebar.active {
  margin-left: -250px;
  box-shadow: 0 0 0;
}

// @media (max-width: 768px) {
//   #sidebar {
//     margin-left: -250px;
//   }
//   #sidebar.active {
//     margin-left: 0;
//   }
// }
</style>
