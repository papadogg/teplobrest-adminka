import React, { useState, Fragment } from 'react';
import Select from 'react-select';

const types = {
  boiler: [
    {
      name: 'Тип котла',
      value: 'boilerType',
      options: [
        {
          value: 'gas',
          label: 'Газовые',
          props: [
            {
              name: 'Тип установки',
              value: 'setType',
              options: [
                { value: 'wall', label: 'Настенные' },
                { value: 'floor', label: 'Напольные' },
                { value: 'parapet', label: 'Парапетныe' },
              ],
            },
            {
              name: 'Тип',
              value: 'type',
              options: [
                { value: 'single', label: 'Одноконтурныe' },
                { value: 'double', label: 'Двухконтурныe' },
                { value: 'embedded', label: 'Со встроенным бойлером' },
                { value: 'сondensation', label: 'Конденсационные' },
              ],
            },
            {
              name: 'Камера сгорания',
              value: 'chamberType',
              options: [
                { value: 'open', label: 'Открытая' },
                { value: 'closed', label: 'Закрытая' },
              ],
            },
          ],
        },
        {
          value: 'solid',
          label: 'Твердотопливные',
          props: [
            {
              name: 'Вид топлива',
              value: 'fuelType',
              options: [
                { value: 'wood', label: 'Дерево, уголь, торф' },
                { value: 'pellets', label: 'Пеллеты' },
              ],
            },
            {
              name: 'Тип',
              value: 'type',
              options: [
                { value: 'natural', label: 'На естественной тяге' },
                { value: 'automatic', label: 'С автоматикой' },
                {
                  value: 'automaticSupply',
                  label: 'Автоматическая подача топлива',
                },
              ],
            },
          ],
        },
        {
          value: 'electro',
          label: 'Электрические',
        },
      ],
    },
    {
      name: 'Мощность',
      value: 'power',
    },
    {
      name: 'Обогреваемая площадь',
      value: 'area',
    },
  ],
};

const renderFields = ({ attributes, setAttributes, field }) => {
  return (
    <Fragment>
      <div>
        <label>{field.name}</label>
        <Select
          value={attributes[field.value]}
          onChange={(option) => {
            if (field.value === 'boilerType') {
              setAttributes({
                boilerType: {
                  value: option.value,
                  label: option.label,
                },
              });
            } else {
              setAttributes({
                ...attributes,
                [field.value]: {
                  value: option.value,
                  label: option.label,
                },
              });
            }
          }}
          options={field.options}
        />
      </div>
      {field.options &&
        field.options.map((f) => {
          if (
            f.props &&
            attributes[field.value] &&
            f.value === attributes[field.value].value
          ) {
            return f.props.map((p) =>
              renderFields({ attributes, setAttributes, field: p })
            );
          }
        })}
    </Fragment>
  );
};

const Attibutes = ({ productType, attributes, setAttributes }) => {
  console.log(attributes);
  return (
    <Fragment>
      {types[productType].map((field) => {
        if (field.options) {
          return renderFields({ attributes, setAttributes, field });
        } else {
          console.log(attributes[field.value]);
          return (
            <div key={field.name}>
              <label>{field.name}</label>
              <input
                value={(attributes[field.value] || {}).value}
                type="text"
                onChange={(e) => {
                  setAttributes({
                    ...attributes,
                    [field.value]: {
                      value: e.target.value,
                      label: field.name,
                    },
                  });
                }}
              />
            </div>
          );
        }
      })}
    </Fragment>
  );
};

export default Attibutes;
