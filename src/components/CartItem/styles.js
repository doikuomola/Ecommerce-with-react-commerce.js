import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 260,
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
    cartActions: {
        justifyContent: "space-between",
    },
    buttons: {
        display: "flex",
        alignItems: "center",
    },
}));

export default useStyles;
