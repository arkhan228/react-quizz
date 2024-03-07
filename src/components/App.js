import { useEffect, useReducer } from 'react';
import Loader from './Loader';
import Error from './Error';
import Main from './Main';
import Header from './Header';
import Intro from './Intro';
import Progress from './Progress';
import Question from './Question';
import Button from './Button';
import Finish from './Finish';
import TimeOut from './TimeOut';
import Timer from './Timer';
import Footer from './Footer';

const scores = JSON.parse(localStorage.getItem('highscores')) || {
  easy: 0,
  medium: 0,
  hard: 0,
  mixed: 0,
};
const quizes = JSON.parse(localStorage.getItem('takenQuiz')) || {
  easy: 0,
  medium: 0,
  hard: 0,
  mixed: 0,
};

const initalState = {
  takenQuiz: quizes,
  highscores: scores,
  difficulty: 'easy',
  shuffle: 'neither',
  questions: [],
  status: 'selecting',
  curQuest: 0,
  curPoints: 0,
  answers: [],
  time: null,
  statsDisplayed: false,
};

const SECS_PER_QUESTION = {
  easy: 20,
  medium: 25,
  hard: 30,
  mixed: 25,
};

/**
 * Reducer function to handle state updates based on the provided action.
 *
 * @param {Object} state - the current state of the application
 * @param {Object} action - the action to be performed
 * @return {Object} the new state based on the action performed
 */
function reducer(state, action) {
  switch (action.type) {
    // Update difficulty state
    case 'difficulty':
      return {
        ...state,
        difficulty: action.payload,
        shuffle:
          state.takenQuiz[action.payload] === 0 ? 'neither' : state.shuffle,
      };
    // Update shuffle state
    case 'shuffle':
      return {
        ...state,
        shuffle: action.payload,
      };
    // Update state status to 'loading'
    case 'loadQuestions':
      return {
        ...state,
        status: 'loading',
        statsDisplayed: false,
      };
    // Update state with received data and set status to 'ready'
    case 'dataRecieved':
      return {
        ...state,
        questions: action.payload,
        answers: new Array(action.payload.length).fill(null),
        status: 'ready',
      };
    // Update state status to 'error' on data failure
    case 'dataFailed':
      return { ...state, status: 'error' };
    // Update state status to 'active', calculate quiz time based on number of questions
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
        time: state.questions.length * SECS_PER_QUESTION[state.difficulty],
        statsDisplayed: false,
      };
    // Update state with answer and current points
    case 'answer':
      state.answers[state.curQuest] = action.payload.answer;
      return {
        ...state,
        curPoints: state.curPoints + action.payload.points,
      };
    // Update state with next question
    case 'next':
      return { ...state, curQuest: state.curQuest + 1 };
    // Update state with previous question
    case 'prev':
      return {
        ...state,
        curQuest: state.curQuest - 1,
      };
    // Update remaining quiz time and status based on timer
    case 'timer':
      return {
        ...state,
        time: state.time - 1,
        status: state.time === 0 ? 'finish' : state.status,
      };
    // Update state status to 'finish' and update highscore if necessary
    case 'finish':
      const newState = {
        ...state,
        status: 'finish',
        takenQuiz: {
          ...state.takenQuiz,
          [state.difficulty]: state.takenQuiz[state.difficulty] + 1,
        },
        highscores: {
          ...state.highscores,
          [state.difficulty]:
            state.curPoints > state.highscores[state.difficulty]
              ? state.curPoints
              : state.highscores[state.difficulty],
        },
      };
      localStorage.setItem('takenQuiz', JSON.stringify(newState.takenQuiz));
      localStorage.setItem('highscores', JSON.stringify(newState.highscores));
      return newState;
    case 'showStats':
      return {
        ...state,
        statsDisplayed: true,
      };
    case 'hideStats':
      return {
        ...state,
        statsDisplayed: false,
      };
    // Reset state to initial state, keep highscore, difficulty and shuffle
    case 'restart':
      return {
        ...initalState,
        takenQuiz: state.takenQuiz,
        highscores: state.highscores,
        highscore: state.highscore,
        difficulty: state.difficulty,
        shuffle: state.shuffle,
      };
    // Throw error for unknown action
    default:
      throw new Error('Unknown Action');
  }
}

