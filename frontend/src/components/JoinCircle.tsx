import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Modal,
  ModalDialog,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import type { Membership, Tier } from "../types";

type JoinCircleProps = {
  userId: string;
  circleId: number;
  ucId: number;
  circleName: string;
  handleMembership: (tier: string, ucId: number) => void;
  cancelMembership: (cancelled: boolean) => void;
  modalType: "manage" | "join";
  userTier?: Tier;
};

function JoinCircle({
  userId,
  circleId,
  circleName,
  ucId,
  cancelMembership,
  handleMembership,
  modalType,
  userTier,
}: JoinCircleProps) {
  const [chosenTier, setChosenTier] = useState<Tier | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleJoin = async () => {
    if (chosenTier) {
      const ucData: Membership = {
        userId: userId,
        circleId: circleId,
        circleTier: chosenTier,
      };
      try {
        const response = await fetch("/api/user-circles/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ucData),
        });

        if (!response.ok) {
          throw new Error("Failed to cancel membership");
        }

        const data = await response.json();
        handleMembership(chosenTier, data.userCircle.uc_id);
      } catch (error) {
        console.error("Error joining the circle: ", error);
      }
    }
  };

  const handleCancel = async () => {
    try {
      const response = await fetch(`/api/user-circles/${ucId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel membership");
      }

      cancelMembership(true);
      setOpen(false);
    } catch (error) {
      console.error("Error canceling membership:", error);
    }
  };

  const tiers: {value: Tier, label: Tier, price: string, color: string}[] = [
    {
      value: "Bronze",
      label: "Bronze",
      price: "$4.99/month",
      color: "#CD7F32",
    },
    {
      value: "Silver",
      label: "Silver",
      price: "$9.99/month",
      color: "#C0C0C0",
    },
    { value: "Gold", label: "Gold", price: "$14.99/month", color: "#FFD700" },
  ];

  return modalType === "manage" ? (
    <Box
      sx={{
        bgcolor: "var(--purple-dark)",
        width: "100%",
        color: "var(--orange-main)",
        px: 6,
        py: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
        You are a member of {circleName}'s circle
      </h2>
      <p
        style={{
          textAlign: "center",
          marginTop: "1rem",
          color: "var(--orange-white",
          fontSize: "18px",
        }}
      >
        Current tier:{" "}
        <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {userTier}
        </span>
      </p>
      <Button
        type="submit"
        color="danger"
        variant="solid"
        onClick={() => setOpen(true)}
        sx={{ mt: 3, py: 2 }}
      >
        Cancel membership
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to leave {circleName}'s circle?
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={handleCancel}>
              Leave circle
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  ) : (
    <Box
      sx={{
        bgcolor: "var(--purple-dark)",
        width: "100%",
        color: "var(--orange-main)",
        px: 6,
        py: 4,
      }}
    >
      <h2 style={{ fontSize: "1.5rem", textAlign: "center" }}>
        Joining {circleName}'s circle
      </h2>
      <p
        style={{
          textAlign: "center",
          marginTop: "0.5rem",
          marginBottom: "1.5rem",
        }}
      >
        Pick the tier for your membership:
      </p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "var(--purple-white)",
          py: 2,
          px: 2,
          borderRadius: "lg",
          boxShadow: "md",
          gap: 2,
        }}
      >
        {tiers.map((tier) => (
          <Box
            key={tier.value}
            onClick={() => setChosenTier(tier.value)}
            sx={{
              p: 3,
              borderRadius: "md",
              border: 2,
              borderColor:
                chosenTier === tier.value
                  ? "var(--orange-main)"
                  : "var(--purple-lighter)",
              bgcolor:
                chosenTier === tier.value
                  ? "var(--orange-white)"
                  : "transparent",
              transition: "all 0.2s",
              cursor: "pointer",
              width: "100%",
              "&:hover": {
                borderColor:
                  chosenTier === tier.value
                    ? "var(--orange-main)"
                    : "var(--purple-main)",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    bgcolor: tier.color,
                  }}
                />
                <span
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--purple-dark)",
                  }}
                >
                  {tier.label}
                </span>
              </Box>
              <span style={{ color: "var(--purple-main)", fontWeight: 500 }}>
                {tier.price}
              </span>
            </Box>
          </Box>
        ))}
      </Box>
      <Button
        type="submit"
        color="neutral"
        variant="solid"
        onClick={handleJoin}
        disabled={!chosenTier}
        sx={{ mt: 2, py: 2, width: "100%", fontSize: "16px" }}
      >
        Confirm subscription
      </Button>
    </Box>
  );
}

export default JoinCircle;
