import { create } from "zustand"; // crear estados globales y actions
import zukeeper from 'zukeeper' //poder usar la extension de chrome para zustand("zustand dev-tools")
import axios from "axios";
import React from "react";

const sessionStorage = window.sessionStorage;

export const PurchaseStore = create(zukeeper((set) => ({
    order: {},
    

    CreatedOrder: async (customerData) => {
        try {
          const response = await axios.post("https://ge3k-server.onrender.com/stripe-session", customerData);
          if (response.status === 200) { 
            const { data } = response;
            const orderId = data.stripeOrderId;
            //------
            sessionStorage.setItem( "propiedad" ,  orderId );
            //------
            console.log(data);
            set((state) => ({
              ...state,
              order: data
            }))
          
            if (response && response.data && response.data.url) {
             
              window.open(response.data.url, '_blank');
             
              // window.location.href = response.data.url;
            } else {
              console.error(
                "Could not get redirect URL"
              );
            }
            return response;
          } else {
            console.error('Could not create order:', response);
            return null;
          }
        } catch (error) {
          console.error("Error creating order:", error);
          return null;
        }
    },

    
      
})));



window.store = PurchaseStore;