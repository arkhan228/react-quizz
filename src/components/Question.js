import Options from './Options';

/**
 * Renders a question component with the provided question, answer, and dispatch function.
 *
 * @param {object} question - the question object
 * @param {number|null} answer - The index of the selected answer, or null if no answer has been selected.
 * @param {function} dispatch - the dispatch function
 * @return {JSX.Element} the rendered question component
 */
export default function Question({ question, answer, dispatch }) {
  return (
    <>
      <article>
        <div className='question'>
          <h4>{question.question}</h4>
          <p>{question.points} Points</p>
        </div>
        <Options question={question} answer={answer} dispatch={dispatch} />
      </article>
    </>
  );
}
