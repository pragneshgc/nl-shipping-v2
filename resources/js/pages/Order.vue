<template>
    <div>
        <div class="content">
            <section>
                <div class="orderSearch flexContent">
                    <h3>Search order</h3>
                    <form @submit.prevent="search" autocomplete="on">
                        <div class="formItemsGroup floatLeft flex mt-20">
                            <input required v-model="orderID" class="tBox tBoxSize02" type="text" id="orderID"
                                placeholder="Order No" />
                            <button class="btn btnSize02 tertiaryBtn" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <transition name="fade">
                <section class="flexContent" v-if="!loading && orderDetails != null">
                    <h2>Order Details</h2>
                    <div class="orderDetails">
                        <img :src="iconPaper" />
                        <ul>
                            <li><span>Order #: </span>{{ orderDetails.PrescriptionID }}</li>
                            <li><span>Name: </span>{{ orderDetails.Name }}</li>
                            <li><span>Surname: </span>{{ orderDetails.Surname }}</li>
                            <li><span>Status: </span>{{ orderStatuses[orderDetails.Status] }}</li>
                            <li v-if="orderDetails.TrackingCode != '' && orderDetails.TrackingCode != null"><span>Tracking
                                    Code: </span>{{ orderDetails.TrackingCode }}</li>
                            <li
                                v-if="orderDetails.Repeats != '0' && orderDetails.Repeats != '' && [143, 162, 205, 243].includes(orderDetails.DCountryCode)">
                                <span>Commercial value: </span>{{ orderDetails.Repeats }}
                            </li>
                            <li>
                                <button @click="editDetails(orderDetails)" class="btn btnSize02 tertiaryBtn" type="button">
                                    Edit Address
                                </button>
                                <transition name="fade">
                                    <a :href="`/order/${currentOrderID}/download-document`" target="_blank">
                                        <button v-if="hasDocumentation" title="Download Documentation"
                                            class="btn btnSize02 tertiaryBtn" type="button">
                                            <i class="fa fa-file"></i>
                                        </button>
                                    </a>
                                </transition>
                            </li>
                        </ul>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <section class="flexContent" v-if="!loading && orderDetails == null">
                    Loading
                </section>
            </transition>

            <transition name="fade">
                <section class="flexContent flex-direction-column" v-if="!loading && orderDetails != null">
                    <div style="float: none;background: #f7941d4f;width: 100%;padding: 5px;text-align: center;
                        font-weight: 700!important; border: 3px solid #d291007d;
                        margin-bottom: 20px; font-size: 20px; "
                        v-if="orderDetails.DeliveryID == 4 && orderDetails.SaturdayDelivery == 1">
                        DPD Saturday Delivery
                    </div>

                    <img style="height: 50px;" :src="deliveryLogo[orderDetails.DeliveryID]" />
                </section>
            </transition>

            <transition name="fade">
                <section class="flexContent flex-direction-row"
                    v-if="!loading && orderDetails != null && orderDetails.canPrintLabel && [7, 8].includes(orderDetails.Status)">
                    <div style="width: 100%; display:flex; justify-content:center; align-items:center;">
                        <div style="display:flex; justify-content:center; align-items:center;" v-if="orderDetails.DeliveryID == '7' || orderDetails.DeliveryID == '10'
                            || (orderDetails.DeliveryID == '5' && parseFloat(orderDetails.Repeats.split(/(\s+)/)[2]) <= 270)
                            || orderDetails.DeliveryID == '4'">
                            <button @click="request()" :disabled="requestedPrint || orderDetails.DeliveryID == '7'"
                                v-if="(orderDetails.TrackingCode == '' || orderDetails.TrackingCode == null) && !isManual && orderDetails.CanDecomission/* && (!isManual && !isCommercialPaper)*/"
                                class="btn btnSize01 tertiaryBtn bigButton mr-10 big-round-button" type="submit">
                                <div v-if="requestedPrint" class="loader" style="">Loading...</div>
                                <span v-else>Request Label</span>
                            </button>
                            <button @click="print(true)" :disabled="requestedPrint"
                                v-else-if="!isManual && orderDetails.CanDecomission/* && !isCommercialPaper*/"
                                class="btn btnSize01 tertiaryBtn bigButton big-round-button" type="submit">
                                Reprint Label
                            </button>
                            <button @click="manual()"
                                v-if="orderDetails.DeliveryID == '7' && (isManual || isCommercialPaper)" :disabled="true"
                                class="btn btnSize01 tertiaryBtn bigButton big-round-button" type="submit">
                                {{ manualPrintText }}
                            </button>
                            <button @click="manual()"
                                v-else-if="orderDetails.DeliveryID == '10' && (isManual || isCommercialPaper)"
                                class="btn btnSize01 tertiaryBtn bigButton big-round-button" type="submit">
                                {{ manualPrintText }}
                            </button>

                            <button @click="manual()"
                                v-else-if="orderDetails.DeliveryID == '7' && isCommercial && !isCommercialPaper"
                                :disabled="true" class="btn btnSize01 tertiaryBtn" type="submit">
                                {{ manualPrintText }}
                            </button>

                            <button @click="reset()" :disabled="requestedPrint"
                                v-if="!isManual && (orderDetails.TrackingCode != '' && orderDetails.TrackingCode != null) && (user.role >= 60 || app.label_reset_without_admin)"
                                class="btn btnSize01 tertiaryBtn bigButton" type="submit">
                                Reset Label
                            </button>

                        </div>
                        <div v-else>
                            <button @click="manual()" class="btn btnSize01 tertiaryBtn bigButton big-round-button"
                                type="submit">
                                {{ manualPrintText }}
                            </button>
                        </div>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <section v-if="!loading && orderDetails == null">
                    <div class="infoBox warning">
                        <p>Order with number {{ currentOrderID }} was not found!</p>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <section
                    v-if="!loading && orderDetails != null && (orderDetails.Repeats == '0' || orderDetails.Repeats == '') && [143, 162, 205, 243].includes(orderDetails.DCountryCode)">
                    <div class="infoBox warning">
                        <p>
                            THIS ORDER HAS NO COMMERCIAL VALUE. PLEASE SET VALUE BY CLICKING EDIT.
                        </p>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <section
                    v-if="!loading && orderDetails != null && (orderDetails.DeliveryID == '5' && parseFloat(orderDetails.Repeats.split(/(\s+)/)[2]) > 270)">
                    <div class="infoBox warning">
                        <p>
                            ORDER VALUE GREATER THAN 270 AND WILL REQUIRE CN23 FORM. USE ROYAL MAIL APP FOR SHIPPING.
                        </p>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <section v-if="!loading && orderDetails != null && !orderDetails.CanDecomission">
                    <div class="infoBox warning">
                        <p>
                            THIS ORDER IS NOT READY TO BE SHIPPED. PLEASE SPEAK TO A
                            DISPENSING TEAM MEMBER
                        </p>
                    </div>
                </section>

                <section v-else-if="!loading && ![7, 8].includes(orderDetails?.Status)">
                    <div class="infoBox warning">
                        <p>
                            THIS ORDER IS NOT READY TO BE SHIPPED. THE ORDER STATUS IS <b>{{
                                orderStatuses[orderDetails?.Status] }}</b>. PLEASE SPEAK TO A PHARMACY TEAM MEMBER
                        </p>
                    </div>
                </section>
            </transition>

            <transition name="fade">
                <section class="activity" v-if="activity.length > 0 && !loadingActivity && !loading">
                    <h5 class="activity-log-header">Activities on this order</h5>

                    <transition-group name="slide-down" tag="ul" class="activity-log-wrapper"
                        style="margin-top: 0px!important;">
                        <li class="activity-log-item" v-for="   a    in    activity   " :key="a.ActivityID">
                            <div class="activity-action">
                                {{ a.Action }}
                                <button style="background: red; border: 1px solid red;"
                                    v-if="a.Action == 'DHL request label - PDF issue' && a.Status == 1"
                                    class="btn btnSize02 tertiaryBtn" @click="resendPDF()">
                                    Resend PDF
                                </button>
                            </div>
                            <div class="activity-footer">
                                <span>{{ a.Name }}</span><span>{{ a.Date }}</span>
                            </div>
                        </li>
                    </transition-group>
                </section>

                <section class="activity" v-else-if="!loadingActivity && !loading">
                    <ul class="activity-log-wrapper">
                        <li class="activity-log-item">
                            No activity log found
                        </li>
                    </ul>
                </section>
            </transition>

            <transition name="fade">
                <EditOrderAddress @closeorder="editingOrder = !editingOrder"
                    :products="isCommercial ? orderDetails.Products : []" :orderID="currentOrderID"
                    :orderStatus="orderStatuses[orderDetails.Status]" v-if="editingOrder" @orderupdate="search()" />
            </transition>

        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { postError, postErrorToast, reportErrorToast, postErrorPopup } from '../mixins/errors';
