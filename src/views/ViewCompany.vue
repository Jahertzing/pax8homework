<template>
  <div class="view-company" v-if="company">
    <div class="card">
      <div class="card-content">
        <div class="content view-page">
          <div class="view-page-title">
            <h1 class="title">{{ company.name }}</h1>
          </div>
          <div class="view-page-row">
            <div class="field">
              <span class="subtitle">Company domain</span>
              <div class="company-field-value">
                {{company.domain}}
              </div>
            </div>
          </div>
          <div class="view-page-row">
            <div class="field">
              <span class="subtitle">Number of employees</span>
              <div class="company-field-value">
                {{ company.numberOfEmployees.toLocaleString("en-US") }}
              </div>
            </div>
          </div>
          <div class="view-page-row">
            <div class="field">
              <span class="subtitle">Subscriptions per employee</span>
              <div class="company-field-value">
                {{ company.subscriptionsPerEmployee.toLocaleString("en-US") }}
              </div>
            </div>
          </div>
          <div class="view-page-row">
            <div class="field">
              <span class="subtitle">Total subscriptions</span>
              <div class="company-field-value">
                {{ (company.numberOfEmployees * company.subscriptionsPerEmployee).toLocaleString("en-US") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyService from '../services/CompanyService';
export default {
  name: 'ViewCompany',
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

<style lang="scss" scoped>
  .view-company {
    max-width: 800px;
    margin: 0 auto;
  }
  .view-page {
    display: flex;
    flex-direction: column;

    &-row {
      margin: 10px 0;
    }
  }
  .company-field-value {
    color: black;
    font-size: 1.25rem;
    margin: 5px 10px;
  }
  .subtitle {
    padding: 5px;
    border-radius: 5px;
    background-color: #EFEFEF;
  }
</style>