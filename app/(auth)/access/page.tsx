import { Access } from "./client";
import { Suspense } from "react";
const Page = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Access />
        </Suspense>
    );
};

export default Page;