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
import { useQuiz } from '../contexts/QuizContext';
import StatsButton from './StatsButton';

export default function App() {
  const { status, questions, answers, curQuest, time } = useQuiz();
  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {(status === 'selecting' || status === 'ready') && (
          <>
            <Intro />
            <Footer>
              <StatsButton />
              <Button>
                {status === 'selecting' ? 'Load Questions' : 'Start Quiz'}
              </Button>
            </Footer>
          </>
        )}
        {status === 'active' && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Button disable={curQuest === 0}>Prev</Button>
              <Timer />
              <Button disable={answers[curQuest] === null}>
                {curQuest !== questions.length - 1 ? 'Next' : 'Finish'}
              </Button>
            </Footer>
          </>
        )}
        {time < 0 && <TimeOut />}
        {status === 'finish' && (
          <>
            <Finish />
            <Footer>
              <StatsButton />
              <Button>Restart</Button>
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}
