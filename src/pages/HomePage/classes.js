import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        columnGap: theme.spacing(1.5),
    },

    city: {
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing(40),
    },

    cityWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing(3),
        margin: theme.spacing(2),
        minWidth: '320px',
        minHeight: '346px',
    },
}));

export default useStyles;
