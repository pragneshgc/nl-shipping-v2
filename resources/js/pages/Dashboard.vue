<template>
    <div>
        <div class="content">
            <section>
                <div class="prescriptionStats flex-center">
                    <div class="title flex-align-center">Today's Prescription Statistics</div>
                    <div class="list">
                        <ul v-if="loaded">
                            <li>
                                <span>Processing</span>{{ statistics.processing }}
                            </li>
                            <li>
                                <span>Ready to ship</span>{{ statistics.ready }}
                            </li>
                            <li class="active">
                                <span>Waiting for import</span>{{ statistics.import }}
                            </li>
                            <li v-if="app.delivery_companies.includes('dpd')">
                                <span>DPD</span>{{ statistics.dpd }}
                            </li>
                            <li v-if="app.delivery_companies.includes('ups')">
                                <span>UPS</span>{{ statistics.ups }}
                            </li>
                            <li v-if="app.delivery_companies.includes('dhl')">
                                <span>DHL</span>{{ statistics.dhl }}
                            </li>
                            <li v-if="app.delivery_companies.includes('rml')">
                                <span>RML</span>{{ statistics.rml }}
                            </li>
                            <li>
                                <span>Shipped</span>{{ statistics.shipped }}
                            </li>
                        </ul>
                        <ul style="overflow: hidden;" v-else>
                            <li>
                                <div class="loader loader-relative" style="">Loading...</div>
                            </li>
                        </ul>
                    </div>
                    <div v-if="loaded" class="total flex-align-center"><span>Total</span>{{ statistics.total }}</div>
                </div>
            </section>
            <!-- End Prescription Stats-->

            <section>
                <div class="orderSearch flexContent">
                    <h3>Search order</h3>
                    <form @submit.prevent="search" autocomplete="on">
                        <div class="formItemsGroup floatLeft flex mt-20">
                            <input required v-model="orderID" id="orderID" class="tBox tBoxSize02" type="text"
                                placeholder="Order No" />
                            <button class="btn btnSize02 tertiaryBtn" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section v-if="orderDetails">
                <div class="orderDetails">
                    {{ orderDetails }}
                </div>
            </section>
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import router from '../router';
import { postError } from '../mixins/errors';

const statistics = reactive({ processing: 0, ready: 0, import: 0, dpd: 0, ups: 0, dhl: 0, rml: 0, shipped: 0, total: 0 });
const loaded = ref(false);
const orderID = ref(null);
const orderDetails = ref(false);
const app = appInfo;

onMounted(() => {
    getStatistics();
});

const search = () => {
    router.push({ name: 'order', params: { id: orderID.value } })
}

const getStatistics = () => {
    axios.get('/statistics')
        .then((response) => {
            statistics.processing = response.data.data.statistics.processing;
            statistics.ready = response.data.data.statistics.ready;
            statistics.import = response.data.data.statistics.import;
            statistics.shipped = response.data.data.shipped;
            statistics.dpd = response.data.data.statistics.dpd;
            statistics.ups = response.data.data.statistics.ups;
            statistics.dhl = response.data.data.statistics.dhl;
            statistics.rml = response.data.data.statistics.rml;
            statistics.total = response.data.data.total;
            loaded.value = true;
        })
        .catch((error) => {
            postError(error.response.data.message);
        })
}
</script>
