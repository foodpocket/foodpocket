<template>
  <div style="z-index: 9999;">
    <nav id="sidebar" class="active">
      <div class="sidebar-header">
        <h3>FoodPocket</h3>
      </div>

      <ul class="list-unstyled components">
        <li class="active">
          <a href="#">
            <i class="fas fa-clipboard-list"></i>口袋名單
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fas fa-user"></i>個人資訊
          </a>
        </li>

        <li>
          <a href="#">
            <i class="fas fa-cog"></i>設定
          </a>
        </li>

        <li class="logout" @click.prevent="logout">
          <a href="#">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      if (this.$cookies.isKey('token')) {
        this.$cookies.remove('token')
      }
      window.alert('登出成功')
      this.$router.push('/loginpage')
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

#sidebar {
  min-width: 200px;
  max-width: 200px;
  min-height: 100%;
  background: #eee;
  color: #000;
  transition: all 0.3s;
  box-shadow: 0 0 5px #777;
  .sidebar-header {
    padding: 20px;
    background: #ddd;
  }
  ul.components {
    text-align: left;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
    li a {
      padding: 10px;
      font-size: 1.1em;
      display: block;
      .fas {
        padding-right: 10px;
      }
    }
    li a:hover {
      color: #007bff;
      background: #fff;
    }
    li.logout {
      margin: 50px auto;
      text-align: center;
      background: #fff;
      color: rgb(180, 0, 0);
    }
  }
  ul li.active > a,
  a[aria-expanded="true"] {
    color: #007bff;
    background: #fff;
  }
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
