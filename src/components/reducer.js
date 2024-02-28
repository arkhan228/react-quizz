import { initalState } from './App';

export default function reducer(state, action) {
  switch (action.type) {
    case 'dataRecieved':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'started':
      return { ...state, status: 'active' };
    case 'answer':
      return {
        ...state,
        answer: action.payload.answer,
        curPoints: state.curPoints + action.payload.points,
      };
    case 'next':
      return { ...state, curQuest: state.curQuest++, answer: '' };
    case 'timer':
      return {
        ...state,
        time: state.time--,
        status: state.time < -1 ? 'finish' : 'active',
      };
    case 'finish':
      return {
        ...state,
        status: 'finish',
        highscore:
          state.curPoints > state.highscore ? state.curPoints : state.highscore,
      };
    case 'restart':
      return {
        ...initalState,
        status: 'loading',
        highscore: state.highscore,
      };
    default:
      throw new Error('Unknown Action');
  }
}
