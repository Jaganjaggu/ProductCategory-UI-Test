import { makeStyles } from "@fluentui/react-components";

export const useStyles = makeStyles({
    tableBody: {
        margin: '30px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    headerCell: {
        paddingLeft: '15px',
        backgroundColor: '#e2e1e1',
        fontSize: '20px',
    },
    tableContent: {
        paddingLeft: '15px',
    },
    heading: {
        fontSize: '20px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textAlign: 'center',

    },
    addButton: {
        display: "flex",
        justifyContent: 'end',
        marginRight: '30px'
    },
    root: {
        // Stack the label above the field with a gap
        display: "grid",
        gridTemplateRows: "repeat(1fr)",
        justifyItems: "start",
        gap: "2px",
        maxWidth: "400px",
    },

})