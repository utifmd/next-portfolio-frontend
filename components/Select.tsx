export default function (props: Record<string, any>) {
    return(
        <select className="appearance-none block w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-4 focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600" {...props}>
            <option>Select {props?.label || ""}</option>
            {props?.children}
        </select>
    )
}