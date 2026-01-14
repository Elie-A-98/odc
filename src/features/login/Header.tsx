import { styled } from "@linaria/react";
import { themeToken } from "../../design/styling/theme/theme";
import CompanyLogoSvg from "../../assets/company-logo.svg?react";

const Root = styled.div`
  height: ${themeToken("header-height")};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: ${themeToken("spacing-s")} ${themeToken("spacing-l")};
  border-bottom: 1px solid ${themeToken("palette-borders-primary")};
`;

const LogoAndNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${themeToken("spacing-s")};
  font-size: ${themeToken("typography-sizes-h4")};
`;

const PageName = styled.h4`
  justify-self: center;
`;

const SignUpBtn = styled.button`
  justify-self: end;
`;

type Props = {
  pageName?: string;
};

export const Header: React.FC<Props> = (props) => {
  const { pageName } = props;
  return (
    <Root>
      <LogoAndNameWrapper>
        <CompanyLogoSvg />
        <h4>{import.meta.env.VITE_APP_NAME}</h4>
      </LogoAndNameWrapper>
      <PageName>{pageName}</PageName>
      <SignUpBtn>Sign Up</SignUpBtn>
    </Root>
  );
};
