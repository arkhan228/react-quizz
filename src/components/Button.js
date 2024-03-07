export default function Button({ dispatch, disable = false, children }) {
  return (
    <button
      className='btn'
      onClick={() =>
        dispatch({
          type: children
            .split(' ')
            .map((w, i) => (i === 0 ? w.toLowerCase() : w))
            .join(''),
        })
      }
      disabled={disable}
    >
      {children}
    </button>
  );
}
