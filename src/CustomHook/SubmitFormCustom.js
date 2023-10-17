import { useEffect, useRef, useState } from "react"
import useDataApi from "./useDataApi";
import useHashCode from "./HashCode";
const useSubmiFormCustom = (callback) => {
    const { HashPass } = useHashCode()
    let Data = {}
    const handleSubmit = (event) => {
        let status = false
        if (event) {
            let formData = event.target.parentElement.getElementsByClassName("formInput")
            event.target.classList.add("checked")
            for (let index = 0; index < formData.length; index++) {
                if (formData[index].value) {
                    formData[index].parentElement.classList.remove("checkWrong")
                    if (formData[index].name == "Password") {
                        Data[formData[index].name] = HashPass(formData[index].value)
                    } else {
                        Data[formData[index].name] = formData[index].value

                    }
                } else {
                    formData[index].parentElement.classList.add("checkWrong")
                }

            }
            return Data
        }
    };
    return {
        handleSubmit
    };

}
export default useSubmiFormCustom