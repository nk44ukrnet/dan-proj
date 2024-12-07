import {useSelector} from "react-redux";
import {selectorUser} from "../store/selectors.js";

export function useIsCurrentUserOrAdmin(userId) {
    const selUser = useSelector(selectorUser);
    return selUser?.isAdmin || selUser?._id === userId;
}