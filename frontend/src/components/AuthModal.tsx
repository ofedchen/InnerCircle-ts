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
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [signUpOpen, setSignupOpen] = useState<boolean>(false);
  const [joinOpen, setJoinOpen] = useState<boolean>(false);

  const hasMembershipProps =
    circleName &&
    circleId &&
    userId &&
    userTier !== undefined &&
    ucId !== undefined &&
    handleJoin &&
    handleCancel;

  const toggleLoginDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event?.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setLoginOpen(inOpen);
    };

  const toggleSignupDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event?.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setSignupOpen(inOpen);
    };

  const toggleJoinDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event?.type === "keydown" &&
        "key" in event &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setJoinOpen(inOpen);
    };

  const closeSignup = () => setSignupOpen(false);
  const closeLogin = () => setLoginOpen(false);

  const switchToSignup = () => {
    setLoginOpen(false);
    setSignupOpen(true);
  };

  const switchToLogin = () => {
    setSignupOpen(false);
    setLoginOpen(true);
  };

  const switchToJoin = () => {
    setLoginOpen(false);
    setJoinOpen(true);
  };

  return (
    <section>
      {modalType === "login" && (
        <Button
          onClick={toggleLoginDrawer(true)}
          variant="outlined"
          color="primary"
        >
          LOG IN
        </Button>
      )}
      {modalType === "signup" && (
        <Button
          onClick={toggleSignupDrawer(true)}
          variant="solid"
          color="primary"
        >
          SIGN UP
        </Button>
      )}
      {modalType === "join" && (
        <Button
          onClick={userId ? toggleJoinDrawer(true) : toggleSignupDrawer(true)}
          variant="solid"
          color="neutral"
        >
          {buttonText ? buttonText : "STEP INSIDE"}
        </Button>
      )}
      {modalType === "manage" && (
        <Button
          onClick={toggleJoinDrawer(true)}
          variant="outlined"
          color="primary"
        >
          MANAGE MEMBERSHIP
        </Button>
      )}
      <section>
        <Drawer
          anchor="bottom"
          onClose={toggleLoginDrawer(false)}
          open={loginOpen}
          size="md"
        >
          <Login
            toggleClose={closeLogin}
            toggleSignup={switchToSignup}
            toggleJoin={switchToJoin}
            modalType={modalType}
          />
        </Drawer>
        <Drawer
          anchor="bottom"
          onClose={toggleSignupDrawer(false)}
          open={signUpOpen}
          size="lg"
        >
          <Signup
            toggleClose={closeSignup}
            toggleLogin={switchToLogin}
            toggleJoin={switchToJoin}
            modalType={modalType}
          />
        </Drawer>
        {(modalType === "join" || modalType === "manage") &&
          hasMembershipProps && (
            <Drawer
              anchor="bottom"
              onClose={toggleJoinDrawer(false)}
              open={joinOpen}
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
      </section>
    </section>
  );
};

export default AuthModal;
