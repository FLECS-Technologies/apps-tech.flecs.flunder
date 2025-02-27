import { LoadingButton, LoadingButtonProps } from "@mui/lab";

export default function LoginButton(props: LoadingButtonProps) {
  return (
    <>
      <LoadingButton
        sx={{ width: "300px" }}
        variant="contained"
        aria-label="login-button"
        loading={false}
        type="submit"
        {...props}
      >
        {" "}
        GO{" "}
      </LoadingButton>
    </>
  );
}
