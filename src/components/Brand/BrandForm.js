import React, { useState } from 'react';
import { Button, Modal, Form, Icon } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_BRAND, GET_BRANDS } from '../../query';

const BrandForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const [createBrand] = useMutation(CREATE_BRAND, {
    refetchQueries: [{ query: GET_BRANDS }],
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
    createBrand({
      variables: {
        input: { name },
      },
    });
  };

  const onChange = (e) => {
    setName(e.target.value);
    setError('');
  };

  const toggle = () => {
    setName('');
    setOpen(!open);
  };

  return (
    <Modal
      trigger={
        <Icon name="plus" color="teal" size="big" link onClick={toggle} />
      }
      open={open}
      onClose={toggle}
    >
      <Modal.Header>Добавить производителя</Modal.Header>
      <Modal.Content>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <input value={name} placeholder="Название" onChange={onChange} />
            {error && <span>{error}</span>}
          </Form.Field>
          <Button type="submit">Добавить</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default BrandForm;
