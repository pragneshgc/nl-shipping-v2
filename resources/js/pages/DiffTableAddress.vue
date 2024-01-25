<template>
    <table class="table table-hover table-diff mt-20">
        <thead>
            <tr>
                <th>
                    Field
                </th>
                <th>
                    Current Value
                </th>
                <th>
                    New Value
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(change, key) in newObject" :key="key">
                <td
                    :class="[oldObject[key] == newObject[key] || (oldObject[key] == null && newObject[key] == '') ? '' : 'row-danger']">
                    {{ alias[key] }}
                </td>
                <td
                    :class="[oldObject[key] == newObject[key] || (oldObject[key] == null && newObject[key] == '') ? '' : 'row-danger']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(oldObject[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(oldObject[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(oldObject[key]) }}</span>
                    <span v-else>{{ oldObject[key] }}</span>
                </td>
                <td
                    :class="[oldObject[key] == newObject[key] || (oldObject[key] == null && newObject[key] == '') ? '' : 'row-danger']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(newObject[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(newObject[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(newObject[key]) }}</span>
                    <span v-else>{{ newObject[key] }}</span>
                </td>
            </tr>

            <tr v-if="newObjectUPS && newObjectUPS.length != 0">
                <td colspan="3">
                    <h3>UPS Access Point Details</h3>
                </td>
            </tr>

            <tr v-for="(change, key) in newObjectUPS" :key="key">
                <td
                    :class="[oldObjectUPS[key] != newObjectUPS[key] || !(oldObjectUPS[key] == null && newObjectUPS[key] == '') ? 'row-danger' : '']">
                    AP {{ alias[key] }}
                </td>
                <td
                    :class="[oldObjectUPS[key] != newObjectUPS[key] || !(oldObjectUPS[key] == null && newObjectUPS[key] == '') ? 'row-danger' : '']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(oldObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(oldObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(oldObjectUPS[key]) }}</span>
                    <span v-else>{{ oldObjectUPS[key] }}</span>
                </td>
                <td
                    :class="[oldObjectUPS[key] != newObjectUPS[key] || !(oldObjectUPS[key] == null && newObjectUPS[key] == '') ? 'row-danger' : '']">
                    <span v-if="key == 'DeliveryID'">{{ getCompanyTitle(newObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'DCountryCode'">{{ getCountryTitle(newObjectUPS[key]) }}</span>
                    <span v-else-if="key == 'CountryCode'">{{ getCountryTitle(newObjectUPS[key]) }}</span>
                    <span v-else>{{ newObjectUPS[key] }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import alias from '../constants/prescriptionColumns';

const props = defineProps(['oldObject', 'oldObjectUPS', 'newObject', 'newObjectUPS', 'countriesProp', 'companiesProp', 'getDetails']);
const emit = defineEmits(['difftable.error']);

const countries = ref([]);
const companies = ref([]);
const loadingCountries = ref(true);
const loadingCompanies = ref(true);

onMounted(() => {
    if (props.getDetails) {
        getCountries();
        getCompanies();
    }
});

const countriesArray = computed(() => {
    return props.getDetails ? countries : props.countriesProp;
});
const companiesArray = computed(() => {
    return props.getDetails ? companies : props.companiesProp;
});

/**
 * Fetches country title by country id
 */
const getCountryTitle = (id, countries = []) => {
    let title = 'Unknown';
    if (countries.length <= 0) {
        countries = countriesArray.value;
    }
    countries.forEach((country) => {
        if (country.CountryID == id) {
            title = country.Name;
        }
    })

    return title;
}
const getCountries = () => {
    axios.get('/countries')
        .then((response) => {
            countries.value = response.data.data;
            loadingCountries.value = false;
        })
        .catch((error) => {
            console.warn(error.response.data.message);
            emit('difftable.error');
            loadingCountries.value = false;
        })
}
/**
 * Fetches company title by SettingID id
 */
const getCompanyTitle = (id, companies = false) => {
    let title = 'Unknown';

    if (!companies) {
        companies = companiesArray.value;
    }

    companies.forEach((company) => {
        if (company.SettingID == id) {
            title = company.Name;
        }
    })

    return title;
}
const getCompanies = () => {
    axios.get('/delivery-companies')
        .then((response) => {
            companies.value = response.data.data;
            loadingCompanies.value = false;
        })
        .catch((error) => {
            console.warn(error.response.data.message);
            emit('difftable.error');
            loadingCompanies.value = false;
        })
}

</script>
