import Image from "next/image";
import {useState} from "react";
import errorStatic from "../public/error.png"
import {placeholder} from "@/helpers"
export default function(props: Record<string, any>){
    const [src, setSrc] = useState(props.source)
    return(
        <Image
            sizes="100vw"
            alt={props.alt}
            src={src}
            fill={true}
            blurDataURL={placeholder}
            placeholder="blur"
            unoptimized={true}
            loader={() => props.source}
            onError={() => setSrc(errorStatic)}
            {...props}
        />
    )
}