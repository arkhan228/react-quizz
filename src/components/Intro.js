export default function Intro({ dispatch, numQuestions }) {
  return (
    <article className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3> {numQuestions} questions to test your react mastery</h3>
      <button className='btn' onClick={() => dispatch({ type: 'started' })}>
        Let's start!
      </button>
    </article>
  );
}
