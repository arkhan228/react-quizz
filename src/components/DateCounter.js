import { useReducer } from "react";

const initalState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action?.type) {
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "setCount":
      return { ...state, count: action.payload };
    case "reset":
      return initalState;
    default:
      throw new Error("Unknown Action");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const { count, step } = state;

  const date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "setStep", payload: +e.target.value })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: "setCount", payload: +e.target.value })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      {(count !== 0 || step !== 1) && (
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      )}
    </div>
  );
}
export default DateCounter;
