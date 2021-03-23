import React, { useReducer } from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import { Context, reducer, initialState } from './context';
import usePersistedState from './utils/usePersistedState';
import Router from './Router';
import light from './styles/themes/light';
import dark from './styles/themes/dark';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle/>

      <Context.Provider value={{state, dispatch}}>
        <Loader/>
        <Header toggleTheme={toggleTheme}/>

        <Main>
          <Router/>
        </Main>
      </Context.Provider>
    </ThemeProvider>
  );
}

export default App;
