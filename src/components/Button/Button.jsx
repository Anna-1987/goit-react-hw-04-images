
import css from '../Button/Button.module.css';

export const Button = ({onloadMore}) => {
   
return(
    <button 
       type={css.button} 
       className={css.load__more} 
       onClick={onloadMore}>
        Load more
        </button>
)}