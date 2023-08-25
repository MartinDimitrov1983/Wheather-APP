import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    cityWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: theme.spacing(3),
        margin: theme.spacing(2),
    },
    loading: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '146px',
    },
}));

export default useStyles;
