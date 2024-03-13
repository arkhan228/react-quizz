import { useQuiz } from '../contexts/QuizContext';

export default function Progress() {
  const { curQuest, numQuestions, curPoints, numPoints, answer } = useQuiz();
  console.log(numQuestions);

  return (
    <header className='progress'>
      <progress value={curQuest + Number(answer !== null)} max={numQuestions} />
      <p>Question {`${curQuest + 1}/${numQuestions}`}</p>
      <p>{`${curPoints}/${numPoints}`} Points</p>
    </header>
  );
}
