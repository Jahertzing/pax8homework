<template>
  <div class="container">
    <div class="card" v-for="company in companies" :key="company.id">
      <div class="card-content">
        <div class="content">
          <router-link :to="{ name: 'company', params: { companyId: company.id }}"> {{company.name}} </router-link>
          <router-link :to="{ name: 'edit', params: { companyId: company.id }}"> edit </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyService from '../services/CompanyService';
export default {
  name: 'Home',
  data() {
    return {
      companies: [],
      companiesFailedToLoad: false,
    };
  },
  created() {
    CompanyService.getAll().then((data) => {
      this.companies = data;
    }).catch(() => {
      this.companiesFailedToLoad = true;
    });
  }
};
</script>
