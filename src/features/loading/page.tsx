import { styled } from "@linaria/react";

const Root = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoadingPage = () => {
  return <Root>Loading...</Root>;
};
