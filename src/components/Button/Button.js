import style from "../Button/Button.module.css";

function Button({ onClick }) {
  return (
    <button className={style.Button} onClick={onClick}>
      Load more
    </button>
  );
}
export default Button;