import React, { Fragment } from "react";
import "./App.css";
import ContasPagas from "./components/AnaliseModules/ContasPagas";
import DispatchContext from "./DispatchContext";
import StateContext from "./StateContext";
import { useImmerReducer } from "use-immer";

import CashFlow from "./components/AnaliseModules/CashFlow";
import ContasPagar from "./components/AnaliseModules/ContasPagar";
import ContasReceber from "./components/AnaliseModules/ContasReceber";
// import DRE from "./components/AnaliseModules/DRE";
import VendasDados from "./components/AnaliseModules/VendasDados";
import BalanceTest from "./components/BalanceTest";

function App() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  return (
    <Fragment>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <div className="container">
            {/* <BalanceSheet /> */}
            <BalanceTest />
            <CashFlow />
            <VendasDados />
            <ContasPagar />
            <ContasReceber />
            {/* <DRE /> */}
            <ContasPagas />
          </div>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </Fragment>
  );
}

export default App;
