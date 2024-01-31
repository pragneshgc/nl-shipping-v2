<template>
  <div class="natcol-table" :class="[columnClass]">
    <transition name="fade">
      <div class="loader" v-show="loading">Loading...</div>
    </transition>

    <div class="card">
      <div class="">
        <div class="row search-boxes">
          <div v-for="(filter, index) in filters" :key="index" class="filter-inputs">
            <input v-model="selectedFilters[filter.value]" v-if="filter.type == 'text'" class="form-control tBoxSize02" :placeholder="filter.title"/>
            <datepicker v-else-if="filter.type == 'date'" :placeholder="filter.title" :name="filter.value" v-model="selectedFilters[filter.value]" maxlength="30"></datepicker>
            <select class="table-dropdown" v-else-if="filter.type == 'select'" :name="filter.value" v-model="selectedFilters[filter.value]">
              <option v-for="(option, index) in filter.options" :key="index" :value="option.value">
                {{ option.title }}
              </option>
            </select>
            <input v-model="selectedFilters[filter.value]" v-else class="form-control tBoxSize02" :placeholder="filter.title"/>
          </div>
        </div>
        <div class="row filters-row">
          <div>
            <input name="strict" type="checkbox" :checked="strict" />
            <label for="strict" @click="strict = !strict">Exact match</label>
          </div>
          <button :disabled="loading" class="btn btnSize02 tertiaryBtn" @click="getData()">
            Search
          </button>
        </div>
        <div class="row filters-row">
          <div class="filter-inputs">
            <select v-model="limit" class="table-dropdown">
              <option value="10">Show 10</option>
              <option value="20">Show 20</option>
              <option value="50">Show 50</option>
              <option value="100">Show 100</option>
              <option value="200">Show 200</option>
              <option value="9999999999">Show All</option>
            </select>
          </div>
          <div class="dropdown float-right">
            <a class="btn btn-primary waves-effect" v-on:click="printChart($el)"><i class="fa fa-print" aria-hidden="true"></i></a>
            <a class="btn btn-primary waves-effect" v-on:click="exportPDF($el)"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></a>
            <a v-if="csvUrlSearch" class="btn btn-primary waves-effect" :href="csvUrlSearch"><i class="fa fa-file" aria-hidden="true"></i></a>
            <a v-else class="btn btn-primary waves-effect" v-on:click="exportCSV(data.data, tableTitle)"><i class="fa fa-file" aria-hidden="true"></i></a>
          </div>
        </div>
        <slot> </slot>
      </div>

      <div class="card-body">
        <table style="table-layout: auto" v-show="data.length >= 1" class="table table-hover">
          <thead class="primary-color text-white">
            <tr>
              <th v-if="checkboxVisible" style="width: 40px;font-weight: 400;padding: 16px 8px;vertical-align: top;"></th>
              <th class="clickable" v-for="(value, key) in data[0]" v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true"
                v-on:click="setOrder(key)">
                {{ translate(key) }}
                <i v-if="key == orderBy && orderDirection == 'DESC'" class="fa fa-caret-down"></i>
                <i v-if="key == orderBy && orderDirection == 'ASC'"  class="fa fa-caret-up"></i>
                <i v-if="key != orderBy" class="fa fa-sort"></i>
              </th>
              <th style="width: 50px"></th>
            </tr>
          </thead>

          <tbody>
            <tr class="clickable" @dblclick="redirect(item[redirectId])" v-for="item in data.data" :key="item[Object.keys(item)[0]]">
              <td v-if="checkboxVisible">
                <input :name="item[Object.keys(item)[0]]" type="checkbox" :checked="checked.includes(item[Object.keys(item)[0]])"/>
                <label :for="item[Object.keys(item)[0]]" @click="check(item)"></label>
              </td>
              <td v-for="(value, key) in item" v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true">
                <span v-if="typeof value == 'string'" v-html="value"></span>
                <ul v-else-if="typeof value == 'object'">
                  <li v-for="obj in value" v-html="obj"></li>
                </ul>
                <span v-else v-html="value"></span>
              </td>
              <td>
                <a class="btn btn-primary waves-effect table-icon" @click="redirect(item[redirectId])">
                  <i class="fa fa-search-plus" aria-hidden="true"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-show="data.length <= 0">No data found!</div>
      </div>

      <div class="card-footer">
        <div class="paginator pagination example" v-show="data.to > 1">
          <!-- Pagination code remains unchanged -->
        </div>
        <div class="paginatorInfo" v-if="data.total > 1">
          Showing {{ data.from }} to {{ data.to }} of {{ data.total }}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, reactive, onMounted, computed } from 'vue';
import TableComponent from './TableComponent.vue';
import Datepicker from 'vuejs3-datepicker';
import axios from 'axios';

export default {
  extends: TableComponent,
  components: {
    Datepicker,
  },
  setup(props) {
    const strict = ref(true);
    const selectedFilters = reactive({});
    const data = ref([]);
    const loading = ref(false);

    const csvUrlSearch = computed(() => {
      if (props.tableTitle === 'Register') {
        return (
          '/orders/csv/register' +
          props.currentPageParam +
          props.currentQueryString +
          props.currentRangeParam +
          props.currentOrderParam +
          props.currentLimitParam +
          filterParams()
        );
      } else {
        return (
          '/reports/csv' +
          props.currentPageParam +
          props.currentQueryString +
          props.currentRangeParam +
          props.currentOrderParam +
          props.currentLimitParam +
          filterParams()
        );
      }
    });

    const getData = () => {
      loading.value = true;      

      axios
        .get(
          	props.dataUrl +
            props.currentPageParam +
            props.currentQueryString +
            props.currentRangeParam +
            props.currentOrderParam +
            props.currentLimitParam +
            filterParams()
        )
        .then((response) => {          
          data.value = response.data.data;
          loading.value = false;

          let visible = data.value.map(function (item) {
            return item[Object.keys(item)[0]];
          });
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const filterParams = () => {
      let param = JSON.stringify(selectedFilters);
      return `&f=${param}&strict=${strict.value}`;
    };

    onMounted(() => {
      props.filters.forEach((filter) => {
        if (filter.type === 'select') {
          selectedFilters[filter.value] = '';
        }
      });
    });

    return {      
      strict,
      selectedFilters,
      data,
      loading,
      csvUrlSearch,
      getData,
      filterParams,
    };
  },
};
</script>


