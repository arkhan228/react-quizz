export default function Progress({ curQuest, numQuest, curPoints, numPoints }) {
  return (
    <header className='progress'>
      <progress value={curQuest + 1} min={1} max={numQuest} />
      <p>Question {`${curQuest + 1}/${numQuest}`}</p>
      <p>{`${curPoints}/${numPoints}`} Points</p>
    </header>
  );
}
