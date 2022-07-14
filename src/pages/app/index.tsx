import React from "react";
import Card from "@components/common/card";
import Table from "@components/common/table";
import Chart from "@components/common/chart";

import {MOCK_CHART} from "@helpers/mocks";

const MINI_DAO_HEADERS = [
  {title: "Address", value: "dao"},
  {title: "Amount", value: "amount"},
  {title: "Type", value: "type"},
  {title: "Creation Date", value: "creation_date"},
  {title: "Yes/No (Total)", value: "total"},
];

const mockData = [
  {
    dao: "some value",
    amount: "some value",
    type: "some value",
    creation_date: "some value",
    total: "some value",
  },
  {
    dao: "some value",
    amount: "some value",
    type: "some value",
    creation_date: "some value",
    total: "some value",
  },
  {
    dao: "some value",
    amount: "some value",
    type: "some value",
    creation_date: "some value",
    total: "some value",
  },
  {
    dao: "some value",
    amount: "some value",
    type: "some value",
    creation_date: "some value",
    total: "some value",
  },
];

const App: React.FunctionComponent<{}> = () => {
  return (
    <div className="h-full flex flex-col items-center py-10">
      <div className="w-2/3 h-full">
        <h2 className="text-2xl font-thin text-gray-300 mb-5">Overview</h2>
        <div className="flex gap-10">
          <Card className="w-1/2 h-80">
            <h3 className="text-xl">Chart1</h3>
            <Chart data={MOCK_CHART} />
          </Card>
          <Card className="w-1/2 h-80">
            <h3 className="text-xl">Chart1</h3>
            <Chart data={MOCK_CHART} />
          </Card>
        </div>
        <Table classes={{root: "mt-10"}} data={mockData} headers={MINI_DAO_HEADERS} />
      </div>
    </div>
  );
};

export default App;
