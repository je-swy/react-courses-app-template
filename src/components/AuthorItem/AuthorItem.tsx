import styles from './AuthorItem.module.css';
import { Author } from '../../constants';
import trashIcon from '../../assets/images/trash.svg';
import addIcon from '../../assets/images/add.svg';

interface AuthorItemProps {
  author: Author;
  onClick: (authorId: string) => void;
  variant: 'add' | 'delete';
}

const AuthorItem: React.FC<AuthorItemProps> = ({
  author,
  variant,
  onClick,
}) => {
  const isAdd = variant === 'add';
  const iconSrc = isAdd ? addIcon : trashIcon;
  const buttonText = isAdd ? 'Add author' : 'Delete author';

  return (
    <div className={styles.authorItem}>
      <span className={styles.authorName}>{author.name}</span>
      <button
        type="button"
        role="button"
        className={styles.iconButton}
        onClick={() => onClick(author.id)}
        aria-label={buttonText}
      >
        {buttonText}
        <img src={iconSrc} className={styles.authorButton} alt={buttonText} />
        {variant === 'add' && 'Add author'}
        {variant === 'delete' && 'Delete author'}
      </button>
    </div>
  );
};

export default AuthorItem;