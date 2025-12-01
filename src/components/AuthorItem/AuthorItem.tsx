import styles from './AuthorItem.module.css';

import trashIcon from '../../assets/images/trash.svg';
import addIcon from '../../assets/images/add.svg';

import { Author } from '../../constants';

type AuthorItemProps = {
  author: Author;
  onClick: (authorId: string) => void;
  variant: 'add' | 'delete';
};

const AuthorItem = ({
  author,
  variant,
  onClick,
}: AuthorItemProps) => {
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
        <img src={iconSrc} className={styles.authorButton} alt={buttonText} />
      </button>
    </div>
  );
};

export default AuthorItem;