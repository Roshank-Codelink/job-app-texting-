import { customFetch  }from "@/api_config/apiconfig";
import { EmployerCustomeridResponseType, PaymentResponseType, VerifyPaymentResponseType } from "./type";


export const EmployerCustomerid = async(email:string,name:string)=>{
    const response = await customFetch<EmployerCustomeridResponseType>({
        url: "/create-stripe-customerid",
        method: 'POST',
        body: {
            email,
            name,
        }
    });
    return response;
}




export const EmployerpaymentCheckout = async(userId:string,productId:string,customerId:string) => {
    const response = await customFetch<PaymentResponseType>({
        url: "/create-checkout-payment",
        method: 'POST',
        body: {
            userId,
            productId,
            customerId,
        }
    });
    return response;
}

export const VerifyPaymentApi = async(sessionId:string) => {
    const response = await customFetch<VerifyPaymentResponseType>({
        url: "/verify-payment",
        method: 'POST',
        body: {
            sessionId
        }
    });
    return response;
}