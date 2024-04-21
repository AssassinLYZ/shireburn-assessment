<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconPlus from '@/components/icons/IconEcosystem.vue'
import { storeToRefs } from 'pinia'
import { tableStore } from '@/store/tableStore'

const tableDataStore = tableStore()
const { filterInput } = storeToRefs(tableDataStore)
</script>

<template>
  <section class="section-card-panel">
    <div class="input">
      <input type="text" name="" id="" placeholder="Search by Occupation" v-model="filterInput" />
      <button v-if="filterInput.length === 0" class="filter-button" type="button">
        <i class="input-icon"><IconSearch /></i>
      </button>
      <button v-else class="filter-button" type="button" @click="filterInput = ''">
        <i class="input-icon"><IconDelete /></i>
      </button>
    </div>
    <!-- <RouterLink class="add-employee" to="/edit-employee">
      <i><IconPlus /></i>Add
    </RouterLink> -->
  </section>
</template>

<style scoped>
.section-card-panel {
  border-bottom: 1px solid var(--color-background-grey);
  display: flex;
  justify-content: space-between;
  align-items: start;
  height: 60px;
}
.input-icon {
  color: #666;
}
.section-card-panel input[type='text'] {
  background-color: var(--color-background-grey);
  border: none;
  outline: none;
  color: #666;
  font-weight: 600;
  font-size: 13px;
  width: 100%;
  padding: 0 50px 0 10px;
  border-radius: 3px;
  margin: 0;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 3px;
  outline: none;
  background-color: transparent;
  font-size: 15px;
}
.input {
  width: 60%;
  position: relative;
}
.filter-button {
  position: absolute;
  padding-top: 10px;
  color: #666;
  top: 0;
  right: 10px;
  height: 30px;
  line-height: 30px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  height: 20px;
}

.add-employee {
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  height: 35px;
  line-height: 35px;
  width: 110px;
  padding: 0 10px;
  border-radius: 25px;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.add-employee i {
  padding-top: 9px;
  padding-right: 10px;
}
.add-employee:hover {
  background-color: hsla(160, 100%, 37%, 0.75);
}
@media (max-width: 680px) {
  /* .section-card-panel input[type='text'] {
    width: 80%;
  } */
  .add-employee {
    font-size: 12px;
    width: 80px;
  }
  .add-employee i {
    display: none;
  }
  .input {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .section-card-panel input[type='text'] {
    width: 100%;
    font-size: 12px;
  }
  .filter-button {
    right: 3px;
  }
  .input {
    width: 100%;
  }
}
@media (max-width: 350px) {
  .section-card-panel {
    flex-wrap: wrap;
    justify-content: center;
  }

  /* .section-card-panel input[type='text'] {
    width: 100%;
  } */
}
</style>
