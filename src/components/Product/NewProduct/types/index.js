import * as boilers from './boilerTypes';

export const productTypes = [
  { value: 'boiler', label: 'Котлы' },
  { value: 'heater', label: 'Водонагреватели' },
];

export const getProductTypes = (type) => {
  if (type === 'boiler') {
    return getBoilerTypes();
  }
  // if(type === 'heater') {
  //   return getHeaterTypes();
  // }
};

const getBoilerTypes = () => {};
