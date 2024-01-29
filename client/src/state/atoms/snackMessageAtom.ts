import { atom } from "recoil";
import { snackType } from "../../types/types";


export const snackState = atom<snackType>({
    key : "snackState", 
    default : {
        message : "", 
        severity : "success", 
        isOpen : false
    }
})
