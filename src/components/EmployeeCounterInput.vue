<template>
  <div class="counter-input">
    <div class="count">{{ count.toLocaleString("en-us") }}</div>
    <div class="field is-grouped">
      <button
        class="control button is-small is-outlined increment"
        @click="increment">
        +
      </button>
      <button
        class="control button is-small is-outlined increment"
        @click="decrement">
        -
      </button>
      <button
        v-if="isChanged"
        class="control button is-small is-primary is-outlined increment"
        @click="submit">
        Save
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeCounterInput',
  data() {
    return {
      count: this.employeeCount
    };
  },
  props: {
    employeeCount: {
      type: Number,
      required: true,
    }
  },
  computed: {
    isChanged() {
      return this.count !== this.employeeCount;
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    submit() {
      this.$emit('countUpdated', this.count);
    }
  }
}
</script>

<style lang="scss" scoped>
  .count {
    color: black;
    font-size: 1.25rem;
    margin-right: 10px;
  }
  .counter-input {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .increment {
    margin-right: 10px;
  }
</style>