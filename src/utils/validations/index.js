import { extend } from "vee-validate";
import { required, alpha, email, numeric, between  } from "vee-validate/dist/rules";
import { name, lengthRange } from './customRules'

extend("required", {
  ...required,
  message: (fieldName) => {
    return `Please enter ${fieldName}`;
  },
});

extend("between", {
  ...between,
  message: (fieldName, args) => {
    console.log(args)
    return `${fieldName} chars should be between ${args}`;
  },
});

extend("alpha", {
  ...alpha,
  message: (fieldName) => {
    return `Please enter valid ${fieldName}`;
  },
});

extend("numeric", {
  ...numeric,
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

extend('lengthRange',{
  validate:(value, args) => lengthRange(value, args),
  message: (fieldName, args) =>  {
    return `${fieldName} lenght should be b/w ${args[0]} and ${args[1]}`
  }
})