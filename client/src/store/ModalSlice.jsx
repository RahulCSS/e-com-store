import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isLoginModalOpen: false,
    isSignUpModalOpen: false,
  },
  reducers: {
    showLoginModal(state) {
      state.isLoginModalOpen = true;
    },
    hideLoginModal(state) {
      state.isLoginModalOpen = false;
    },
    showSignUpModal(state) {
      state.isSignUpModalVisible = true;
    },
    hideSignUpModal(state) {
      state.isSignUpModalVisible = false;
    },
  },
});

export const { showLoginModal, hideLoginModal, showSignUpModal,hideSignUpModal, } = modalSlice.actions;
export default modalSlice.reducer;