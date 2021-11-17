<template>
  <h1>{{company}}</h1>
</template>

<script>
import CompanyService from '../services/CompanyService';
export default {
  name: 'Edit',
  data() {
    return {
      company: null,
      companyFailedToLoad: false,
    };
  },
  created() {
    const companyIdParam = this.$route.params.companyId;
    const companyId = parseInt(companyIdParam);
    if (!isNaN(companyId)) {
      CompanyService.getById(companyId).then((data) => {
        this.company = data;
      }).catch(() => {
        this.companyFailedToLoad = true;
      });
    } else {
      this.companyFailedToLoad = true;
    }
  }
};
</script>
