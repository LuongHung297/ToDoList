import { useEffect, useRef, useState } from "react"
import useDataApi from "./useDataApi";

const useSubmiFormCustom = (callback) => {
    let Data = {}
    const handleSubmit = (event) => {
        let status = false
        if (event) {
            let formData = event.target.parentElement.getElementsByClassName("formInput")
            for (let index = 0; index < formData.length; index++) {
                Data[formData[index].name] = formData[index].value
            }
            return Data
        }
    };
    return {
        handleSubmit
    };

}
export default useSubmiFormCustom