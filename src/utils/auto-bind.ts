function autoBind(instance: any) {
  const prototype = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(prototype);

  propertyNames.forEach((name) => {
    const value = prototype[name];
    if (name !== 'constructor' && typeof value === 'function') {
      instance[name] = value.bind(instance);
    }
  });
}

export default autoBind;
