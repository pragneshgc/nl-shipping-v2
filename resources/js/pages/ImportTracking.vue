<template>
    <div>
        <div class="content">
            <!-- Prescription Stats-->
            <section class="card card-border pb-20 text-center">
                <h3 class="mb-20">Import tracking codes</h3>

                <select v-model="option" class="browser-default custom-select big-select">
                    <option value="" disabled>Please select an option</option>
                    <option v-for="company in optionList" :value="company.SettingID">{{ company.Name }}</option>
                </select>

                <div v-show="option != ''" class="input-container mt-20">
                    <input type="file" name="tracking" id="file" ref="file" @change="attachFile($event)" />
                    <div class="input-mask" @click="inputClick">
                        <button class="browse-btn">
                            {{ buttonText }}
                        </button>
                        <span class="file-info">{{ inputText }}</span>
                    </div>
                </div>
            </section>
            <!-- End Prescription Stats-->

            <section class="text-center">
                <button :disabled="importing" v-if="fileName != '' && option != ''"
                    class="btn btnSize01 tertiaryBtn bigButton mr-10 big-round-button" @click="upload">
                    <div v-if="importing" class="loader" style="">Loading...</div>
                    <span v-else>Import</span>
                </button>
            </section>

            <section v-show="trackingStatuses.length != 0" class="card mt-10">
                <ul class="tracking-list">
                    <li v-for="(key, value) in trackingStatuses">
                        <a target="_blank" :href="'#/order/' + value">{{ value }}</a> - {{ key }}
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { postSuccess } from '../mixins/errors';
import axios from 'axios';

const file = ref('');
const fileName = ref('');
const importing = ref(false);
const option = ref('');
const optionList = ref([]);
const trackingStatuses = ref([]);

const inputText = computed(() => !_.isEmpty(fileName.value) ? fileName.value : 'Upload a file');
const buttonText = computed(() => !_.isEmpty(fileName.value) ? 'Importing tracking' : 'Upload');

onMounted(() => {
    axios.get('/delivery-companies')
        .then((response) => {
            optionList.value = response.data.data;
        });
});

const inputClick = () => {
    document.getElementById('file').click();
}

const attachFile = ($event) => {
    let target = $event.target;

    if (target && target.files) {
        file.value = target.files[0];
        fileName.value = target.files[0].name;
    }
};
const upload = () => {
    importing.value = true;
    let formData = new FormData();
    formData.append('file', file.value.files);
    formData.append('option', option.value);

    axios.post('/import-tracking', formData, { headers: { 'Content-type': 'multipart/form-data' } })
        .then((response) => {
            trackingStatuses.value = response.data.data;
            postSuccess('Import tracking uploaded');
            file.value = '';
            fileName.value = '';
            option.value = '';
            importing.value = false;
        })
        .catch((error) => {
            postSuccess('Import tracking could not be uploaded');
            file.value = '';
            fileName.value = '';
            option.value = '';
            importing.value = false;
        });
}
</script>
