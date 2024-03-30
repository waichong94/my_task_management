import PrimaryButton from "./PrimaryButton";

export default function Table({ items, columns, primary, action, highlight={}}) {
    return (
        <div className="relative overflow-x-auto border shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {primary && (<th scope="col" className="px-6 py-3">{primary}</th>)}
                    {columns.map((column) =>
                        <th key={column['name']} scope="col" className="px-6 py-3">{column['name'].replace("_", " ")}</th>
                    )}
                    {action && (<th scope="col" className="px-6 py-3">Action</th>)}
                </tr>
                </thead>
                <tbody>
                {
                (items === null || items.length === 0) ?
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            No Data Found
                        </th>
                    </tr>
                :
                items.map((item, index) =>
                    <tr key={index} className={`${Object.keys(highlight).length != 0 ? highlight.valueColor[item[highlight.column]] : ""} border-b dark:bg-gray-900 dark:border-gray-700`}>
                        {item.id && (<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            #{item.id}
                        </th>)}
                        {columns.map((column, i) =>
                            <td key={i} className={`px-6 py-4 text-gray-900 dark:text-white
                            ${(column.css !== "" && typeof column.css[item[column.name]] !== "undefined") ? column.css[item[column.name]] : column.css} `}>
                                {item[column.name]}
                            </td>
                        )}
                        <td className="px-6 py-4">
                            {action && (
                                action.map((act, i) =>
                                <a key={i} href={route(act.route, item.id)}><PrimaryButton className="bg-blue-800 m-1">
                                {act.label}
                                </PrimaryButton></a>
                                )
                            )}
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}