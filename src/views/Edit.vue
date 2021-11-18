<template>
<div>
  <form @submit="submitForm" v-if="!companyFailedToLoad">
    <div v-if="showAlert">
      <div class="notification is-primary changes-notification">
        <button class="delete" @click="dismissAlert"></button>
        <span>Success! The following data was updated</span>
        <div class="updates">
          <p v-if="nameChanged">Name: {{originalForm.name}}</p>
          <p v-if="domainChanged">Domain: {{originalForm.domain}}</p>
          <p v-if="numberOfEmployeesChanged">Number of employees: {{originalForm.numberOfEmployees}}</p>
          <p v-if="subscriptionsPerEmployeeChanged">Number of subscriptions: {{originalForm.subscriptionsPerEmployee}}</p>
        </div>
      </div>
    </div>
    <div class="edit-company">
      <div class="card">
        <div class="card-content">
          <div class="content edit-form">
            <div class="edit-form-title">
              <h1 class="title">{{ companyName }}</h1>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Company name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Enter company name..." v-model="form.name" @input="formChanged">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Company domain</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Enter company domain..." v-model="form.domain" @input="formChanged">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Number of employees</label>
                <div class="control">
                  <input class="input" type="number" placeholder="Enter employee count" v-model="form.numberOfEmployees" @input="formChanged">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <div class="field">
                <label class="label">Subscriptions per employee</label>
                <div class="control">
                  <input class="input" type="number" placeholder="Enter subscriptions per employee" v-model="form.subscriptionsPerEmployee" @input="formChanged">
                </div>
              </div>
            </div>
            <div class="edit-form-row">
              <button class="button" type="submit" :disabled="!hasUnsavedChanged">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  <div v-else>
    <div class="title">
      Failed to load company
    </div>
  </div>
</div>
</template>

<script>
import CompanyService from '../services/CompanyService';
export default {
  name: 'Edit',
  data() {
    return {
      companyId: 0,
      companyFailedToLoad: false,
      originalCompany: null,
      showAlert: false,
      companyName: '',
      form: {
        name: '',
        domain: '',
        numberOfEmployees: 0,
        subscriptionsPerEmployee: 0,
      },
      formHasChanged: false,
      originalForm: null,
      nameChanged: false,
      domainChanged: false,
      numberOfEmployeesChanged: false,
      subscriptionsPerEmployeeChanged: false,
    };
  },
  methods: {
    submitForm(e) {
      e.preventDefault();
      this.nameChanged = this.originalForm.name !== this.form.name;
      this.domainChanged = this.originalForm.domain !== this.form.domain;
      this.numberOfEmployeesChanged = this.originalForm.numberOfEmployees !== this.form.numberOfEmployees;
      this.subscriptionsPerEmployeeChanged = this.originalForm.subscriptionsPerEmployee !== this.form.subscriptionsPerEmployee;
      CompanyService.putById(this.companyId, { id: this.companyId, ...this.form })
      .then((data) => {
        this.setCompanyForm(data);
        this.originalForm = Object.assign({}, this.form);
        this.formHasChanged = false;
        this.showAlert = true;
      });
    },
    dismissAlert() {
      this.showAlert = false;
    },
    formChanged() {
      this.formHasChanged = true;
    },
    setCompanyForm(company) {
      this.companyName = this.form.name = company.name;
      this.form.domain = company.domain;
      this.form.numberOfEmployees = company.numberOfEmployees;
      this.form.subscriptionsPerEmployee = company.subscriptionsPerEmployee;
    },
  },
  computed: {
    hasUnsavedChanged() {
      return this.formHasChanged;
    }
  },
  created() {
    const companyIdParam = this.$route.params.companyId;
    this.companyId = parseInt(companyIdParam);
    if (!isNaN(this.companyId)) {
      CompanyService.getById(this.companyId).then((data) => {
        this.setCompanyForm(data);
        this.originalForm = Object.assign({}, this.form);
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
  .edit-company, .changes-notification {
    max-width: 800px;
    margin: 0 auto;
  }
  .changes-notification {
    margin-bottom: 25px;
    .updates {
      margin-top: 5px;
    }
  }
  .edit-form {
    display: flex;
    flex-direction: column;

    &-row {
      margin: 10px 0;
    }
  }
</style>