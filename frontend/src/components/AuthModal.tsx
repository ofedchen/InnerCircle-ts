import { useState } from "react";
import { Button, Drawer } from "@mui/joy";
import Signup from "./Signup";
import Login from "./Login";
import JoinCircle from "./JoinCircle";
import type { ModalType, Tier } from "../types.ts";

type AuthProps = {
  modalType: ModalType;
  buttonText?: string;
};

type MembershipProps = {
  circleName?: string;
  circleId?: number;
  userId?: string;
  userTier?: Tier;
  ucId?: number;
  handleJoin?: (chosenTier: string, ucId: number) => void;
  handleCancel?: () => void;
};

const AuthModal = ({
  modalType,
  circleName,
  circleId,
  userId,
  userTier,
  ucId,
  handleJoin,
  handleCancel,
  buttonText,
}: AuthProps & MembershipProps) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const toggleModal =
    (type: ModalType | null) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event?.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setActiveModal(type);
    };

  const closeModal = () => setActiveModal(null);
  const switchToSignup = () => setActiveModal("signup");
  const switchToLogin = () => setActiveModal("login");
  const switchToJoin = () => setActiveModal("join");

  return (
    <>
      <section data-cy="auth-modal-buttons">
        {modalType === "login" && (
          <Button
            onClick={toggleModal("login")}
            variant="outlined"
            color="primary"
          >
            LOG IN
          </Button>
        )}
        {modalType === "signup" && (
          <Button
            onClick={toggleModal("signup")}
            variant="solid"
            color="primary"
          >
            SIGN UP
          </Button>
        )}
        {modalType === "join" && (
          <Button
            onClick={userId ? toggleModal("join") : toggleModal("signup")}
            variant="solid"
            color="neutral"
          >
            {buttonText ? buttonText : "STEP INSIDE"}
          </Button>
        )}
        {modalType === "manage" && (
          <Button
            onClick={toggleModal("join")}
            variant="outlined"
            color="primary"
          >
            MANAGE MEMBERSHIP
          </Button>
        )}
      </section>

      <Drawer
        anchor="bottom"
        onClose={toggleModal(null)}
        open={activeModal === "login"}
        size="md"
      >
        <Login
          toggleClose={closeModal}
          toggleSignup={switchToSignup}
          toggleJoin={switchToJoin}
          modalType={modalType}
        />
      </Drawer>

      <Drawer
        anchor="bottom"
        onClose={toggleModal(null)}
        open={activeModal === "signup"}
        size="lg"
      >
        <Signup
          toggleClose={closeModal}
          toggleLogin={switchToLogin}
          toggleJoin={switchToJoin}
          modalType={modalType}
        />
      </Drawer>

      {(modalType === "join" || modalType === "manage") && (
        <Drawer
          anchor="bottom"
          onClose={toggleModal(null)}
          open={activeModal === "join"}
          size={modalType === "join" ? "lg" : "sm"}
        >
          <JoinCircle
            circleName={circleName}
            circleId={circleId}
            modalType={modalType}
            handleMembership={handleJoin}
            cancelMembership={handleCancel}
            userId={userId}
            userTier={userTier}
            ucId={ucId}
          />
        </Drawer>
      )}
    </>
  );
};

export default AuthModal;
