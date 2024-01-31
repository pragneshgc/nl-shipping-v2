<template>

    <!--Grid column-->
    <div class=" natcol-table" :class="[columnClass]">
        <transition name="fade">
            <div class="loader" v-show="loading">Loading...</div>
        </transition>

        <!--Card-->
        <div class="card">
            <div class="card-header">
                <div class="row filters-row">
                    <div class="filter-inputs">
                        <input v-model="queryString" type="text" class="form-control tBoxSize02" id="queryString" placeholder="Search...">
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
                        <a v-if="csvUrl" class="btn btn-primary waves-effect" :href="csvUrl"><i class="fa fa-file" aria-hidden="true"></i></a>
                        <a v-else class="btn btn-primary waves-effect" v-on:click="exportCSV(data.data, tableTitle)"><i class="fa fa-file" aria-hidden="true"></i></a>                            
                    </div>
                </div>
                <slot>
                </slot>            
            </div>
            <!--Card content-->
            <div class="card-body">
                <!-- Table  -->
                <table v-show="data.data.length >= 1" class="table table-hover">
                    <!-- Table head -->
                    <thead class="primary-color text-white">
                        <tr>
                            <th  v-if="checkboxVisible" style="
                                width: 40px;
                                font-weight: 400;
                                padding: 16px 8px;
                                vertical-align: top;
                            ">
                            </th>
                            <th 
                            class="clickable" 
                            v-for="(value, key) in data.data[0]" 
                            v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true" 
                            v-on:click="setOrder(key)"
                            >                               
                                {{translate(key)}}

                                <i v-if="key == orderBy && orderDirection == 'DESC'" class="fa fa-caret-down"></i>
                                <i v-if="key == orderBy && orderDirection == 'ASC'" class="fa fa-caret-up"></i>
                                <i v-if="key != orderBy" class="fa fa-sort"></i>
                            </th>
                            <th style="width: 80px;"></th>
                        </tr>
                    </thead>
                    <!-- Table head -->

                    <!-- Table body -->
                    <!--<transition-group tag="tbody" name="table-row">-->
                    <tbody>
                        <!--@dblclick="redirect(item[redirectId])"   -->
                        <tr 
                        class="clickable"
                        @dblclick="redirect(item[redirectId])"
                        v-for="item in data.data" :key="item[Object.keys(item)[0]]">
                            <td v-if="checkboxVisible">
                                <!-- <label class="checkboxElement"> -->
                                    <input 
                                    :name="item[Object.keys(item)[0]]" 
                                    type="checkbox" 
                                    :disabled="item.disabled == 1"
                                    :checked="checked.includes(item[Object.keys(item)[0]]) || item.disabled == 1">
                                    <label :for="item[Object.keys(item)[0]]" @click="check(item)"></label>
                                    <!-- <span class="checkmark"></span>  -->
                                <!-- </label> -->
                            </td>
                            <td v-for="(value, key) in item" v-if="typeof hiddenColumns != 'undefined' ? !hiddenColumns.includes(key) : true">
                                <span v-if="typeof value == 'string'" v-html="value"></span>
                                <ul v-else-if="typeof value == 'object'">
                                    <li v-for="obj in value">{{ obj }}</li>
                                </ul>
                                <span v-else v-html="value"></span>
                            </td>
                            <td>
                                <a class="btn btn-primary waves-effect table-icon" @click="redirect(item[redirectId])">
                                    <i class="fa fa-search-plus" aria-hidden="true"></i>
                                </a>
                                <a 
                                v-if="deleteId"
                                class="btn btn-primary waves-effect table-icon" 
                                v-on:click="deleteItem(item[deleteId])"
                                v-bind:class="{'clickable': deleteId}"
                                >
                                <i class="fa fa-trash" aria-hidden="true"></i>   
                                </a>   
                            </td>
                        </tr>
                    </tbody>
                    <!--</transition-group>-->
                    <!-- Table body -->
                </table>
                <!-- Table  -->
                <div v-show="data.data.length <= 0">
                    No prescriptions found!
                </div>
            </div>
            <div class="card-footer">
                <div class="paginator pagination example" v-show="data.to > 1">
                    <ul class="pagination pg-blue">
                        <li class="page-item" v-bind:class="{ 'disabled': data.current_page == 1 }"
                        v-on:click="changePage(data.current_page - 1)">
                            <a class="page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item" v-bind:class="{ 'active': data.current_page == 1 }"
                        v-on:click="changePage(1)">
                            1
                        </li>
                        <li class="page-item" v-if="(data.current_page - 1) != 1 && (data.current_page) != 1"
                        v-on:click="changePage(data.current_page - 1)">
                            {{ data.current_page - 1 }}
                        </li>
                        <li class="active page-item" v-if="data.current_page != 1">
                            {{ data.current_page }}
                        </li>
                        <li class="page-item" 
                        v-if="(data.current_page + 1) != data.last_page && (data.current_page) != data.last_page"
                        v-on:click="changePage(data.current_page + 1)">
                            {{ data.current_page + 1 }}
                        </li>
                        <li class="page-item" v-if="data.current_page != data.last_page"
                        v-on:click="changePage(data.last_page)">
                            {{ data.last_page }}
                        </li>
                        <li class="page-item" v-bind:class="{ 'disabled': data.current_page == data.last_page }"
                        v-on:click="changePage(data.current_page + 1)">
                            <a class="page-link" aria-label="Next" >
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>                        
                    </ul>
                </div>
                <div class="paginatorInfo" v-if="data.total > 1">
                    Showing {{data.from}} to {{data.to}} of {{data.total}}
                </div>
            </div>
        </div>
        <!--/.Card-->
    </div>
    <!--Grid column-->
