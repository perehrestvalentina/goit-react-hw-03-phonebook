import css from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={css.filter__title}>
      Find contacts by name
      <br />
      <input
        className={css.filter__item}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Filter;
