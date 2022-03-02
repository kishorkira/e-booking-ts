export const name = (value) =>{
    if(!value) return false;
    return /^[a-zA-Z]+\s?[a-zA-Z]*\s?[a-zA-Z]*$/g.test(value.toString().trim())
  }