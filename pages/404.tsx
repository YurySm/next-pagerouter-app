import {withLayout} from "@/layout/Layout";
import {Htag} from "@/components";

export function Custom404() {
    return <Htag tag='h1'>404 - Page Not Found</Htag>
}

export default withLayout(Custom404)