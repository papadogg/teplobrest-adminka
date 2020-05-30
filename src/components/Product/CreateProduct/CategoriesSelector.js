import React, { Fragment } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';

import CategoryForm from '../../Category/CategoryForm';
import { transformOptions } from './helpers';

const CategoriesSelector = ({
  categories,
  setCategories,
  categoryOptions,
  index,
}) => {
  const i = index || 0;
  const level = i + 1;
  const parentId = i > 0 ? categories[i - 1] : 'catalog';

  const options = categoryOptions.filter(
    (opt) => opt.level === level && opt.parentId === parentId
  );

  const addSubcategory = () => {
    setCategories([...categories, 'empty']);
  };

  const updateCategories = (value) => {
    if (i === 0) {
      setCategories([value]);
    }
    const newCategories = categories.slice(0, i);
    newCategories.push(value);
    setCategories(newCategories);
  };
  return (
    <Fragment>
      <Form.Field style={{ marginLeft: `${i * 20}px` }}>
        <label>{`${i === 0 ? 'Категория*' : 'Подкатегория'}`}</label>
        <div className="with-plus">
          <Dropdown
            placeholder="Категория"
            fluid
            search
            selection
            value={categories[i]}
            options={transformOptions(options)}
            onChange={(e, { value }) => updateCategories(value)}
          />
          <CategoryForm parentId={parentId} level={i > 0 ? level : 1} />
        </div>
        {categories[i] && categories[i] !== 'empty' && (
          <div>
            <button onClick={addSubcategory} type="button">
              Добавить подкатегорию
            </button>
            {categories[i + 1] && (
              <CategoriesSelector
                categories={categories}
                setCategories={setCategories}
                categoryOptions={categoryOptions}
                index={i + 1}
              />
            )}
          </div>
        )}
      </Form.Field>
    </Fragment>
  );
};

export default CategoriesSelector;
