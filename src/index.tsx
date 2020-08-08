import 'regenerator-runtime/runtime';
import 'core-js/stable';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { enableMapSet } from 'immer';

enableMapSet();
OfflinePluginRuntime.install();

ReactDOM.render(<App />, document.getElementById('app'));
