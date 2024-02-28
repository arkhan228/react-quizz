export default function Options({ questions, curQuest, answer, dispatch }) {
  return (
    <div className='options'>
      {questions[curQuest].options.map((option, i) => (
        <Option
          option={option}
          answer={answer}
          points={questions[curQuest].points}
          dispatch={dispatch}
          i={i}
          correct={questions[curQuest].correctOption}
          key={i}
        />
      ))}
    </div>
  );
}

function Option({ option, answer, points, dispatch, i, correct }) {
  const isCorrect = i === correct;

  function handleOnClick() {
    dispatch({
      type: 'answer',
      payload: { answer: `${i}`, points: isCorrect ? points : 0 },
    });
  }

  return (
    <button
      className={`btn btn-option ${answer && (+answer === i ? 'answer' : '')} ${
        answer && (isCorrect ? 'correct' : 'wrong')
      }`}
      onClick={handleOnClick}
      disabled={answer}
    >
      {option}
    </button>
  );
}
