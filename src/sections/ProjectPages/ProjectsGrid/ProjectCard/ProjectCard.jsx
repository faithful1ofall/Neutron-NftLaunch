import { useState } from "react";
import Link from "next/link";
import CardHover from "@components/cardHover";
import ProjectCardStyleWrapper from "./ProjectCard.style";
import Button from "@components/button";
import { useChain } from "@cosmos-kit/react";


const ProjectCard = ({
  thumb,
  title,
  price,
  saleEnd,
  coinIcon,
  projectDetails,
  collectionAddress,
  socialLinks,
}) => {
  const [loading, setLoading] = useState(false);
//const { recentWallet, broadcast, simulate } = useShuttle();
const { address, getSigningCosmWasmClient } = useChain("neutrontestnet", true);
  

const mintnft = async () => {
  setLoading(true); 

  try {
   
    let extensions1 = {};

    const msg = {
      batch_mint_all: {
        token_count: 1,
        owner: address,
        extension: extensions1
      }
    };

   const  funds = [
      {
        denom: 'untrn',
        amount: price
      }
  ];
    

    
    
const client = await getSigningCosmWasmClient();

const result = await client.execute(
  address,
  collectionAddress,
  msg,
  "auto",
  "",
  funds,
);
console.log("Transaction successful:", result);
  alert("Smart contract executed successfully!");
      setLoading(false);
    } catch (error) {
      console.error("Execution failed:", error);
      alert("Transaction failed!");
      setLoading(false);
  }
};

  
  return (
    <ProjectCardStyleWrapper className="project_item_wrapper">
      <div className="project-info d-flex">
        <Link href="#">
          <img src={thumb.src} alt="project thumb" />
        </Link>
        <div className="project-auother">
          <h4 className="mb-10">
            <Link href="/projects-details-1">
              {title}
            </Link>
          </h4>
          <div className="dsc">PRICE INJ(uinj) = {price}</div>
        </div>
      </div>
      <div className="project-content">
        <div className="project-header d-flex justify-content-between align-items-center">
          <div className="heading-title">
            <h4>{saleEnd} Mints Left</h4>
          </div>
          <div className="project-icon">
            <img src={coinIcon.src} alt="coin icon" />
          </div>
        </div>
        <ul className="project-listing">
          {projectDetails?.map((item, i) => (
            <li key={i}>
              {item.title} <span>{item.text}</span>
            </li>
          ))}
        </ul>
        {/* Collection Address Link */}
        <div className="collection-address">
          <strong>Collection:</strong>{" "}
          <Link
            href={`https://testnet.explorer.injective.network/contract/${collectionAddress}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {collectionAddress}
          </Link>
        </div>
        <div className="social-links">
          {socialLinks?.map((profile, i) => (
            <Link key={i} href={profile.url}>
              <img src={profile.icon.src} alt="social icon" />
            </Link>
          ))}
        </div>
        <Button variant="mint" lg onClick={(e) => { e.preventDefault(); mintnft();}}>
          {loading ? <div className="spinner"></div> : 'Mint'}
        </Button>
      </div>

      <CardHover />
    </ProjectCardStyleWrapper>
  );
};

export default ProjectCard;
