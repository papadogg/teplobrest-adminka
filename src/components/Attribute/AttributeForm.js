import React, { useState } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import {
  CREATE_ATTRIBUTE,
  GET_ATTRIBUTES,
  UPDATE_ATTRIBUTE,
} from '../../query';

const AttributeForm = ({ type = 'create', attribute = {} }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [key, setKey] = useState('');
  const [unit, setUnit] = useState('');
  const [error, setError] = useState('');

  const [createAttribute] = useMutation(CREATE_ATTRIBUTE, {
    refetchQueries: [{ query: GET_ATTRIBUTES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setName('');
      setKey('');
      setUnit('');
      setOpen(false);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const [updateAttribute] = useMutation(UPDATE_ATTRIBUTE, {
    refetchQueries: [{ query: GET_ATTRIBUTES }],
    awaitRefetchQueries: true,
    onCompleted: () => {
      setName('');
      setKey('');
      setUnit('');
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
      setError('Заполните полe');
      return;
    }
    type === 'create'
      ? createAttribute({
          variables: {
            input: { name, key, unit },
          },
        })
      : updateAttribute({
          variables: {
            input: { id: attribute.id, name, key, unit },
          },
        });
  };

  const onChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const toggle = () => {
    if (!open) {
      setName(attribute.name || '');
      setKey(attribute.key || '');
      setUnit(attribute.unit || '');
    } else {
      setName('');
      setKey('');
      setUnit('');
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
      } характеристику`}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Название</label>
            <input value={name} placeholder="Название" onChange={onChange} />
            {error && <span>{error}</span>}
          </Form.Field>
          <Form.Field>
            <label>
              Название на английском через camelCase (Например если хар-ка "Тип
              котла", то тут пишем "boilerType")
            </label>
            <input
              value={key}
              placeholder="Название на английском"
              onChange={(e) => setKey(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Единица измерения</label>
            <input
              value={unit}
              placeholder="Единица измерения"
              onChange={(e) => setUnit(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">{`${
            type === 'create' ? 'Добавить' : 'Редактировать'
          }`}</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default AttributeForm;
