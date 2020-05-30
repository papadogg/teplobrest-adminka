export const transformOptions = (options) => {
  return options.map((option) => ({
    key: option.id,
    value: option.id,
    text: option.name,
    ...(option.unit && { unit: option.unit }),
    id: option.id,
  }));
};

export const transformAttributes = (attributes) => {
  if (!attributes) return undefined;
  return attributes.map((attr) => ({
    ...attr.attribute,
    attribute: attr.attribute.id,
    value: attr.value,
    input: attr.value,
  }));
};
