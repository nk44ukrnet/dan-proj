import {useSelector} from "react-redux";
import {selectorUser} from "../store/selectors.js";

export function useIsCurrentUserOrAdmin(userId) {
    const selUser = useSelector(selectorUser);

    console.log('userID:', userId);
    console.log('selUser._id:', selUser?._id);

    return selUser?.isAdmin || selUser?._id === userId;
}