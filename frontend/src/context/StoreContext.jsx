import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreConstextProvider = (props)=>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    const [userId, setUserId] = useState(""); // Add this line to create a state for userId
    const [food_list,setFoodList] = useState([])

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

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItems(response.data.cartData);
    }

    useEffect(() =>{
        async function loadData(){
            await fetchFoodList()
            const storedToken = localStorage.getItem("token");
            if(storedToken){
               setToken(storedToken);
               await loadCartData(storedToken);

               // Fetch user profile data to get userId
               try {
                 const response = await axios.get(`${url}/api/user/getuser`, {
                   headers: {
                     Authorization: storedToken,
                   },
                 });
                 setUserId(response.data.user._id); // Here you are setting the userId state
               } catch (error) {
                 console.error("Error fetching user profile:", error);
               }
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
        setToken,
        userId, // Include userId in context value
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default  StoreConstextProvider
