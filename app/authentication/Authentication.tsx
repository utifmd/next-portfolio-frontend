import {useAppSelector} from "@/app/hooks";

type Props = {
    children: React.ReactNode
}
export function Authenticated({children}: Props){
    const token = useAppSelector(
        ({authentication}) => authentication.token
    )
    if (typeof token === "undefined") return <></>
    return <>{children}</>
}
export function UnAuthenticated({children}: Props){
    const token = useAppSelector(
        ({authentication}) => authentication.token
    )
    if (typeof token !== "undefined") return <></>
    return <>{children}</>
}