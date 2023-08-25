import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        columnGap: theme.spacing(1),
    },
    toggleButtons: {
        display: 'flex',
        flexGrow: 1,
        columnGap: theme.spacing(1),
    },
}));

export default useStyles;
