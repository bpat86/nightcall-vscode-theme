import { useReducer } from "react";
import PropTypes from "prop-types";
import "./App.css";
import ButtonPanel from "./ButtonPanel";
import Display from "./Display";
import calculate from "../logic/calculate";

export default function App({ title }) {
  const [state, dispatch] = useReducer(
    (current, buttonName) => ({
      ...current,
      ...calculate(current, buttonName),
    }),
    { next: null, operation: null, total: null },
  );

  return (
    <main className="component-app">
      <h1>{title}</h1>
      <Display value={state.next ?? state.total ?? "0"} />
      <ButtonPanel clickHandler={dispatch} />
    </main>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
};
