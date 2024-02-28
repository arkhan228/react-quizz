export default function NextButton({ dispatch, children }) {
  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: children.toLowerCase() })}
    >
      {children}
    </button>
  );
}
