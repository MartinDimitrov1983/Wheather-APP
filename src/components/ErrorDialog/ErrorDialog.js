import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const Title = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function ErrorDialog({ content, handleClose, open }) {
    return (
        <div>
            <Dialog onClose={handleClose} open={open}>
                <Title
                    onClose={handleClose}
                    sx={{ color: 'red', minWidth: '300px' }}
                >
                    An Error occured!
                </Title>
                <DialogContent dividers>
                    <Typography>{content}</Typography>
                </DialogContent>
                <DialogActions></DialogActions>
            </Dialog>
        </div>
    );
}
