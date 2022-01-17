import themeStyles from 'styles/theme.module.css';

export const returnDefault = ({ color, variant }) => {
  const colors = ['primary', 'success', 'warning', 'danger'];
  const variants = ['filled', 'outlined'];

  const value = color || variant;
  const array = color ? colors : variants;
  return array.includes(value) ? value : array[0];
};

export const isEmpty = (value) => typeof value !== 'boolean' && !value;

export const classNames = (classMapping) => {
  const classes = [];
  Object.keys(classMapping).forEach((classKey) => {
    classMapping[classKey] && classes.push(classKey);
  });
  return classes.join(' ');
};

export const typeToColorMapping = ({ color, variant = 'filled' }) => {
  const classString = `${returnDefault({ variant })}-${returnDefault({ color })}`;
  return themeStyles[classString];
};
