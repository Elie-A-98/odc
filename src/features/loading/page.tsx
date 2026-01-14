import { styled } from "@linaria/react";
import { Loader } from "../../design/components/feedback/loader";

const Root = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingPage = () => {
  return (
    <Root>
      <Loader />
    </Root>
  );
};
