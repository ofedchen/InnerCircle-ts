import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import type { AuthFormData, ModalType } from "../types.ts";

type LoginProps = {
  modalType: ModalType;
  toggleClose: () => void;
  toggleSignup: () => void;
  toggleJoin: () => void;
};

const Login = (props: LoginProps) => {
  const { login } = useUser();
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [_pwdFocus, setPwdFocus] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  async function handleLogin(formData: AuthFormData) {
    try {
      const response = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Login failed");
        return;
      }

      if (result.user) {
        login(result.user.users_id);

        props.toggleClose();
        if (props.modalType === "join") props.toggleJoin();
        else navigate("/feed");
        resetForm();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred");
    }
  }

  function resetForm() {
    setEmail("");
    setPwd("");
    setPwdFocus(false);
    setError("");
  }

  const handleSwitchToSignup = () => {
    props.toggleSignup();
  };

  return (
    <section
      data-cy="login-container"
      className="bg-(--purple-dark) w-full text-(--orange-main) px-8 py-10"
    >
      <h2 className="text-2xl text-center">Log in</h2>
      <form
        data-cy="login-form"
        className="bg-(--purple-dark) w-full text-(--orange-main) px-8 py-10"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(
            formData.entries()
          ) as AuthFormData;
          handleLogin(formJson);
        }}
      >
        <Stack spacing={1.2}>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              autoComplete="disabled"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onBlur={() => {
                setPwdFocus(false);
              }}
              onFocus={() => {
                setPwdFocus(true);
              }}
              placeholder="Password"
              type="password"
              required
            />
          </FormControl>
          <Box sx={{ height: 8 }} />
          <Button
            type="submit"
            color="neutral"
            variant="solid"
            disabled={!email || !pwd}
            sx={{ py: 1.2 }}
          >
            Log in
          </Button>
          <p
            className="underline py-4 cursor-pointer"
            onClick={handleSwitchToSignup}
          >
            Don't have an account? Sign up now
          </p>
        </Stack>
      </form>
    </section>
  );
};

export default Login;
