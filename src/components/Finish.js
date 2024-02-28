export default function Finish({ curPoints, numPoints, highscore, children }) {
  const percentage = ((curPoints * 100) / numPoints).toFixed(2);
  return (
    <>
      <article>
        <div className='result'>
          <p>
            <span>
              {percentage >= 80 && '🍾'}
              {percentage >= 60 && percentage < 80 && '🎉'}
              {percentage >= 40 && percentage < 60 && '😐'}
              {percentage < 40 && '🥹'}
            </span>
            {`You scored ${curPoints} out of ${numPoints} (${percentage}%)`}
          </p>
        </div>
        <p className='highscore'>{`Highscore: ${highscore}`}</p>
      </article>
      <footer>{children}</footer>
    </>
  );
}
