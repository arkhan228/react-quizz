import { useQuiz } from '../contexts/QuizContext';
import Stats from './Stats';

export default function Intro() {
  const {
    status,
    difficulty,
    shuffle,
    dispatch,
    numQuestions,
    statsDisplayed,
    takenQuiz,
  } = useQuiz();
  return (
    <article>
      <div className='start'>
        <h2>Welcome to The React Quiz!</h2>
        {status === 'selecting' ? (
          <>
            <div className='choices'>
              <label htmlFor='difficulty'>Choose a difficulty</label>
              <select
                name='difficulty'
                className='btn difficulty'
                id='difficulty'
                value={difficulty}
                onChange={e =>
                  dispatch({ type: 'difficulty', payload: e.target.value })
                }
              >
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
                <option value='mixed'>Mixed</option>
              </select>
            </div>
            <div className='choices'>
              <label htmlFor='shuffle'>Choose to shuffle</label>
              <select
                name='shuffle'
                className='btn shuffle'
                title='Only Available on Replays'
                id='shuffle'
                value={shuffle}
                onChange={e =>
                  dispatch({ type: 'shuffle', payload: e.target.value })
                }
                disabled={takenQuiz[difficulty] === 0}
              >
                <option value='none'>None</option>
                <option value='questions'>Questions</option>
                <option value='options'>Options</option>
                <option value='both'>Both</option>
              </select>
            </div>
          </>
        ) : (
          <h3> {numQuestions} questions to test your react mastery</h3>
        )}
      </div>
      {statsDisplayed && <Stats />}
    </article>
  );
}
