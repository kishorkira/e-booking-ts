import { extend } from "vee-validate";
import { required, alpha, email } from "vee-validate/dist/rules";
import { name } from './customRules'

extend("required", {
  ...required,
  message: (fieldName) => {
    return `Please enter ${fieldName}`;
  },
});

extend("alpha", {
  ...alpha,
  message: (fieldName) => {
    return `Please enter valid ${fieldName}`;
  },
});

extend('email', {
  ...email,
  message: () => `Please enter valid email`,
})

extend('name',{
  validate:(value, args) => name(value, args),
  message: (fieldName) => `Please enter valid ${fieldName}`
})