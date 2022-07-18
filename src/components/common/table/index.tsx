import React from "react";
import clsx from "clsx";

interface DataTableProps {
  data: Record<string, unknown>[];
  headers: {title: string; value: string}[];
  setSelected?: Function;
  custom?: Record<string, React.FunctionComponent<Record<string, unknown>>>;
  text?: string;
  classes?: Partial<Record<"root", string>>;
}

const DataTable: React.FunctionComponent<DataTableProps> = (props) => {
  const {data, headers, text, setSelected, custom, classes} = props;
  const selectRow = (row: any) => {
    setSelected && setSelected(row);
  };

  const renderCustom = (head: {value: string}, args: any) =>
    custom && typeof custom[head.value] === "function"
      ? custom[head.value](args)
      : args[head.value];

  return (
    <>
      <div className={clsx("text-white rounded-lg overflow-hidden", classes?.root)}>
        <table className="text-left w-full bg-gray-800/40">
          <thead className="flex text-white w-full">
            <tr className="flex w-full mb-4">
              {headers.map((head: any, idx: number) => {
                return (
                  <th key={idx} className="p-4 w-1/4">
                    {head.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="flex flex-col items-center justify-between overflow-y-scroll max-h-80 w-full">
            {data.map((row: any, idx: number) => (
              <tr
                key={idx}
                className={`flex w-full border-t border-gray-800 ${setSelected && "cursor-pointer"
                  }`}
                onClick={() => {
                  selectRow(row);
                }}
              >
                {headers.map((head: any, index: number) => (
                  <td
                    className="p-4 w-1/4"
                    key={index}
                    onClick={() => head.onClick && head.onClick(row)}
                  >
                    {renderCustom(head, row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataTable;
