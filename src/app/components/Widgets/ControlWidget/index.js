import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { resetQuestion, changeQuestion } from 'app/actions/code';
import { changeCategory } from 'app/actions/category';

import QuestionSelector from 'app/components/Selectors/QuestionSelector';
import CategorySelector from 'app/components/Selectors/CategorySelector';

import { getStateInformation } from 'app/utils/stateHelper';

import { Button } from 'antd';
import styles from './ControlWidget.module.scss';

const ControlWidget = ({
  categoryIndex,
  questionIndex,
  onReset,
  onChangeCategory,
  onChangeQuestion,
  questionList
}) => (
  <div className={styles.control}>
    <CategorySelector
      onChange={onChangeCategory}
      index={categoryIndex}
    />
    <QuestionSelector
      onChange={onChangeQuestion}
      index={questionIndex}
      list={questionList}
    />
    <Button type="danger" onClick={onReset}>Reset</Button>
  </div>
);

export default ControlWidget;
