import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);
    const [promoList, setPromoList] = useState([]);
    const [promoCode, setPromoCode] = useState(null); // State to store the applied promo code
    const [userId, setUserId] = useState("");

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            await fetchPromoCodes();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                try {
                    const response = await axios.get(`${url}/api/user/getuser`, {
                        headers: { Authorization: storedToken },
                    });
                    setUserId(response.data.user._id);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                }
            }
        }
        loadData();
    }, []);

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    };

    const fetchPromoCodes = async () => {
        try {
            const response = await axios.get(url + '/api/promo/promocodes');
            setPromoList(response.data);
        } catch (error) {
            console.error("Error fetching promo codes:", error);
        }
    };

    const promotion = () => {
        let discount = 0;
        if (promoCode) {
            const promo = promoList.find(p => p.promocode === promoCode);
            if (promo) {
                discount = promo.promodiscount;
            }
        }
        return discount;
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = food_list.find((product) => product._id === item);
                totalAmount += iteminfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
        }
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        removeFromCart,
        addToCart,
        getTotalCartAmount,
        promotion,
        url,
        token,
        setToken,
        userId,
        promoCode,
        setPromoCode, // Include promoCode and setPromoCode in context value
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
