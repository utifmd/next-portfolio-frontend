import {useAppSelector} from "@/app/hooks";

type Props = {
    fallback?: React.ReactNode,
    children: React.ReactNode
}
export function Authenticated({fallback, children}: Props){
    const token = useAppSelector(
        ({authentication}) => authentication.token
    )
    if (typeof token === "undefined") return <>{fallback}</>
    return <>{children}</>
}
export function UnAuthenticated({fallback, children}: Props){
    const token = useAppSelector(
        ({authentication}) => authentication.token
    )
    if (typeof token !== "undefined") return <>{fallback}</>
    return <>{children}</>
}