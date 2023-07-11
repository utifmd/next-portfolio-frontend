"use client"
type Props = {
    error: Error,
    reset: () => void
}
export default function ({error}: Props) {
    console.log(error.message)
    return (
        <div className="flex h-screen justify-center items-center">
            <p className="text-red-500">Server not responding</p>
        </div>
    )
}