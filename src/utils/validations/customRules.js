export const name = (value) => {
  if (!value) return false;
  return /^[a-zA-Z]+\s?[a-zA-Z]*\s?[a-zA-Z]*$/g.test(value.toString().trim());
};


export const lengthRange = (value,args) =>{
  if(!value) return false
  value = value.replace(/\s/g,'');  
  return new RegExp(`^[0-9]{${args[0]},${args[1]}}$`, 'g').test(value)
}
