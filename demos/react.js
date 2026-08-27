import { useId, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { hideModal } from "./modalSlice";

export default function ModalContainer() {
  const dispatch = useDispatch();
  const headingRef = useRef(null);
  const headingId = useId();
  const { modalType, modalProps } = useSelector((state) => state.modal);

  if (!modalType) return null;

  return (
    <ReactModal
      isOpen={modalProps?.open ?? false}
      onAfterOpen={() => headingRef.current?.focus()}
      onRequestClose={() => dispatch(hideModal())}
      aria={{ labelledby: headingId }}
    >
      <h2 id={headingId} ref={headingRef} tabIndex={-1}>
        {modalProps.title ?? "Example modal"}
      </h2>
      <button type="button" onClick={() => dispatch(hideModal())}>
        Close
      </button>
    </ReactModal>
  );
}
