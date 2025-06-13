import React from "react";
import FlyerCreator from "./components/FlyerCreator";

function App() {
  console.log("App render"); // Ver si App está corriendo
  return (
    <div>
      <FlyerCreator />
    </div>
  );
}

export default App;
