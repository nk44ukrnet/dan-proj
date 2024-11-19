import {useSelector} from "react-redux";
import {selectorUser} from "../store/selectors.js";

export function useIsCurrentUser(userId) {
    const selUser = useSelector(selectorUser);
    return selUser?._id === userId;
}