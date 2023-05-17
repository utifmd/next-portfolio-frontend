import {Box} from "../components/sections";
import React from "react";

const Introduction = (
    {title, description, innerRef, onClick}: TBoxProps & TTileProps) =>
    <Box
        title={title}
        innerRef={innerRef}
        onClick={onClick}>
        <p className="text-base px-0 sm:px-6">{description}</p>
    </Box>
export default Introduction