import { download } from '../mixins/download';
import { printUrl, printFile, printPage } from '../mixins/print';

import router from '../router';
import orderStatuses from '../constants/orderStatuses';
import deliveryLogo from '../constants/deliveryLogo';
import { iconPaper } from '../mixins/images';
import EditOrderAddress from './EditOrderAddress.vue';

const route = useRoute();
const orderID = ref(route.params.id);

const activity = ref([]);
const app = appInfo;
const currentOrderID = ref('');
const editingOrder = ref(false);
const hasDocumentation = ref(false);
const label = ref('');
const loading = ref(false);
const loadingActivity = ref(false);
const orderDetails = ref(null);
const requestedPrint = ref(false);
const user = userInfo;

onMounted(() => {
    search();
});

const apiEndpoint = computed(() => {
    if (orderDetails.value != null) {
        if (orderDetails.value.DeliveryID == '10') {
            return '/shipment-validation/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '7') {
            return '/api/ups/shipment-validation/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '4') {
            return '/api/dpd/shipment-validation/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '5') {
            return `/api/rmail/shipment-validation/${orderDetails.value.PrescriptionID}`;
        } else {
            return false;
        }
    } else {
        return false;
    }
});
const autoprint = computed(() => {
    return orderDetails.value.DeliveryID == '10' ? false : true;
});
const isCommercial = computed(() => {
    return orderDetails.value.Repeats != '0'
        && orderDetails.value.Repeats != ''
        && [143, 162, 205, 243].includes(orderDetails.value.DCountryCode);
});
const isCommercialPaper = computed(() => {
    return orderDetails.value.Repeats != '0'
        && orderDetails.value.Repeats != ''
        && [143].includes(orderDetails.value.DCountryCode);
});
const isCOD = computed(() => {
    return orderDetails.value.PaymentMethod != '0';
});
const isManual = computed(() => {
    return orderDetails.value.PaymentMethod != '0';
});
const labelEndpoint = computed(() => {
    if (orderDetails.value != null) {
        if (orderDetails.value.DeliveryID == '10') {
            return '/api/dhl/label/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '7') {
            if (isCOD.value) {
                return '/api/ups/gif/' + orderDetails.value.PrescriptionID;
            } else {
                return '/api/ups/label/' + orderDetails.value.PrescriptionID;
            }
        } else if (orderDetails.value.DeliveryID == '4') {
            return '/api/dpd/label/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '5') {
            return '/api/rmail/label/' + orderDetails.value.PrescriptionID;
        } else {
            return false;
        }
    } else {
        return false;
    }
});

