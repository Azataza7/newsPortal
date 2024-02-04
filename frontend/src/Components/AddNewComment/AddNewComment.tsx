import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../app/hooks';
import { onCreatingComment } from '../../store/News/NewsSlice';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  open: boolean;
  onClose: () => void;
  author: string;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  commentText: string;
  setCommentText: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: () => void;
}

const AddNewComment: React.FC<BasicModalProps> = ({
  open,
  onClose,
  author,
  setAuthor,
  commentText,
  setCommentText,
  handleSubmit,
}) => {
  const onSendingComment: boolean = useAppSelector(onCreatingComment);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Add Comment
        </Typography>
        <TextField
          label="Author (not required)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          disabled={onSendingComment}
          variant="contained"
          onClick={handleSubmit}
          type="submit"
        >
          {onSendingComment ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Modal>
  );
};

export default AddNewComment;
