<template>
  <form @submit="submitForm">
    <div class="edit-company">
      <div class="card">
        <div class="card-content">
          <div class="content edit-form">
            <div class="edit-form-title">
              <h1 class="title">{{ form.name }}</h1>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Company name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Enter company name..." v-model="form.name">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Company domain</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Enter company domain..." v-model="form.domain">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Number of employees</label>
                <div class="control">
                  <input class="input" type="number" placeholder="Enter employee count" v-model="form.numberOfEmployees">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Subscriptions per employee</label>
                <div class="control">
                  <input class="input" type="number" placeholder="Enter subscriptions per employee" v-model="form.subscriptionsPerEmployee">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <button class="button" type="submit">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import CompanyService from '../services/CompanyService';
export default {
  name: 'Edit',
  data() {
    return {
      companyId: 0,
      companyFailedToLoad: false,
      form: {
        name: '',
        domain: '',
        numberOfEmployees: 0,
        subscriptionsPerEmployee: 0,
      }
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      CompanyService.putById(this.companyId, { id: this.companyId, ...this.form })
    }
  },
  created() {
    const companyIdParam = this.$route.params.companyId;
    this.companyId = parseInt(companyIdParam);
    if (!isNaN(this.companyId)) {
      CompanyService.getById(this.companyId).then((data) => {
        this.form.name = data.name;
        this.form.domain = data.domain;
        this.form.numberOfEmployees = data.numberOfEmployees;
        this.form.subscriptionsPerEmployee = data.subscriptionsPerEmployee;
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
  .edit-company {
    max-width: 800px;
    margin: 0 auto;
  }
  .edit-form {
    display: flex;
    flex-direction: column;

    &-row {
      margin: 10px 0;
    }
  }
</style>