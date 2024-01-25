<template>
    <div>
        <div class="backdrop" @click="close()">
        </div>

        <div class="modal">
            <div v-if="!loading" class="modal-header">
                <transition name="fade">
                    <section class="flexContent">
                        <div class="orderDetails">
                            <img :src="iconPaper" />
                            <ul>
                                <li><span>Order #: </span>{{ orderID }}</li>
                                <li><span>Name: </span>{{ details.order.Name }}</li>
                                <li><span>Surname: </span>{{ details.order.Surname }}</li>
                                <li><span>Status: </span>{{ orderStatus }}</li>
                                <li v-if="details.order.TrackingCode != '' && details.order.TrackingCode != null">
                                    <span>Tracking Code: </span>{{ details.order.TrackingCode }}
                                </li>
                                <li
                                    v-if="details.order.Repeats != '0' && details.order.Repeats != '' && [143, 162, 205, 243].includes(details.order.DCountryCode)">
                                    <span>Commercial value: </span>{{ details.order.Repeats }}
                                </li>
                            </ul>
                        </div>
                    </section>
                </transition>

                <transition name="fade">
                    <section v-if="products.length != 0" class="flexContent">
                        <div class="productListItem mb-10" v-for="p in products">
                            <div class="title">
                                <h3>{{ p.Name }}, {{ p.Dosage }} x {{ p.Quantity }} {{ p.Unit }}</h3>
                            </div>
                        </div>
                    </section>
                </transition>
            </div>

            <transition name="fade">
                <form
                    v-if="countries.length != 0 && companies.length != 0 && !loading && Object.keys(confirmationChanges).length == 0 && Object.keys(confirmationChangesUPS).length == 0"
                    @submit.prevent="save" class="pxp-form mb-20">
                    <div class="form-column">
                        <h3>Home Details</h3>
                        <template v-for="(key, value) in details.order" :key="value">
                            <div v-if="columnHome.includes(value)" class="form-group form-group-2">
                                <label :for="key">{{ alias[value] }}</label>
                                <input v-if="!['CountryCode', 'DCountryCode', 'DeliveryID', 'Notes'].includes(value)"
                                    class="" :name="key" :placeholder="''" v-model="details.order[value]">
                                <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)"
                                    v-model="details.order[value]">
                                    <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}
                                    </option>
                                </select>
                                <select v-else-if="['DeliveryID'].includes(value)" v-model="details.order[value]">
                                    <option v-for="company in companies" :value="company.SettingID">{{ company.Name }}
                                    </option>
                                </select>
                            </div>
                        </template>
                    </div>

                    <div class="form-column">
                        <h3>Delivery Details</h3>
                        <template v-for="(key, value) in details.order" :key="value">
                            <div v-if="columnDelivery.includes(value)" class="form-group form-group-2">
                                <label :for="key">{{ alias[value] }}</label>
                                <input v-if="!['CountryCode', 'DCountryCode', 'DeliveryID', 'Notes'].includes(value)"
                                    class="" :name="key" :placeholder="''" v-model="details.order[value]">
                                <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)"
                                    v-model="details.order[value]">
                                    <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}
                                    </option>
                                </select>
                                <select v-else-if="['DeliveryID'].includes(value)" v-model="details.order[value]">
                                    <option v-for="company in companies" :value="company.SettingID">{{ company.Name }}
                                    </option>
                                </select>
                            </div>
                        </template>

                        <div class="form-group form-group-2">
                            <label for="Notes">{{ alias['Notes'] }}</label>
                            <textarea style="min-width: 300px; min-height: 60px; line-height: 1;"
                                placeholder="Add notes here if you want them to show for dispensers and customer support"
                                v-model="details.order.Notes" class="form-control tBoxSize02"></textarea>
                        </div>
                    </div>

                    <div class="form-column">
                        <h3 v-if="details.ups != null">UPS Access Point</h3>
                        <div class="form-group" v-for="(key, value) in details.ups" :key="value">
                            <label :for="key">{{ alias[value] }}</label>
                            <input v-if="!['CountryCode', 'DCountryCode'].includes(value)" class="" :name="key"
                                :placeholder="''" v-model="details.ups[value]">
                            <select v-else-if="['DCountryCode', 'CountryCode'].includes(value)"
                                v-model="details.ups[value]">
                                <option v-for="country in countries" :value="country.CountryID">{{ country.Name }}</option>
                            </select>
                        </div>
                    </div>
                </form>
            </transition>

            <transition name="fade">
                <div v-if="(Object.keys(confirmationChanges).length > 0 || Object.keys(confirmationChangesUPS).length > 0) && !loading"
                    class="pxp-form mb-20">
                    <div class="infoBox warning">
                        <p>Please review and confirm all the changes in the order before saving!</p>
                    </div>

                    <DiffTableAddress :old-object="confirmationOld" :new-object="confirmationChanges"
                        :old-object-u-p-s="confirmationOldUPS" :new-object-u-p-s="confirmationChangesUPS"
                        :countries-prop="countries" :companies-prop="companies" />
                </div>
            </transition>

            <transition name="fade">
                <div v-if="!loading" class="modal-footer">
                    <button v-if="!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS)"
                        @click="save()" class="btn btnSize01 tertiaryBtn bigButton big-square-button">
                        <span v-if="!saveConfirmation">
                            Review
                        </span>
                        <span v-else>
                            Save
                        </span>
                    </button>

                    <button
                        v-if="(!isEqual(details.order, details.oldOrder) || !isEqual(details.ups, details.oldUPS)) && saveConfirmation"
                        @click="back()" class="btn btnSize01 tertiaryBtn bigButton big-square-button">
                        <span>
                            Back
                        </span>
                    </button>

                    <button @click="close()" class="btn btnSize01 secondaryBtn bigButton">Cancel</button>
                </div>
            </transition>
            <div v-if="loading" class="loader" style="">Loading...</div>
            <span class="close" @click="close()">X</span>

        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { iconPaper } from '../mixins/images';
