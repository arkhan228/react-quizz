import { useQuiz } from '../contexts/QuizContext';

export default function Progress() {
  const { curQuest, numQuestions, curPoints, numPoints, answers } = useQuiz();
  console.log(numQuestions);

  return (
    <header className='progress'>
      <progress
        value={curQuest + Number(answers[curQuest] !== null)}
        max={numQuestions}
      />
      <p>Question {`${curQuest + 1}/${numQuestions}`}</p>
      <p>{`${curPoints}/${numPoints}`} Points</p>
    </header>
  );
}
