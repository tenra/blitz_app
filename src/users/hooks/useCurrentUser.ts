import { useQuery } from "@blitzjs/rpc"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { useSetRecoilState } from "recoil";
import { currentUserState } from "src/users/hooks/currentUserState";
import { useEffect } from "react";

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null)
  const setCurrentUser = useSetRecoilState<any | null>(currentUserState);
  useEffect(
    () => setCurrentUser(user),
    [setCurrentUser, user]
  );

  return user
}
