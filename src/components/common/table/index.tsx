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
        <table className="text-left w-full bg-gray-900/75">
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
          <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll max-h-80 w-full">
            {data.map((row: any, idx: number) => (
              <tr
                key={idx}
                className="flex w-full border-t border-gray-800"
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
      <div className="w-full text-white flex flex-row justify-between mt-5">
        {text && <p>{text}</p>}
        {data.length > 10 ? <div>pages</div> : ""}
      </div>
    </>
  );
};

export default DataTable;