const authorize = (callback) => {
    if (app.label_reset_without_admin) {
        let reasons = {
            '1': 'System unresponsive',
            '2': 'Damaged label',
            '3': 'Label applied incorrectly',
        }

        Swal.fire({
            text: 'Why is this label being reprinted?',
            input: 'select',
            inputOptions: reasons,
            inputPlaceholder: 'Select a reason',
            confirmButtonText: 'Resend',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (value === '1' || value === '2' || value === '3') {
                        resolve();
                    } else {
                        resolve('Reason invalid');
                    }
                })
            }
        }).then((result) => {
            if (result.value) {
                callback();
                axios.post('/log-reprint', { orderID: currentOrderID.value, reason: reasons[result.value], code: 'Not Required' })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } else {
                focusInput();
            }
        })
    } else {
        Swal.fire({
            text: 'Scan authorization code',
            input: 'text',
            inputValue: '',
            inputClass: 'key',
            inputAttributes: {
                'autocomplete': 'off',
                'type': 'hidden',
            },
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if (resolve != '') {
                        axios.post('/resend-authorization', { code: value })
                            .then((respond) => {
                                resolve();
                            })
                            .catch((error) => {
                                resolve('The authorization code is incorrect');
                            })
                    } else {
                        resolve('The authorization code can not be empty');
                    }

                })
            }
        }).then((result) => {
            if (typeof result.value != 'undefined' && result.value != '') {
                let reasons = {
                    '1': 'System unresponsive',
                    '2': 'Damaged label',
                    '3': 'Label applied incorrectly',
                }

                let code = result.value;

                Swal.fire({
                    text: 'Why is this label being reprinted?',
                    input: 'select',
                    inputOptions: reasons,
                    inputPlaceholder: 'Select a reason',
                    confirmButtonText: 'Resend',
                    showCancelButton: true,
                    inputValidator: (value) => {
                        return new Promise((resolve) => {
                            if (value === '1' || value === '2' || value === '3') {
                                resolve();
                            } else {
                                resolve('Reason invalid');
                            }
                        })
                    }
                }).then((result) => {
                    if (result.value) {
                        callback();
                        axios.post('/log-reprint', { orderID: currentOrderID.value, reason: reasons[result.value], code: code })
                            .then((response) => {
                                console.log(response);
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    } else {
                        focusInput();
                    }
                })
            } else {
                focusInput();
            }
        })
    }
}

