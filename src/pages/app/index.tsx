import React from "react";
import Card from "@components/Card";

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="h-full flex flex-col items-center py-10">
      <div className="w-2/3 h-full">
        <h2 className="text-2xl font-thin text-gray-300">Overview</h2>
        <Card className="w-80">Some content</Card>
      </div>
    </div>
  );
};

export default App;
