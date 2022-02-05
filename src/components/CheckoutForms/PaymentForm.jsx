// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Divider, Typography, Button } from "@material-ui/core";
import { Review } from "../index";
import { PaystackButton } from "react-paystack";
import { PaystackConsumer } from "react-paystack";
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
        reference: new Date().getTime().toString(),
        firstname: shippingData.firstname,
        lastname: shippingData.lastname,
        email: shippingData.email,
        amount: checkoutToken.live.subtotal.raw * 100,
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    };
    const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
            firstname: config.firstname,
            lastname: config.lastname,
            email: config.email,
        },
        shipping: {
            name: "John Doe",
            street: "123 Fake St",
            town_city: "San Francisco",
            county_state: "US-CA",
            postal_zip_code: "94103",
            country: "US",
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        billing: {
            name: "International",
            street: shippingData.address1,
            town_city: shippingData.city,
            county_state: shippingData.shippingSubdivision,
            postal_zip_code: shippingData.zip,
            country: shippingData.shippingCountry,
        },
        payment: {
            gateway: "paystack",
            paystack: {
                token: "irh98298g49",
                reference: config.reference,
            },
        },
    };

    // you can call this function anything
    const handleSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
        nextStep();
        onCaptureCheckout(checkoutToken.id, orderData);
    };

    // you can call this function anything
    const handleClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log("closed");
    };

    const componentProps = {
        ...config,
        text: "Paystack Button Implementation",
        onSuccess: (reference) => handleSuccess(reference),
        onClose: handleClose,
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
                <PaystackConsumer {...componentProps}>
                    {({ initializePayment }) => (
                        <button
                            onClick={() =>
                                initializePayment(handleSuccess, handleClose)
                            }
                        >
                            {`Pay ${checkoutToken.live.subtotal.formatted_with_symbol}`}
                        </button>
                    )}
                </PaystackConsumer>
            </div>
        </>
    );
};

export default PaymentForm;
