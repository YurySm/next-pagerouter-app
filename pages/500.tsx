import {withLayout} from "@/layout/Layout";
import {Htag} from "@/components";

function Custom500() {
    return <Htag tag='h1'>500 - Server-side error occurred</Htag>
}

export default withLayout(Custom500)