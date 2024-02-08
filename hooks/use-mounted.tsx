import * as React from "react";

export const useMounted = () => {
    const [isMounted, setIsMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return { isMounted };
};
