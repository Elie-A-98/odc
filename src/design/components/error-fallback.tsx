import { styled } from "@linaria/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { cssFluidClamp, themeToken } from "../styling/theme/theme";

const AlertOverlay = styled(AlertDialog.Overlay)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  animation: fadeIn 200ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const AlertContent = styled(AlertDialog.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${cssFluidClamp(300, 500)};
  max-width: 90%;
  padding: ${themeToken("spacing-l")};
  border-radius: 16px;
  border: 1px solid #31684d;
  background: #183426;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: slideUp 200ms ease-out;

  @keyframes slideUp {
    from {
      transform: translate(-50%, calc(-50% + 20px));
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }
`;

const AlertTitle = styled(AlertDialog.Title)`
  font-size: 24px;
  font-weight: 700;
  color: #ff6b6b;
  margin-bottom: ${themeToken("spacing-s")};
`;

const AlertDescription = styled(AlertDialog.Description)`
  font-size: 14px;
  color: #90cbad;
  margin-bottom: ${themeToken("spacing-xs")};
  line-height: 1.5;
`;

const ErrorDetails = styled.pre`
  font-size: 12px;
  color: #64748b;
  background: rgba(0, 0, 0, 0.3);
  padding: ${themeToken("spacing-s")};
  border-radius: 8px;
  overflow: auto;
  max-height: 200px;
  margin-bottom: ${themeToken("spacing-m")};
  font-family: monospace;
`;

const AlertActions = styled.div`
  display: flex;
  gap: ${themeToken("spacing-s")};
  justify-content: flex-end;
`;

const AlertButton = styled(AlertDialog.Action)`
  height: 40px;
  padding: 0 16px;
  border-radius: 8px;
  background: #0df280;
  color: #102219;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background-color 200ms;

  &:hover {
    background-color: #0cd970;
  }
`;

type ErrorFallbackProps = {
  error: Error;
};

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  const handleReset = () => {
    window.location.href = "/";
  };

  return (
    <AlertDialog.Root open={true}>
      <AlertDialog.Portal>
        <AlertOverlay />
        <AlertContent>
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. You can try reloading the page or
            return to the home page.
          </AlertDescription>
          <ErrorDetails>
            {error.message}
          </ErrorDetails>
          <AlertActions>
            <AlertButton onClick={handleReset}>Go to Home</AlertButton>
          </AlertActions>
        </AlertContent>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default ErrorFallback;
