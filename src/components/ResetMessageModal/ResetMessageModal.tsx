import React from 'react';
import { Dialog, DialogContent, Typography } from '@mui/material';

interface ResetMessageModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const ResetMessageModal: React.FC<ResetMessageModalProps> = ({ open, message, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 300 } }}>
      <DialogContent sx={{ textAlign: 'center' }}>
        <Typography variant="h6">{message}</Typography>
      </DialogContent>

    </Dialog>
  );
};

export default ResetMessageModal;