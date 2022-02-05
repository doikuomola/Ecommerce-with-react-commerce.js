import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: "70%",
    },
    media: {
        height: 0,
        paddingTop: "56.25%",
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    cardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
});

export default useStyles;
