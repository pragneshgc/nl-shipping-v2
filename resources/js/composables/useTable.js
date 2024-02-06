import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { reportError } from '../mixins/errors';
import _, { isEmpty } from "lodash";

export function useTable(props) {
  const route = useRoute();

  const data = ref({
    current_page: route.query.p || 1,
    to: 1,
    data: {}
  });
  const filter = ref({});
  const limit = ref(200);
  const loading = ref(false);
  const orderBy = ref('');
  const orderDirection = ref('');
  const pageSelection = ref(1);
  const queryString = route.query.q || '';
  const range = ref({ label: 'Last month', value: '30' });
  const rangeOptions = ref([
    { label: 'Last week', value: '7' },
    { label: 'Last 2 weeks', value: '14' },
    { label: 'Last month', value: '30' },
    { label: 'Last 2 months', value: '60' },
    { label: 'Last 6 months', value: '180' },
  ]);
  const selectedFilters = ref({});

  const getData = () => {
    loading.value = true;
    axios.get(props.dataUrl + currentPageParam.value +
      currentQueryString.value + currentRangeParam.value +
      currentOrderParam.value + currentLimitParam.value +
      currentFilterParam.value)
      .then((response) => {
        data.value = response.data.data;
        console.log('columns', setColumns());
        loading.value = false;
      })
      .catch((error) => {
        reportError(error);
      })
  }

  const setColumns = () => {
    let arr = [];
    let heads = Object.keys(props.heads);
    Object.values(data.value.data).forEach((value, index) => {
      arr.push(_.pick(value, heads))
    });
    data.value.data = arr;
  }

  const tableHeads = computed(() => {
    return Object.values(props.heads);
  })

  const currentPageParam = computed(() => {
    return '?page=' + data.value.current_page;
  });
  const currentRangeParam = computed(() => {
    return !isEmpty(props.hasRange) ? '&range=' + range.value : '';
  });
  const currentQueryString = computed(() => {
    console.log('querystring', queryString.value);
    return !isEmpty(queryString.value) ? '&q=' + queryString.value : '';
  });
  const currentOrderParam = computed(() => {
    return !isEmpty(orderBy.value) ? '&orderBy=' + orderBy.value + '&orderDirection=' + orderDirection.value : '';
  });
  const currentLimitParam = computed(() => {
    return !isEmpty(limit.value) ? '&limit=' + limit.value : '';
  });
  const currentFilterParam = computed(() => {
    let param = JSON.stringify(selectedFilters.value);
    return !isEmpty(selectedFilters.value) ? '&f=' + param : '';
  });

  watch(queryString, () => _.debounce(function () {
    data.value.current_page = 1;
    getData();
  }, 500));
  watch(range, () => {
    console.log('range watch', range, range.value);
    getData();
  }, { immediate: true });
  watch(limit, () => getData());

  /* const checked = () => {
    return this.$store.state.checked;
  } */

  return {
    data,
    filter,
    getData,
    limit,
    loading,
    orderBy,
    orderDirection,
    pageSelection,
    queryString,
    range,
    rangeOptions,
    selectedFilters,
    currentPageParam,
    currentRangeParam,
    currentQueryString,
    currentOrderParam,
    currentLimitParam,
    currentFilterParam,
    tableHeads
  }
}
