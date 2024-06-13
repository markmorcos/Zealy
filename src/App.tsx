import React from "react";

import "./App.css";

import { reactionStore } from "./mobx/ReactionStore";
import Reactions from "./pages/Reactions";

const App = () => <Reactions reactionStore={reactionStore} />;

export default App;
