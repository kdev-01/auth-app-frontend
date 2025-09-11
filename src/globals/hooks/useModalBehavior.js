import useBodyScrollLock from "./useBodyScrollLock";
import useEscapeKey from "./useEscapeKey";

function useModalBehavior(isOpen, onClose) {
	useEscapeKey(onClose, isOpen);
	useBodyScrollLock(isOpen);
}

export default useModalBehavior;
