import React from 'react';
import jss from 'jss';

const Input = props => {
  const id = `input-${props.label.replace(' ', '').toLowerCase()}`;

  const styles = {
    label: {
      display: 'block',
      width: '100%',
      '& p': {
        fontSize: '12px',
        margin: '0',
      },
    },
    input: {
      display: 'block',
      fontSize: '16px',
      border: '1px solid #7e6690',
      borderRadius: '4px',
      padding: '10px 5px',
      color: 'grey',
      height: '45px',
      width: 'inherit',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)',
    },
  };

  const { classes } = jss.createStyleSheet(styles).attach();

  return (
    <div>
      <label className={classes.label} htmlFor={props.label}>
        <p>{props.label}</p>
        <input
          id={id}
          key={id}
          type={props.type}
          name={props.label}
          className={classes.input}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        ></input>
      </label>
    </div>
  );
};

export default Input;
