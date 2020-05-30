import React, { useState } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from '../../query';

const CategoryForm = ({
  type = 'create',
  category = {},
  parentId = 'catalog',
  level = 1,
}) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setName('');
      setOpen(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_CATEGORIES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setName('');
      setOpen(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!name) {
      setError('Заполните поле');
      return;
    }
    type === 'create'
      ? createCategory({
          variables: {
            input: { name, parentId, level },
          },
        })
      : updateCategory({
          variables: {
            input: { id: category.id, name },
          },
        });
  };

  const onChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const toggle = () => {
    if (!open && category.name) {
      setName(category.name);
    } else {
      setName('');
    }
    setOpen(!open);
  };

  return (
    <Modal
      trigger={
        type === 'create' ? (
          <Icon name="plus" color="teal" size="big" link onClick={toggle} />
        ) : (
          <Icon name="edit" size="big" link onClick={toggle} />
        )
      }
      open={open}
      onClose={toggle}
    >
      <Modal.Header>{`${
        type === 'create' ? 'Добавить' : 'Редактировать'
      } категорию`}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <input
              type="text"
              value={name}
              placeholder="Название"
              onChange={onChange}
            />
            {error && <span>{error}</span>}
          </Form.Field>
          <Button
            className="category-list__submit-btn"
            onClick={onSubmit}
            type="button"
          >{`${type === 'create' ? 'Добавить' : 'Редактировать'}`}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default CategoryForm;
