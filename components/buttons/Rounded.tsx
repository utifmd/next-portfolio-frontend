type Props = {
    label: string,
    onClick: (e: any) => void
}
export default function({label, onClick}: Props) {
    return (
        <div
            className="rounded-full ring-1 ring-gray-900/5 h-20 w-20 px-2 m-1 flex items-center justify-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-800 cursor-pointer text-[11px] uppercase text-green-600 font-medium"
            onClick={onClick}>
            {label}
        </div>
    )
}