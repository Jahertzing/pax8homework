export default {
  getAll,
  getById,
  putById,
};

function getAll() {
  return Promise.resolve(fakeCompanies);
}

function getById(id) {
  const company = fakeCompanies.find(company => company.id === id);
  return Promise.resolve(company);
}

function putById(id, newCompany) {
  const companyIndex = fakeCompanies.findIndex((company) => {
    return company.id === id;
  });

  if (typeof newCompany.numberOfEmployees === 'string') {
    newCompany.numberOfEmployees = parseInt(newCompany.numberOfEmployees);
  }

  if (typeof newCompany.subscriptionsPerEmployee === 'string') {
    newCompany.subscriptionsPerEmployee = parseInt(newCompany.subscriptionsPerEmployee);
  }

  const putPromise = new Promise((resolve) => {
    fakeCompanies[companyIndex] = newCompany;
    resolve(fakeCompanies[companyIndex]);
  });
  return Promise.resolve(putPromise);
}

const fakeCompanies = [
  {
    id: 1,
    name: 'Facebook',
    domain: 'facebook.com',
    numberOfEmployees: 10000,
    subscriptionsPerEmployee: 1,
  },
  {
    id: 2,
    name: 'Google',
    domain: 'google.com',
    numberOfEmployees: 85000,
    subscriptionsPerEmployee: 5,
  },
  {
    id: 3,
    name: 'Yahoo',
    domain: 'yahoo.com',
    numberOfEmployees: 62000,
    subscriptionsPerEmployee: 4,
  },
  {
    id: 4,
    name: 'Pax8',
    domain: 'pax8.com',
    numberOfEmployees: 256,
    subscriptionsPerEmployee: 2,
  },
];
