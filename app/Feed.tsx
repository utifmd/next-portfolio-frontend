import React from "react";
import {useRouter} from "next/navigation";
import {EducationItem} from "./education";
import {ExperienceItem} from "./experience";

type Props = {
    feedValues: ISchema[],
    isLoading: boolean,
    isDone: boolean,
    onJumpToBox?: any,
    innerRef?: any,
    onFeedNextClicked: (length: number, i: number) => any,
    handleBoxJumper: (key: number | string) => (e: any) => any,
    onSelectItem: (i: number) => any
}
export default function Feed(
    {feedValues, innerRef, isLoading, isDone, onJumpToBox, onFeedNextClicked, handleBoxJumper, onSelectItem}: Props) {
    const router = useRouter()
    const feedLength = feedValues.length
    const handleOnSelectItem =
        (i: number, isEducation: boolean) => (e: any) => {
        e.preventDefault()
        onSelectItem(i)
        if(isEducation) {
            router.push("/education")
            return
        }
        router.push("/experience")
    }
    return (
        <div ref={innerRef} className="w-full">{feedValues.map((item, i) => {
            const isTheLastOne = (i + 1) >= feedLength
            let component = <EducationItem
                key={i}
                index={i}
                innerRef={handleBoxJumper(i)}
                education={item as IEducation}
                isLoading={isLoading && isTheLastOne}
                onTargetIconClick={handleOnSelectItem(i, true)}
                onNextClick={onFeedNextClicked(feedLength, i)}/>

            if(!("content" in item)) component = <ExperienceItem
                key={i}
                index={i}
                innerRef={handleBoxJumper(i)}
                experience={item as IExperience}
                isLoading={isLoading && isTheLastOne}
                onNextClick={onFeedNextClicked(feedLength, i)}
                onTargetIconClick={handleOnSelectItem(i, false)}
                onBottomClick={isDone && isTheLastOne && onJumpToBox("base")}/>

            return component})}
        </div>
    )
}