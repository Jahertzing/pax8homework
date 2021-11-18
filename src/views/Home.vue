<template>
  <div class="card">
    <div class="card-content">
      <div class="company list-hover" v-for="company in companies" :key="company.id">
        <span class="company-id">{{ company.id }}</span>
        <router-link :to="{ name: 'company', params: { companyId: company.id }}" class="company-name-link" tabindex="0"> {{company.name}} </router-link>
        <router-link :to="{ name: 'edit', params: { companyId: company.id }}" class="company-edit-link button" role="button">
          Edit
        </router-link>
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

<style lang="scss" scoped>
  .list-hover:hover {
    background-color: #EFEFEF;
  }
  .company {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 10px;

    &-id, &-name-link, &-edit-link {
      font-size: 1.25rem;
    }

    &-name-link {
      margin-left: 8px;
    }

    &-edit-link {
      margin-left: auto;
    }
  }
</style>
