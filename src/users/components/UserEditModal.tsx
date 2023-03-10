import React, { useState } from "react";
import Modal from 'react-modal';
import updateUser from "src/users/mutations/updateUser";
import { UserForm, FORM_ERROR } from "src/users/components/UserForm";
import { useQuery, useMutation } from "@blitzjs/rpc";
import getUser from "src/users/queries/getUser";
import { useParam } from "@blitzjs/next";
import { useSetRecoilState } from "recoil";
import { currentUserState } from "src/users/hooks/currentUserState";

export const UserEditModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const userId = useParam("userId", "number");

  const [updateUserMutation] = useMutation(updateUser);

  const [user, { setQueryData }] = useQuery(
    getUser,
    { id: userId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const customStyles = {
    content: {
      top: '25%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
    },
  };

  const setcurrentUser = useSetRecoilState(currentUserState);

  return (
    <>
      <button onClick={handleOpenModal} className="btn-primary">
        profile edit
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <h2>Update User</h2>
        <div>
          <UserForm
            submitText="Update User"
            // TODO use a zod schema for form validation
            //  - Tip: extract mutation's schema into a shared `validations.ts` file and
            //         then import and use it here
            // schema={UpdatePromotion}
            initialValues={user}
            onSubmit={async (values) => {
              try {
                const updated = await updateUserMutation({
                  id: user.id,
                  ...values,
                });
                await setQueryData(updated);
                setcurrentUser(values);
                setShowModal(false);
                //await router.push(
                  //Routes.ShowUserPage({ userId: updated.id })
                //);
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </div>
        <button onClick={handleCloseModal} className="btn-primary">close</button>
      </Modal>
    </>
  )
}
