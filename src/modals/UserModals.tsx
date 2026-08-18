import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

interface UserModalsProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

function UserModals({ isOpen, onClose, onConfirm, text }: UserModalsProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="user-edit-confirmation-modal"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          outline: "none",
          boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
        }}
        className="modal-box"
      >
        <p>{text}</p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "1.3rem",
          }}
        >
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            style={{ marginLeft: "1%" }}
            variant="contained"
            color="primary"
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserModals;