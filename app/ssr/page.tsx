import store from "@/store";
import {pagedFeed} from "@/actions/homeAction";
import ListView from "@/app/ssr/ListView";
import MainSSR from "@/app/ssr/MainSSR";
const educations: IEducation[] = [
    {
        id: "PID-1001",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1001",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1002",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1002",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1003",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1003",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    },
    {
        id: "PID-1004",
        fileUrl: "https://via.placeholder.com/150",
        content: "Ini content 1004",
        createdAt: "A minute ago",
        desc: "Ini description",
        imageUrl: "https://via.placeholder.com/150",
        title: "Ini Judul"
    }
]
// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
/*const DynamicStateProvider = dynamic(
    () => import('../store/StateProvider').then(module => module), {
    ssr: false
});*/
export default async function () {
    const data = await new Promise<IEducation[]>((resolve, reject) => {
        setTimeout(() => {
            resolve(educations)
        }, 2500)
    })
    store.dispatch(pagedFeed(data))
    return(
        <div>
            <MainSSR />
        </div>
    )
}