export default function App() {
  const [
    {
      takenQuiz,
      highscores,
      difficulty,
      shuffle,
      status,
      questions,
      curQuest,
      curPoints,
      answers,
      time,
      statsDisplayed,
    },
    dispatch,
  ] = useReducer(reducer, initalState);

  const numQuestions = questions.length;
  const numPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  const load = status === 'loading';

  function shuffleArray(array) {
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
    // Fetch data from JSON server
    function fetchData() {
      fetch(
        'https://react-quizz-rhman.netlify.app/.netlify/functions/questions'
      )
        .then(res => res.json())
        .then(data => {
          let quizData;

          // Shuffle questions if shuffle is set to 'questions' or 'both'
          if (shuffle === 'questions' || shuffle === 'both') shuffleArray(data);

          // Filter questions based on difficulty
          const easyQuestions = data.filter(q => q.points === 10);
          const mediumQuestions = data.filter(q => q.points === 20);
          const hardQuestions = data.filter(q => q.points === 30);

          // Set questions based on difficulty
          if (difficulty === 'easy') quizData = easyQuestions;

          if (difficulty === 'medium') quizData = mediumQuestions;

          if (difficulty === 'hard') quizData = hardQuestions;

          // If difficulty is mixed, set 5 questions of each difficulty
          if (difficulty === 'mixed') {
            quizData = [
              ...easyQuestions.slice(0, 5),
              ...mediumQuestions.slice(0, 5),
              ...hardQuestions.slice(0, 5),
            ];
          }

          // Shuffle options if shuffle is set to 'options' or 'both'
          if (shuffle === 'options' || shuffle === 'both') {
            quizData.forEach(q => {
              // Find the correct answer
              const correctAnswer = q.options[q.correctOption];
              // Shuffle the options
              shuffleArray(q.options);
              // Reset the correct answer
              q.correctOption = q.options.indexOf(correctAnswer);
            });
          }

          // Update state with fetched data
          dispatch({ type: 'dataRecieved', payload: quizData });
        })
        .catch(err => dispatch({ type: 'dataFailed' }));
    }

    // Do not fetch data on component mount
    if (!load) return;
    const fetchTimer = setTimeout(() => fetchData(), 500);

    return () => clearTimeout(fetchTimer);
  }, [load, difficulty, shuffle]);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {(status === 'selecting' || status === 'ready') && (
          <>
            <Intro
              status={status}
              difficulty={difficulty}
              shuffle={shuffle}
              dispatch={dispatch}
              numQuestions={numQuestions}
              statsDisplayed={statsDisplayed}
              highscores={highscores}
              takenQuiz={takenQuiz}
            />
            <Footer>
              <Button dispatch={dispatch}>
                {statsDisplayed ? 'Hide Stats' : 'Show Stats'}
              </Button>
              <Button dispatch={dispatch}>
                {status === 'selecting' ? 'Load Questions' : 'Start Quiz'}
              </Button>
            </Footer>
          </>
        )}
        {status === 'active' && (
          <>
            <Progress
              curQuest={curQuest}
              numQuest={numQuestions}
              curPoints={curPoints}
              numPoints={numPoints}
              answer={answers[curQuest]}
            />
            <Question
              question={questions[curQuest]}
              answer={answers[curQuest]}
              dispatch={dispatch}
            />
            <Footer>
              <Button dispatch={dispatch} disable={curQuest === 0}>
                Prev
              </Button>
              <Timer time={time} dispatch={dispatch} />
              <Button dispatch={dispatch} disable={answers[curQuest] === null}>
                {curQuest !== questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </Footer>
          </>
        )}
        {time < 0 && <TimeOut />}
        {status === 'finish' && (
          <>
            <Finish
              curPoints={curPoints}
              numPoints={numPoints}
              takenQuiz={takenQuiz}
              highscores={highscores}
              difficulty={difficulty}
              statsDisplayed={statsDisplayed}
            />
            <Footer>
              <Button dispatch={dispatch}>
                {statsDisplayed ? 'Hide Stats' : 'Show Stats'}
              </Button>
              <Button dispatch={dispatch}>Restart</Button>
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}
