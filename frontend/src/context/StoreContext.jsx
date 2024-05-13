import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreConstextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([]);
    const [promotionList, setPromotionList] = useState([]);

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
        console.log(response);
    }

    const fetchPromotionList = async () => {
        const response = await axios.get(url + "/api/promotion/listpromotion");
        if (response.data.success) {
            setPromotionList(response.data.data);
        } else {
            console.error("Error fetching promotion list");
        }
    };

    const promotion = () => {
        let discount = 0;
        for (const item in cartItems){
            console.log(item);
            if(cartItems[item] > 0){
                
            }
        }
        return discount;
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        for (const item in cartItems){
            
            if(cartItems[item] > 0){
                let iteminfo = food_list.find((product) => product._id === item);
                totalAmount += iteminfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const addToCart = async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev) =>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }


    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() =>{
        async function loadData(){
            await fetchFoodList();
            await fetchPromotionList();
            if(localStorage.getItem("token")){
               setToken(localStorage.getItem("token"));
               await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    return(

        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default  StoreConstextProvider