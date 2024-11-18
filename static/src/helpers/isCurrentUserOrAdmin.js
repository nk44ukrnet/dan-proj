import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectorUser} from "../store/selectors.js";
import selUser from "nodemailer/lib/smtp-connection/index.js";

export function isCurrentUserOrAdmin(userId) {
    const selUser = useSelector(selectorUser);
    if(selUser.isAdmin) {
        return true;
    }

    if(selUser._id === userId) {
        return true;
    }

    return false;
}