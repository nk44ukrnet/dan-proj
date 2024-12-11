import {useSelector} from "react-redux";
import {selectorUser} from "../store/selectors.js";

export function useIsCurrentUserOrAdmin(userId) {
    const selUser = useSelector(selectorUser);
    if (!selUser) {
        return false; // Return false if selUser is not available
    }
    return selUser?.isAdmin || selUser?._id === userId;
}