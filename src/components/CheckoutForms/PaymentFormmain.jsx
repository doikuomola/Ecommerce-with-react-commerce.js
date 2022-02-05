// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Divider, Typography, Button } from "@material-ui/core";
import { Review } from "../index";
import { PaystackButton } from "react-paystack";
import { usePaystackPayment } from "react-paystack";
import useStyles from "./styles.js";

const PaymentForm = ({
    checkoutToken,
    backStep,
    setShipppingData,
    shippingData,
    onCaptureCheckout,
    nextStep,
}) => {

    const classes = useStyles();

    

    const config = {
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
        line_items: checkoutToken.live.line_items,
        email: shippingData.email,
        amount: checkoutToken.live.subtotal.raw * 100,
        customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastName,
            email: shippingData.email,
        },
        shipping: {
            name: "International",
            street: shippingData.address1,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        ref: "" + Math.floor(Math.random() * 1000000000 + 1),
        payment: {
            gateway: "test_gateway",
            card: {
                number: "4242424242424242",
                expiry_month: "02",
                expiry_year: "24",
                cvc: "123",
                postal_zip_code: "94107",
            },
        },
        // payment: {
        //     gateway: "paystack",
        // },
    };
    const onSuccess = (reference) => {
        console.log(reference);
    };

    const onClose = () => {
        console.log("closed");
    };

   


    const handleSubmit = async (event, elements, paystack) => {
        event.preventDefault();

        if (!paystack || !elements) return;

        const orderData = {
            line_items: checkoutToken.live.line_items,
            customer: {
                firstname: shippingData.firstName,
                lastname: shippingData.lastName,
                email: shippingData.email,
            },
            shipping: {
                name: "International",
                street: shippingData.address1,
                town_city: shippingData.city,
                county_state: shippingData.shippingSubdivision,
                postal_zip_code: shippingData.zip,
                country: shippingData.shippingCountry,
            },
            fulfillment: { shipping_method: shippingData.shippingOption },
            payment: {
                gateway: "paystack",
                // stripe: {
                //     payment_method_id: paymentMethod.id,
                // },
            },
        };

        onCaptureCheckout(checkoutToken.id, orderData);

        nextStep();
    };

     const PaystackHookExample = () => {
         const initializePayment = usePaystackPayment(config);
         return (
             <div>
                 <Button
                     variant="contained"
                     color="primary"
                     onClick={() => {
                         initializePayment(onSuccess, onClose);
                     }}
                 >
                     {`Pay ${checkoutToken.live.subtotal.formatted_with_symbol}`}
                 </Button>
             </div>
         );
     };

    return (
        <>
            <Review checkoutToken={checkoutToken} />
            <Divider />
            <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
                Payment method
            </Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={backStep}>Back</Button>
                <PaystackHookExample onClick={handleSubmit} />
            </div>
        </>
    );
};

export default PaymentForm;
