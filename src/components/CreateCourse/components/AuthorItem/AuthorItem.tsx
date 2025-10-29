import styles from './AuthorItem.module.css';
import { Author } from '../../../../constants';
import trashIcon from '../../../../assets/images/trash.svg';
import addIcon from '../../../../assets/images/add.svg';

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
  const iconSrc = variant === 'add' ? addIcon : trashIcon;
  const altText = variant === 'add' ? `Add author ${author.name}` : `Delete author ${author.name}`;
  
  return (
    <div className={styles.authorItem}>
      <span className={styles.authorName}>{author.name}</span>
      <button
        type="button"
        className={styles.iconButton}
        onClick={() => onClick(author.id)}
        aria-label={altText}
      >
        <img src={iconSrc} className={styles.authorButton} alt={altText} />
      </button>
    </div>
  );
};

export default AuthorItem;