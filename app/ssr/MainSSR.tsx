import ListView from "@/app/ssr/ListView";
import store from "@/store";

export default function MainSSR() {
    return (
        <main>
            <ListView feedValue={store.getState().home.feed.value} />
        </main>
    )
}