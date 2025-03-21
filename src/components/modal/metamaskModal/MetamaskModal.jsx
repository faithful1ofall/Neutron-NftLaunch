import Link from "next/link";
import { useModal } from "src/utils/ModalContext";
import { FiX, FiChevronRight } from "react-icons/fi";
import MetamaskModalStyleWrapper from "./MetamaskModal.style.js";
import metamaskIcon from "@assets/images/icons/meta-mask.png";

const MetamaskModal = () => {
  const { handleMetamaskModal } = useModal();

  return (
    <>
      <MetamaskModalStyleWrapper className="modal_overlay">
        <div className="mint_modal_box">
          <div className="mint_modal_content">
            <div className="modal_header">
              <h2>CONNECT WALLET</h2>
              <p>Please download & install metamask!</p>
              <button onClick={() => handleMetamaskModal()}>
                <FiX />
              </button>
            </div>
            <div className="modal_body text-center">
              <div className="wallet_list">
                <Link href="https://metamask.io/download/" target="_blank">
                  <img src={metamaskIcon.src} alt="Meta-mask-Image" />
                  MetaMask
                  <span>
                    <FiChevronRight />
                  </span>
                </Link>
              </div>
              <div className="modal_bottom_text">
                By connecting your wallet, you agree to our
                <Link href="# ">
                  Terms of Service
                </Link>
                <Link href="#">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </MetamaskModalStyleWrapper>
    </>
  );
};

export default MetamaskModal;
