import React from 'react';
import { Dropdown, List, Icon, Input } from 'semantic-ui-react';

const AttributeItem = ({ options, attributes, attribute, setAttributes }) => {
  const setAttribute = (value) => {
    const option = options.find((o) => o.id === value);

    if (attributes.find((a) => a.id === value)) {
      return;
    }

    const newValue = attributes.map((a) => {
      if (a.id === attribute.id) {
        return {
          id: value,
          attribute: value,
          key: option.key,
          unit: option.unit,
          input: a.input,
        };
      }
      return a;
    });
    setAttributes(newValue);
  };
  const setInput = (value) => {
    setAttributes(
      attributes.map((a) => {
        if (a.id === attribute.id) {
          return {
            ...a,
            input: value,
          };
        }
        return a;
      })
    );
  };

  const deleteAttribute = () => {
    setAttributes(attributes.filter((a) => a.key !== attribute.key));
  };
  return (
    <List.Item className="product-form__attribute-item">
      <div>
        <Dropdown
          placeholder="Хар-ка"
          fluid
          search
          selection
          options={options}
          value={attribute.id}
          onChange={(e, { value }) => setAttribute(value)}
        />
        <Input
          value={attribute.input || ''}
          label={{ basic: true, content: attribute.unit }}
          labelPosition="right"
          placeholder="Значение"
          onChange={(e) => setInput(e.target.value)}
        />
        <div>
          <Icon name="delete" size="big" link onClick={deleteAttribute} />
        </div>
      </div>
    </List.Item>
  );
};

export default AttributeItem;
