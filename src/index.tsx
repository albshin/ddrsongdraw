import 'regenerator-runtime/runtime';
import 'core-js/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { enableMapSet } from 'immer';

enableMapSet();

ReactDOM.render(<App />, document.getElementById('app'));
