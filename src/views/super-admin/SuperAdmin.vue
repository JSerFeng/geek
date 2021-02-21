<template>
  <div class="super-admin">
   <admin-header/>
    <admin-table/>
    <admin-pagenation/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AdminTable from './components/AdminTable.vue'
import AdminHeader from './components/AdminHeader.vue'
import AdminPagenation from './components/AdminPagenation.vue'
export default defineComponent({
  components:{
    AdminTable,
    AdminHeader,
    AdminPagenation
  }
},
);
</script>

<style lang="scss">

.super-admin {
  background-color: rgba($color: #fff, $alpha: 1);
  width: 95%;
  height: 80%;
  border-radius: 50px;
  margin: 7vh auto;
  text-align: center;
  box-shadow: -1px -1px 3px #ffffff, 1.5px 1.5px 3px rgba(174, 174, 192, 0.4);
  padding-top: 5vh;
  .add-del-button {
    margin-left: 11vh;
    margin-bottom: 4vh;
    display: flex;
  }
  .pagenation-box {
    margin: 0 auto;
    width: 50%;
    text-align: center;
    margin-top: 2vh;
  }
}
</style>