import { css } from "@linaria/core";
import { useAccount } from "../../../api/account.api";

export const UserProfileAvatar = () => {
  const { data: user, status } = useAccount();
  if (status !== "success" || user == null) return <></>;

  return (
    <div
      className={css`
        display: flex;
        align-items: center;
        gap: 12px;
      `}
    >
      <span
        className={css`
          width: 32px;
          height: 32px;
          border-radius: 9999PX;
          background: linear-gradient(45deg, #0df280 0%, #3b82f6 100%);
        `}
      />
      <span>{user.name}</span>
    </div>
  );
};
