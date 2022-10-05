<script setup>
</script>

<template>
  <header class="header">
    <div>
      <img src="@/assets/images/svg/logo.svg" alt="logo" width="90" height="43" class="logo">
    </div>
    <div class="header-right">
      <div class="user">
        <img src="@/assets/images/svg/logo.svg" alt="user" width="35" height="35">
      </div>
      <div>
        <font-awesome-icon icon="fa-solid fa-caret-down" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  line-height: 1;
  border: 1px solid  #e2e2e2;;
  background-color: #fff;
  .logo {
    margin-top: 4px;
  }
  &-right {
    display: flex;
    align-items: center;
  }
  .user {
    border-radius: 35px;
    img {
      margin: 7px 6px 6px 7px;
    }
    
  }
}
</style>