import _ from 'lodash';
import alias from '../constants/prescriptionColumns';
import { postError, postSuccess } from '../mixins/errors';
import DiffTableAddress from './DiffTableAddress.vue';

const props = defineProps(['orderID', 'orderStatus', 'products']);
const emit = defineEmits(['closeorder', 'orderupdate'])

const columnDelivery = ['Repeats', 'DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode', 'DeliveryID', 'TrackingCode'];
const columnHome = ['Name', 'Surname', 'Address1', 'Address2', 'Address3', 'Address4', 'Postcode', 'CountryCode', 'Telephone', 'Email', 'TokenID', 'APNotificationLanguage', 'APNotificationValue'];
const companies = ref([]);
const confirmationChanges = ref({});
const confirmationChangesUPS = ref({});
const confirmationOld = ref({});
const confirmationOldUPS = ref({});
const countries = ref([]);

const details = ref({
    order: {},
    oldOrder: {},
    ups: {},
    oldUps: {},
});
const loading = ref(true);
const saveConfirmation = ref(false);

onMounted(() => {
    getCountries();
    getCompanies();
    getOrderDetails();
});

const close = () => {
    saveConfirmation.value = false;
    confirmationChanges.value = {};
    confirmationOld.value = {};
    confirmationOldUPS.value = {};
    details.value = { order: {}, oldOrder: {}, ups: {}, oldUps: {} };//clean up after
    emit('closeorder');
}
const getCompanies = () => {
    axios.get('/delivery-companies')
        .then((response) => {
            companies.value = response.data.data;
        })
        .catch((error) => {
            console.warn(error.response.data.message);
        })
}
const getCountries = () => {
    axios.get('/countries')
        .then((response) => {
            countries.value = response.data.data;
        })
        .catch((error) => {
            console.warn(error.response.data.message);
        })
}
const getOrderDetails = () => {
    axios.get('/order-edit/' + props.orderID)
        .then((response) => {
            details.value = response.data.data;
            loading.value = false;
        })
        .catch((error) => {
            console.warn(error.response.data.message);
            loading.value = false;
        })
}
const isEqual = _.isEqual;
const save = () => {
    if (saveConfirmation.value) {
        submit();
    } else {
        axios.post(`/order-edit/check/${props.orderID}`, { order: details.value.order, ups: details.value.ups })
            .then((response) => {
                if (Object.keys(response.data.data.changes).length > 0 || Object.keys(response.data.data.changesUPS).length) {
                    confirmationChanges.value = response.data.data.changes;
                    confirmationChangesUPS.value = response.data.data.changesUPS;
                    confirmationOld.value = response.data.data.old;
                    confirmationOldUPS.value = response.data.data.oldUPS;
                    saveConfirmation.value = true;
                } else {
                    saveConfirmation.value = false;
                    emit('closeorder');
                }
            })
            .catch((error) => {
                saveConfirmation.value = false;
                postError(error);
            })
    }
}
const submit = () => {
    axios.post('/order-edit/' + props.orderID, { order: details.value.order, ups: details.value.ups })
        .then((response) => {
            postSuccess('Saved');
            close();
            saveConfirmation.value = false;
            emit('orderupdate');
        })
        .catch((error) => {
            postError(error);
            close();
            saveConfirmation.value = false;
            emit('orderupdate');
        })
}
const back = () => {
    saveConfirmation.value = false;
    confirmationChanges.value = {};

    confirmationChangesUPS.value = {};
}

</script>
