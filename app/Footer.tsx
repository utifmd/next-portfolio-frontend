import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFile} from "@fortawesome/free-solid-svg-icons";
import {
    faLinkedin,
    faMedium,
    faGithub,
    faStackOverflow,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";

const Footer = ({urls}: { urls: IProfileLinks }) =>
    <footer className="flex flex-wrap text-center justify-center items-center pt-24 px-8 pb-8">
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.linkedin} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faLinkedin} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.medium} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faMedium} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.github} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faGithub} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.stackOverflow} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faStackOverflow} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.twitter} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faTwitter} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.instagram} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faInstagram} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.email} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faEnvelope} size={"xl"}/>
        </Link>
        <Link className="m-1.5 cursor-pointer hover:opacity-70" href={urls.resume} target={"_blank"}>
            <FontAwesomeIcon color={"#059669"} icon={faFile} size={"xl"}/>
        </Link>
    </footer>

export default Footer