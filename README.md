# Pax8 Front-end Developer Homework

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

### Node & Npm Version
```
node: v14.16.1
npm: 6.14.12
```

## Homework Instructions
You are free to use any Vue plugin or npm module to complete the homework. Style the app using the Bulma framework. It has already been imported for you.

Create your own Github repo and push the changes there. Send a link to the repo to ipfeffer@pax8.com within 4 hours.

---

Using the CompanyService.js (fake company data):

1. Display a List of companies
    1. Include `id`, `name`, and an `edit` button values in list
2. Build an Edit company page
    1. Display a form to edit company details
    2. Upon submitting the form, alert with new details.
3. Build a View company page
    1. From the List Page add the ability to click the `name` to bring you to the view company page.
    2. Display all company details.
    3. Display total subscriptions for that company - `numberOfEmployees * subscriptionsPerEmployee`
    4. Build a component that takes the `numberOfEmployees` property and allows a user to increase/decrease that amount. When user is confident in the `numberOfEmployees` value and submits change, the component should be able to notify the parent page with the new value. The parent page (View Company Page) should reflect the change. This needs to be a component because we are going to use it on multiple pages.