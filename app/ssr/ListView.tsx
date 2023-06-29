import store from "@/store";

export default function ({feedValue}: {feedValue: ISchema[]}) {
    return (
        <div>
            {
                feedValue.map((education, i) => {
                    return(
                        <div key={i}>{education.id}</div>
                    )
                })
            }
        </div>
    )
}