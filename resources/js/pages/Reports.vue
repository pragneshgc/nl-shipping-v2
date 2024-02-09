<template>
    <div class="content">
        <section class="card">
            <div class="card-header">
                <h3>Reports</h3>
            </div>
            <div class="card-body">
                <div class="orderSearch">
                    <TableComponentSearch :data-url="'/orders/search'" column-class="col-lg-12"
                        table-title="Activity Reports" redirect-name="order" redirect-id="PrescriptionID" :filters="filters"
                        :heads="{ 'PrescriptionID': 'Id', 'ReferenceNumber': 'Ref', 'Date': 'Date', 'address': 'Patient Name/Address', 'User': 'User' }"
                        :column-map="columnMap" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TableComponentSearch from '../components/TableComponentSearch.vue';

export default {
    components: {
        TableComponentSearch,
    },
    setup() {

        const columnMap = {
            PrescriptionID: 'ID',
            DeliveryID: 'Delivery Company',
            CompanyName: 'Client',
            ReferenceNumber: 'Ref',
            Date2: 'Date',
            Min: 'Time',
        };

        const filters = ref([
            { title: 'Start Date', value: 'start_date', type: 'date' },
            { title: 'End Date', value: 'end_date', type: 'date' },
            { title: 'Reference Number', value: 'reference', type: 'text' },
            { title: 'Order ID', value: 'order_id', type: 'text' },
        ]);

        const orderStatusesSelect = ref([]);

        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/doctors');
                filters.value.find((o) => {
                    if (o.value === 'doctor') {
                        o.options = response.data.data.map((doctor) => ({
                            title: `${doctor.Title} ${doctor.Name} ${doctor.Surname}`,
                            value: doctor.DoctorID,
                        }));
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await axios.get('/countries');
                filters.value.find((o) => {
                    if (o.value === 'country') {
                        o.options = response.data.data.map((country) => ({
                            title: country.Name,
                            value: country.CountryID,
                        }));
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                filters.value.find((o) => {
                    if (o.value === 'product') {
                        o.options = response.data.data.map((product) => ({
                            title: product.Name,
                            value: product.Code,
                        }));
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        const fetchDeliveryCompanies = async () => {
            try {
                const response = await axios.get('/delivery-companies');
                filters.value.find((o) => {
                    if (o.value === 'delivery') {
                        o.options = response.data.data.map((company) => ({
                            title: company.Name,
                            value: company.SettingID,
                        }));
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        const fetchClients = async () => {
            try {
                const response = await axios.get('/clients');
                filters.value.find((o) => {
                    if (o.value === 'client') {
                        o.options = response.data.data.map((client) => ({
                            title: client.CompanyName,
                            value: client.ClientID,
                        }));
                    }
                });
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(() => {
            filters.value.forEach((o) => {
                switch (o.value) {
                    case 'status':
                        o.options = orderStatusesSelect.value;
                        break;
                    case 'doctor':
                        fetchDoctors();
                        break;
                    case 'country':
                        fetchCountries();
                        break;
                    case 'product':
                        fetchProducts();
                        break;
                    case 'delivery':
                        fetchDeliveryCompanies();
                        break;
                    case 'client':
                        fetchClients();
                        break;
                    default:
                        break;
                }
            });
        });

        return {
            columnMap,
            filters,
        };
    },
};
</script>
