import { useQuiz } from '../contexts/QuizContext';

/**
 * Render options for a given question and handle user interaction.
 *
 * @param {object} question - the question object
 * @param {number|null} answer - the index of the selected answer, or null if no answer has been selected.
 * @param {function} dispatch - function to dispatch actions
 * @return {JSX.Element} the options UI
 */
export default function Options() {
  const { questions, answers, curQuest, dispatch } = useQuiz();
  const question = questions[curQuest];
  const answer = answers[curQuest];

  return (
    <div className='options'>
      {question.options.map((option, i) => {
        // Check if the option is correct
        const isCorrect = i === question.correctOption;
        // Check if the option has been selected
        const isAnswered = answer !== null;
        return (
          <button
            // Add the 'answer' class if the option is selected and the 'correct' or 'wrong' class if the option is correct or incorrect
            className={`btn btn-option ${
              isAnswered && (answer === i ? 'answer' : '')
            } ${isAnswered && (isCorrect ? 'correct' : 'wrong')}`}
            onClick={() =>
              dispatch({
                type: 'answer',
                payload: { answer: i, points: isCorrect ? question.points : 0 },
              })
            }
            disabled={isAnswered}
            key={i}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
