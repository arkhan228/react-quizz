import Options from './Options';

export default function Question({
  questions,
  curQuest,
  answer,
  dispatch,
  children,
}) {
  return (
    <>
      <article>
        <h4>{questions[curQuest].question}</h4>
        {questions?.length > 0 && (
          <Options
            questions={questions}
            curQuest={curQuest}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </article>
      <footer>{children}</footer>
    </>
  );
}
