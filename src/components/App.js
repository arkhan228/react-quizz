import { useEffect, useReducer } from 'react';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import Header from './Header';
import Intro from './Intro';
import reducer from './reducer';
import NextButton from './NextButton';
import Finish from './Finish';
import Counter from './Counter';
import Question from './Question';
import Timer from './Timer';

export const initalState = {
  questions: [],
  status: 'loading',
  curQuest: 0,
  curPoints: 0,
  answer: '',
  highscore: 0,
  time: 600,
};

export default function App() {
  const [
    { questions, status, curQuest, curPoints, answer, highscore, time },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestions = questions.length;
  const numPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const restart = status === 'loading';

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    function fetchData() {
      fetch('http://localhost:8000/questions')
        .then(res => res.json())
        .then(data => {
          const shuffledArr = shuffle(data.slice());
          dispatch({ type: 'dataRecieved', payload: shuffledArr });
        })
        .catch(err => dispatch({ type: 'dataFailed' }));
    }

    setTimeout(() => fetchData(), 1000);
  }, [restart]);

  return (
    <div className='app'>
      <Header />
      <Main
        status={status}
        curQuest={curQuest}
        numQuest={numQuestions}
        curPoints={curPoints}
        numPoints={numPoints}
      >
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <Intro dispatch={dispatch} numQuestions={numQuestions} />
        )}
        {status === 'active' && (
          <Question
            questions={questions}
            curQuest={curQuest}
            answer={answer}
            time={time}
            dispatch={dispatch}
          >
            <Timer time={time} dispatch={dispatch} />
            {answer && (
              <NextButton dispatch={dispatch}>
                {curQuest !== questions.length - 1 ? 'Next' : 'Finish'}
              </NextButton>
            )}
          </Question>
        )}
        {time < 0 && <Counter />}
        {status === 'finish' && (
          <Finish
            curPoints={curPoints}
            numPoints={numPoints}
            highscore={highscore}
          >
            <NextButton dispatch={dispatch}>Restart</NextButton>
          </Finish>
        )}
      </Main>
    </div>
  );
}
