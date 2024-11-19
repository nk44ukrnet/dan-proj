import {useSelector} from "react-redux";
import {selectorUser} from "../store/selectors.js";

export function useIsAdmin() {
    const selUser = useSelector(selectorUser);
    return selUser?.isAdmin;
}