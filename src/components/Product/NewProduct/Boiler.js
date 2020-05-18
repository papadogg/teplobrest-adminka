import React, { useState, Fragment } from 'react';
import Select from 'react-select';

import * as boilers from './types/boilerTypes';

const Boiler = ({ product, updateProduct }) => {
  const [boilerType, setBoilerType] = useState('');

  console.log(product);

  return (
    <Fragment>
      <div>
        <label>Тип котла</label>
        <Select
          value={boilerType}
          onChange={(option) => {
            setBoilerType(option);
            updateProduct('boilerType', option.value);
          }}
          options={boilers.boilerTypes}
          isClearable
        />
      </div>
      {boilerType.value === 'gas' && (
        <Fragment>
          <div>
            <label>Тип установки</label>
            <Select
              value={boilers.boilerSetTypes.find(
                (t) => t.value === product.boilerSetType
              )}
              onChange={(option) => {
                updateProduct('boilerSetType', option.value);
              }}
              options={boilers.boilerSetTypes}
              isClearable
            />
          </div>
          <div>
            <label>Тип</label>
            <Select
              value={boilers.gasBoilerTypes.find(
                (t) => t.value === product.gasBoilerType
              )}
              onChange={(option) => {
                updateProduct('gasBoilerType', option.value);
              }}
              options={boilers.gasBoilerTypes}
              isClearable
            />
          </div>
          <div>
            <label>Камера сгорания</label>
            <Select
              value={boilers.chamberTypes.find(
                (t) => t.value === product.chamberType
              )}
              onChange={(option) => {
                updateProduct('chamberType', option.value);
              }}
              options={boilers.chamberTypes}
              isClearable
            />
          </div>
        </Fragment>
      )}
      {boilerType.value === 'solid' && (
        <Fragment>
          <div>
            <label>Тип</label>
            <Select
              value={boilers.solidBoilerTypes.find(
                (t) => t.value === product.solidBoilerType
              )}
              onChange={(option) => {
                updateProduct('solidBoilerType', option.value);
              }}
              options={boilers.solidBoilerTypes}
              isClearable
            />
          </div>
          <div>
            <label>Вид топлива</label>
            <Select
              value={boilers.fuelTypes.find(
                (t) => t.value === product.fuelType
              )}
              onChange={(option) => {
                updateProduct('fuelType', option.value);
              }}
              options={boilers.fuelTypes}
              isClearable
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Boiler;
