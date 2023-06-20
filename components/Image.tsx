import Image from "next/image";
import {useState} from "react";
import errorStatic from "../public/error.png"
export default function(props: Record<string, any>){
    const [src, setSrc] = useState(props.src)
    return(
        <Image
            sizes="100vw"
            placeholder="blur"
            alt={props.alt}
            src={src}
            fill={true}
            unoptimized={true}
            blurDataURL={process.env.NEXT_PUBLIC_BASE_URL+'/placeholder.png'}
            loader={() => props.src}
            onError={() => {
                console.log("image.tsx", "onError trigger")
                setSrc(errorStatic)
            }}
            {...props}
        />
    )
}