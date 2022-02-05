// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
    Typography,
    Grid,
    InputLabel,
    Select,
    MenuItem,
    Button,
    TextField,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

const AddressForm = ({ checkoutToken, nextStep, setShippingData }) => {
    const methods = useForm();
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState("");
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState("");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [address1, setAddress1] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [paystackRef, setPaystackRef] = useState();

    const fetchShippingCountries = async (checkoutTokenId) => {
        const { countries } =
            await commerce.services.localeListShippingCountries(
                checkoutTokenId
            );

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubDivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(
            countryCode
        );
        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (
        checkoutTokenId,
        country,
        region = null
    ) => {
        const options = await commerce.checkout.getShippingOptions(
            checkoutTokenId,
            { country, region }
        );
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, []);

    useEffect(() => {
        if (shippingCountry) fetchSubDivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision)
            fetchShippingOptions(
                checkoutToken.id,
                shippingCountry,
                shippingSubdivision
            );
    }, [shippingSubdivision]);

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({
        id: code,
        label: name,
    }));
    const subdivisions = Object.entries(shippingSubdivisions).map(
        ([code, name]) => ({
            id: code,
            label: name,
        })
    );

    const options = shippingOptions.map((sO) => ({
        id: sO.id,
        label: `${sO.description}-(${sO.price.formatted_with_symbol})`,
    }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setShippingData({
            firstname,
            lastname,
            email,
            address1,
            city,
            zip,
            shippingCountry,
            shippingSubdivision,
            shippingOption,
        });
        nextStep();
    };

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <input
                        id="paystackReference"
                        value={paystackRef}
                        name="paystackReference"
                        type="hidden"
                    />
                    <TextField
                        name="firstname"
                        label="First Name"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                    <TextField
                        name="lastName"
                        label="Last name"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                    <TextField
                        name="address1"
                        label="Address line 1"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        name="city"
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <TextField
                        name="zip"
                        label="Zip / Postal code"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                    />
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select
                            value={shippingCountry}
                            fullWidth
                            onChange={(e) => setShippingCountry(e.target.value)}
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping SubDivision</InputLabel>
                        <Select
                            value={shippingSubdivision}
                            fullWidth
                            onChange={(e) =>
                                setShippingSubdivision(e.target.value)
                            }
                        >
                            {subdivisions.map((subdivision) => (
                                <MenuItem
                                    key={subdivision.id}
                                    value={subdivision.id}
                                >
                                    {subdivision.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Options</InputLabel>
                        <Select
                            value={shippingOption}
                            fullWidth
                            onChange={(e) => shippingOption(e.target.value)}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <br />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Button component={Link} to="/cart" variant="outlined">
                        Back to Cart
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Next
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AddressForm;
