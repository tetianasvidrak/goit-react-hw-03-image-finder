import css from './Button.module.css';

const Button = ({ onClickHandler }) => {
  return (
    <button className={css.button} onClick={onClickHandler}>
      Load more
    </button>
  );
};

export default Button;
