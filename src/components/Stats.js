function Stats({ highscores, takenQuiz }) {
  const difficulties = Object.keys(highscores);
  return (
    <div className='stats'>
      <div>
        <p>Difficulty:</p>
        {difficulties.map((d, i) => (
          <p key={i}>{d.slice(0, 1).toUpperCase() + d.slice(1)}</p>
        ))}
      </div>
      <div>
        <p>Quiz Taken:</p>
        {difficulties.map((d, i) => (
          <p key={i}>{takenQuiz[d]} times</p>
        ))}
      </div>
      <div>
        <p>Highscores:</p>
        {difficulties.map((d, i) => (
          <p key={i}>{highscores[d]} points</p>
        ))}
      </div>
    </div>
  );
}

export default Stats;
