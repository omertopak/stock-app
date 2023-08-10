import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchFail, fetchStart, loginSuccess } from "../features/authSlice"

// login islemi yapacak fonksiyon


//user data login pagedeki values prop undan geldi
export const login = async(userData)=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const BASE_URL = "https://10248.fullstack.clarusway.com"
    

    dispatch(fetchStart())
    try {
        //url ve gonderilecek data
        await axios.post(`${BASE_URL}/account/auth/login/`,userData)
        //console.log(data);
        dispatch(loginSuccess(data))
        toastSuccessNotify("login islemi basarili")
        //bir hook sadece bir react componentinde ve bir custom hook icerisinde cagirilabilir. js icerisinde cagirilamaz
        navigate("stock")

        //cozum nedir? burayi bir komponent yapmaliyiz.
    } catch (error) {
        console.log(error);
        Dispatch(fetchFail())
    }
}

//? Bir hook sadece bir react component ve bir custom hook icersinde cagrilabilir. Bir Js fonksiyonu icerisinde hook cagiralamaz.
//BURADA JSX FONKSIYONLARI KULLANILMADIGI ICIN BURADA CUSTOMHOOK YAZARAK YAZILABILIR HALE GETIRMEMIZ LAZIM.
//VITE DE .ENV NASIL TANIMLANIR => https://vitejs.dev/guide/env-and-mode.html
// https://react.dev/learn/reusing-logic-with-custom-hooks

//AXIOS INSTANCE NASIL KULLANILIR => https://axios-http.com/docs/instance