const manual = () => {
    commercialInvoiceNotification(() => {
        if (manualEndpoint) {
            requestedPrint.value = true;
            axios.get(manualEndpoint)
                .then((response) => {
                    if (orderDetails.value.Printed) {
                        authorize(() => {
                            let type = orderDetails.value.DeliveryID == '7' ? 'xml' : 'csv';
                            download(response.data, type);
                            orderDetails.value.Printed = true;
                            requestedPrint.value = false;
                            focusInput();
                        });
                    } else {
                        let type = orderDetails.value.DeliveryID == '7' ? 'xml' : 'csv';
                        download(response.data, type);
                        orderDetails.value.Printed = true;
                        requestedPrint.value = false;
                    }

                    getActivity();
                })
                .catch((error) => {
                    postError(error.response.data.message);
                    requestedPrint.value = false;
                    focusInput();
                    getActivity();
                })
        }
    });
}
const manualEndpoint = computed(() => {
    if (orderDetails.value != null) {
        if (orderDetails.value.DeliveryID == '10') {
            return '/api/dhl/manual/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '7') {
            return '/api/ups/manual/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '3') {
            return '/api/tnt/manual/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '4') {
            return '/api/dpd/manual/' + orderDetails.value.PrescriptionID;
        } else if (orderDetails.value.DeliveryID == '5') {
            return '/api/rmail/manual/' + orderDetails.value.PrescriptionID;
        } else {
            return false;
        }
    } else {
        return false;
    }
});
const manualPrintText = computed(() => {
    return orderDetails.value.Printed ? 'Manual Re-print' : 'Manual Print';
});

