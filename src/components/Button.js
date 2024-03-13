import { useQuiz } from '../contexts/QuizContext';

export default function Button({ disable = false, children }) {
  const { dispatch } = useQuiz();
  return (
    <button
      className='btn'
      onClick={() =>
        dispatch({
          type: children
            .split(' ')
            .map((w, i) => (i === 0 ? w.toLowerCase() : w))
            .join(''),
        })
      }
      disabled={disable}
    >
      {children}
    </button>
  );
}
