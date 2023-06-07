import {Box} from "@/components/sections";
import React from "react";

const Introduction = (
    {title, description, innerRef, onNextClick}: TBoxProps & TTileProps) =>
    <Box
        title={title}
        innerRef={innerRef}
        onNextClick={onNextClick}>
        <p className="text-base px-0 sm:px-6">{description}</p>
    </Box>
export default Introduction