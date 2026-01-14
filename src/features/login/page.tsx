import { styled } from "@linaria/react";
import LockIcon from "../../assets/lock.svg?react";
import { cssFluidClamp, themeToken } from "../../design/styling/theme/theme";
import { Header } from "./Header";
import * as Form from "@radix-ui/react-form";
import { FieldLayout } from "../../design/components/form/FieldLayout";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../api/login.api";
import { useNavigate } from "react-router";
import { navLinkFactory } from "../../lib/navigation/nav-links";
import { useToast } from "../../design/components/toast/useToast";

const CARD_WIDTH = 400;

const Root = styled.div`
  height: 100vh;
`;

const Overlay = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: ${themeToken("palette-backgrounds-overlay-accent-5")};
  border-radius: 9999PX;
  background: ${themeToken("palette-backgrounds-overlay-accent-5")};
  filter: blur(60px);
  width: ${CARD_WIDTH * 2}px;
  aspect-ratio: 1;
  max-width: 100%;
  max-height: 100%;
`;

const Lock = {
  RootWrapper: styled.div`
    background-color: ${themeToken("palette-backgrounds-icon")};
    width: fit-content;
    border-radius: 100%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  `,
  Icon: styled(LockIcon)`
    color: ${themeToken("palette-text-accent")};
  `,
};

const CardRoot = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: ${cssFluidClamp(350, 450)};
  max-width: 90%;
  padding: ${themeToken("spacing-l")};
  border-radius: 16px;
  border: 1px solid ${themeToken("palette-borders-primary")};
  background: ${themeToken("palette-backgrounds-card")};
  box-shadow: 0 25px 50px -12px ${themeToken("palette-effects-shadow")};
`;
const Title = styled.h1`
  margin-top: ${themeToken("spacing-s")};
  text-align: center;
`;
const Banner = styled.h5`
  margin-top: ${themeToken("spacing-xs")};
  color: ${themeToken("palette-text-tertiary-inverted")};
  text-align: center;
  font-weight: 400;
`;
const FormRoot = styled(Form.Root)`
  margin-top: ${themeToken("spacing-m")};
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SubmitBtn = styled.button`
  margin-top: 28px;
  height: 48px;
  padding: 0 16px;
  border-radius: 8px;
  background: ${themeToken("palette-backgrounds-accent")};
  width: 100%;
  color: ${themeToken("palette-text-on-accent")};
  text-align: center;
  font-size: 16px;
  font-weight: 700;
`;

const schema = z.object({
  username: z.string().min(1, { error: "Username is required" }),
  password: z.string().min(1, { error: "Password is required" }),
});

type FormValues = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const { show: showToast, hide: hideToast } = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      password: "",
      username: "",
    },
    resolver: zodResolver(schema),
  });

  const { mutateAsync: loginAsync, error } = useLogin();

  /* TODO: refactor (handle this in the api layer instead) */
  const serverError = error != null
    ? ("error" in error &&
       typeof error.error === "string" 
        ? error.error
        : "Something went wrong")
    : null;
  
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    loginAsync(data)
      .then(() => {
        hideToast();
        navigate(navLinkFactory.home);
      })
      .catch(() => {
        showToast("Error", serverError ?? "Login failed");
      });

  return (
    <>
      <Root>
      <Header />
      <Overlay></Overlay>
      <CardRoot>
        <Lock.RootWrapper>
          <Lock.Icon />
        </Lock.RootWrapper>
        <Title>Welcome</Title>
        <Banner>Enter your credentials to access your account.</Banner>

        <FormRoot onSubmit={handleSubmit(onSubmit)}>
          <FieldLayout.YStack
            label="Username"
            fieldProps={{ name: "username" }}
            errorMessage={errors.username}
          >
            <input
              className="Input"
              type="text"
              placeholder="Username"
              {...register("username")}
            />
          </FieldLayout.YStack>
          <FieldLayout.YStack
            label="Password"
            fieldProps={{ name: "password" }}
            errorMessage={errors.password}
          >
            <input
              className="Input"
              type="password"
              placeholder="Enter you password"
              {...register("password")}
            />
          </FieldLayout.YStack>

          <Form.Submit asChild>
            <SubmitBtn>Log in</SubmitBtn>
          </Form.Submit>
        </FormRoot>
      </CardRoot>
    </Root>
    </>
  );
};

export default LoginPage;
