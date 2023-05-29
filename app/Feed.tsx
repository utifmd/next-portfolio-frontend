import {EducationItem} from "./education";
import {ExperienceItem} from "./experience";
import React from "react";

type Props = {
    feedValues: ISchema[],
    isLoading: boolean,
    isDone: boolean,
    onJumpToBox?: any,
    innerRef?: any,
    onFeedNextClicked: (length: number, i: number) => any,
    handleBoxJumper: (key: number | string) => (e: any) => any,
}
export default function Feed({feedValues, innerRef, isLoading, isDone, onJumpToBox, onFeedNextClicked, handleBoxJumper}: Props) {
    const feedLength = feedValues.length

    return (
        <div ref={innerRef} className="w-full">{feedValues.map((item, i) => {
            const isTheLastOne = (i + 1) >= feedLength
            let component = <EducationItem
                key={i}
                innerRef={handleBoxJumper(i)}
                education={item as IEducation}
                isLoading={isLoading && isTheLastOne}
                onNextClick={onFeedNextClicked(feedLength, i)}/>

            if(!("content" in item)) component = <ExperienceItem
                key={i}
                innerRef={handleBoxJumper(i)}
                experience={item as IExperience}
                isLoading={isLoading && isTheLastOne}
                onNextClick={onFeedNextClicked(feedLength, i)}
                onBottomClick={isDone && isTheLastOne && onJumpToBox("base")}/>

            return component})}
        </div>
    )
}