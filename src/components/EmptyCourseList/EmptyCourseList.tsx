// in this file we define the EmptyCourseList component

import Button from '../../common/Button/Button';

import { BUTTON_TEXT, UI_TEXT } from '../../constants';

const EmptyCourseList = () => {
  return (
    <section className='empty-list-container'>
      <h2>{UI_TEXT.EMPTY_LIST_TITLE}</h2>
      <p>{UI_TEXT.EMPTY_LIST_SUBTITLE}</p>
      <Button buttonText={BUTTON_TEXT.ADD_NEW} />
    </section>
  );
};

export default EmptyCourseList;