import { useQuiz } from '../contexts/QuizContext';
import Button from './Button';

function StatsButton() {
  const { statsDisplayed } = useQuiz();
  return <Button>{statsDisplayed ? 'Hide Stats' : 'Show Stats'}</Button>;
}

export default StatsButton;
