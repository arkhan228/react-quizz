import { useEffect } from 'react';
import { useQuiz } from '../contexts/QuizContext';

export default function Timer() {
  const { time, dispatch } = useQuiz();
  const min = Math.floor(time / 60);
  const sec = time % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'timer' });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className='timer'>
      {min < 10 && '0'}
      {min}:{sec < 10 && '0'}
      {sec}
    </div>
  );
}
