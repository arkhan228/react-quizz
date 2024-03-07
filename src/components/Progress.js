export default function Progress({
  curQuest,
  numQuest,
  curPoints,
  numPoints,
  answer,
}) {
  return (
    <header className='progress'>
      <progress value={curQuest + Number(answer !== null)} max={numQuest} />
      <p>Question {`${curQuest + 1}/${numQuest}`}</p>
      <p>{`${curPoints}/${numPoints}`} Points</p>
    </header>
  );
}