const checkDocument = () => {
    axios.get(`/order/${currentOrderID.value}/check-document`)
        .then((response) => {
            hasDocumentation.value = response.data.data;
        })
        .catch((error) => {
            postErrorToast(error.response.data.message);
        })
}
const commercialInvoiceNotification = (callback) => {
    callback();
}
const downloadDocument = () => {
    axios.get(`/order/${currentOrderID.value}/download-document`)
        .then((response) => {
            download(response.data, 'pdf');
        })
        .catch((error) => {
            postErrorToast(error.response.data.message);
        })
}
const editDetails = (orderDetails) => {
    editingOrder.value = !editingOrder.value;
}
const focusInput = () => {
    setTimeout(() => {
        document.getElementById("orderID").focus();
    }, 300);
}
const getActivity = () => {
    loadingActivity.value = true;

    axios.get('/order/' + currentOrderID.value + '/activity')
        .then((response) => {
            activity.value = response.data.data;
            loadingActivity.value = false;
        })
        .catch((error) => {
            postError(error.response.data.message);
            loadingActivity.value = false;
        })
}
const print = (reprint = false) => {
    authorize(() => {
        requestedPrint.value = true;

        if (isCOD.value) {
            printFile(`${window.location.origin}/api/ups/gif/${currentOrderID.value}?token=${user.token}`, () => {
                // printHtml(`${window.location.origin}/token/ups/cod/${currentOrderID}?token=${user.token}`);
            });
        } else {
            printPage(labelEndpoint.value, autoprint.value);
        }

        if (isCommercialPaper.value) {
            printUrl(`${window.location.origin}/token/ups/invoice/${currentOrderID.value}?token=${user.token}`);
        }

        search(currentOrderID.value);
        requestedPrint.value = false;
        focusInput();
    });
}
const resendPDF = () => {
    axios.post(`/api/dhl/${currentOrderID.value}/resend-pdf`)
        .then((response) => {
            search();
            getActivity();
        })
        .catch((error) => {
            postError(error.response.data.message);
        })
}
const request = () => {
    commercialInvoiceNotification(() => {
        requestedPrint.value = true;

        if (apiEndpoint.value) {
            axios.get(apiEndpoint.value)
                .then((response) => {
                    //fetch backend parameters here
                    if (response.data.data.paper_invoice) {
                        printUrl(`${window.location.origin}/token/ups/invoice/${currentOrderID.value}?token=${user.token}`);
                    }

                    if (response.data.data.gif) {
                        printFile(`${window.location.origin}/api/ups/gif/${currentOrderID.value}?token=${user.token}`, () => {
                            // printHtml(`${window.location.origin}/token/ups/cod/${currentOrderID}?token=${userInfo.token}`);
                        });
                    } else if (response.data.data.rml_api) {
                        printUrl(`${window.location.origin}/token/rml/label/${currentOrderID.value}?token=${user.token}`);
                    } else {
                        printPage(labelEndpoint.value, true);
                    }

                    if (response.data.data.resend) {
                        reportErrorToast('Prescription PDF not sent to DHL! Trying to resend.');
                        resendPDF();
                    }

                    orderID.value = currentOrderID.value;
                    search();
                    requestedPrint.value = false;
                    focusInput();
                    getActivity();
                })
                .catch((error) => {
                    postErrorPopup(error.response.data.message);
                    search();
                    requestedPrint.value = false;
                    focusInput();
                    getActivity();
                })
        }
    });
}
const reset = () => {
    axios.get('/reset-order/' + currentOrderID.value)
        .then((response) => {
            search(currentOrderID.value);
            getActivity();
        })
        .catch((error) => {
            console.warn(error);
            getActivity();
        })
}
const search = () => {
    if (orderID.value != '') {
        currentOrderID.value = orderID.value;
        orderID.value = '';
    }

    getActivity();
    loading.value = true;

    axios.get('/order/' + currentOrderID.value)
        .then((response) => {
            orderDetails.value = response.data.data;
            checkDocument();
            loading.value = false;
        })
        .catch((error) => {
            orderDetails.value = null;
            postErrorToast(error.response.data.message);
            loading.value = false;
        });

    if (route.params.id != currentOrderID.value) {
        router.push({ params: { id: currentOrderID.value } });
    }
}

watch(() => route.params.id, () => {
    if (typeof route.params.id != 'undefined' && currentOrderID.value != route.params.id) {
        orderID.value = route.params.id;
        search();
    }
})
</script>
