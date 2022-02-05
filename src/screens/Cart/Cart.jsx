// @ts-nocheck
import React from "react";
import { Container, Typography, Grid, Button } from "@material-ui/core";
import useStyles from "./styles.js";
import CartItem from "../../components/CartItem/CartItem.js";
import { Link } from "react-router-dom";

const Cart = ({
    cart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
}) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no item in your shopping cart,
            <Link to="/" className={classes.link}>
                start adding some!
            </Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        {/* <div>{item.name}</div> */}
                        <CartItem
                            item={item}
                            onUpdateCartQty={handleUpdateCartQty}
                            onRemoveFromCart={handleRemoveFromCart}
                        />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        className={classes.emptyButton}
                        type="button"
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={handleEmptyCart}
                    >
                        Empty Cart
                    </Button>
                    <Button
                        className={classes.checkoutButton}
                        type="button"
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to='/checkout'
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return "loading...";
    return (
        <Container>
            <div className={classes.toolbar}></div>
            <Typography variant="h5">Your shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    );
};

export default Cart;