</template>

<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { printUrl, printHtml, printFile, printLabel, printPage, printChart, printImages, printHTML } from '../mixins/print';
import { exportPDF } from '../mixins/pdf';
import { reportError, postError, postErrorPopup, postSuccess, reportErrorToast } from '../mixins/errors';
import { exportCSV, arrayToCSV } from '../mixins/csv';

export default {
  props: [
    'dataUrl', 'columnClass', 'tableTitle', 'hasRange', 'generalQuery', 'redirectName','redirectId', 
    'filters', 'hiddenColumns', 'csvUrl', 'columnMap', 'deleteUrl', 'deleteId','checkboxVisible'
  ],
  // mixins: [Print, PDF, CSV, Error],
  setup(props) {
    const data = ref({
      current_page: props.$route.query.p || 1,
      to: 1,
      data: {}
    });

    const loading = ref(false);
    const pageSelection = ref(1);
    const range = ref({ label: 'Last month', value: '30' });
    const rangeOptions = [
      { label: 'Last week', value: '7' },
      { label: 'Last 2 weeks', value: '14' },
      { label: 'Last month', value: '30' },
      { label: 'Last 2 months', value: '60' },
      { label: 'Last 6 months', value: '180' },
    ];

    const queryString = ref(props.$route.query.q || '');
    const selectedFilters = ref({});
    const orderBy = ref('');
    const filter = ref({});
    const orderDirection = ref('');
    const limit = ref('200');

    const currentPageParam = ref(`?page=${data.value.current_page}`);
    const currentRangeParam = ref(props.hasRange ? `&range=${range.value}` : '');
    const currentQueryString = ref(queryString.value !== '' ? `&q=${queryString.value}` : '');
    const currentOrderParam = ref(orderBy.value !== '' ? `&orderBy=${orderBy.value}&orderDirection=${orderDirection.value}` : '');
    const currentLimitParam = ref(limit.value !== '' ? `&limit=${limit.value}` : '');
    const currentFilterParam = ref(props.filters !== '' ? `&f=${props.filters}` : '');

    const checked = ref(props.$store.state.checked);

    const getData = () => {      
      loading.value = true;

      axios.get(
        `${props.dataUrl}${currentPageParam.value}${currentQueryString.value}${currentRangeParam.value}${currentOrderParam.value}${currentLimitParam.value}${currentFilterParam.value}`
      )
        .then((response) => {
          data.value = response.data.data;
          loading.value = false;

          const visible = data.value.data.map((item) => item[Object.keys(item)[0]]);
          // props.$store.commit('replaceVisible', visible);
        })
        .catch((error) => {
          console.log(error);
          reportError(error);
        });
    };

    // Watchers
    watch([() => queryString.value, () => range.value, () => limit.value, () => props.generalQuery, () => props.filters, () => props.$route.query],
      () => {
        data.value.current_page = 1;
        getData();
      },
      { deep: true, immediate: true }
    );

    onMounted(() => {
      props.$root.$on('table.check.all', checkAll);
      props.$root.$on('table.refresh', getData);
      props.$root.$on('table.uncheck.all', uncheckAll);
    });

    onBeforeUnmount(() => {
      props.$root.$off('table.check.all');
      props.$root.$off('table.uncheck.all');
      props.$root.$off('table.refresh');
    });

    const changePage = (page) => {
      if (page === data.value.current_page) return;
      data.value.current_page = page;
      getData();
    };

    const setOrder = (key) => {
      orderDirection.value = orderDirection.value === '' ? 'DESC' : (orderDirection.value === 'DESC' ? 'ASC' : '');
      orderBy.value = (orderDirection.value === '' ? '' : key);
      getData();
    };

    const redirect = (id) => {
      if (props.redirectName && props.redirectId) {
        props.$router.push({ name: props.redirectName, params: { id } });
      }
    };

    const check = (item) => {
      if (item.disabled !== 1) {
        props.$store.commit('toggleChecked', item[Object.keys(item)[0]]);
      }
    };

    const checkAll = () => {
      data.value.data.forEach((i) => {
        if (i.disabled !== 1) {
          props.$store.commit('addChecked', i[Object.keys(i)[0]]);
        }
      });
    };

    const uncheckAll = () => {
      data.value.data.forEach((i) => {
        props.$store.commit('removeChecked', i[Object.keys(i)[0]]);
      });
    };

    const translate = (value) => {
      if (typeof props.columnMap === 'undefined') {
        return value;
      } else {
        if (typeof props.columnMap[value] !== 'undefined') {
          return props.columnMap[value];
        }
      }

      return value;
    };

    const deleteItem = (id) => {
      props.$swal({
        title: 'Are you sure you want to delete this item?',
        type: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      }).then((result) => {
        if (result.value) {
          axios.delete(`${props.deleteUrl}/${id}`)
            .then((response) => {
              props.$emit('tableupdate');
              postSuccess('Item successfully deleted!');
              getData();
            })
            .catch((error) => {
              console.log(error);
              postError(error);
            });
        }
      });
    };

    return {
      data,
      loading,
      pageSelection,
      range,
      rangeOptions,
      queryString,
      selectedFilters,
      orderBy,
      filter,
      orderDirection,
      limit,
      currentPageParam,
      currentRangeParam,
      currentQueryString,
      currentOrderParam,
      currentLimitParam,
      currentFilterParam,
      checked,
      getData,
      changePage,
      setOrder,
      redirect,
      check,
      checkAll,
      uncheckAll,
      translate,
      deleteItem
    };
  },
};
</script>
