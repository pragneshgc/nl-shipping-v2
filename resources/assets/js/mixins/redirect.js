import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const redirectToPrescription = (prescriptionID) => {
      let Ckey = ref(0);

      axios.get('/esa_login_status')
        .then((response) => {
          Ckey.value = response.data.data;

          if (Ckey.value !== 0) {
            document.cookie = `TARCH=${Ckey.value}; domain=esasys.co.uk; max-age=31536000;`;
          }

          window.open(`https://www.esasys.co.uk/?showPrescription&PRESCRIPTIONID=${prescriptionID}`, '_blank');
        })
        .catch((error) => {
          Ckey.value = 0;
        });
    };

    return {
      redirectToPrescription
    };
  }
};
