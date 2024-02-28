import Progress from './Progress';

export default function Main({
  status,
  curQuest,
  numQuest,
  curPoints,
  numPoints,
  children,
}) {
  return (
    <main className='main'>
      {status === 'active' && (
        <Progress
          curQuest={curQuest}
          numQuest={numQuest}
          curPoints={curPoints}
          numPoints={numPoints}
        />
      )}
      {children}
    </main>
  );
}
