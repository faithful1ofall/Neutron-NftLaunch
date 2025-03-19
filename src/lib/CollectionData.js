import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

const RPC_ENDPOINT = "https://rpc-falcron.pion-1.ntrn.tech"; // Replace with the correct gRPC URL


const fetchAllCollections = async () => {
  if (!process.env.NEXT_PUBLIC_FACTORY) {
    throw new Error("NEXT_PUBLIC_FACTORY environment variable is not defined");
  }
  const client = await CosmWasmClient.connect(RPC_ENDPOINT);

  const collectionArray = [];
  let start_after = '0';
  const MAX_ITERATIONS = 1;
  let iterationCount = 0;

  try {
    while (iterationCount < MAX_ITERATIONS) {
      const response = await client.queryContractSmart(
        process.env.NEXT_PUBLIC_FACTORY,
        {
          get_all_collection: {
            start_after: start_after,
            limit: 30,
          },
        }
      );

      console.log('init response ', response);

      if (!response || !response.contracts) break;

      const result = response;
     if (result.contracts.length === 0) break;

      result.contracts.forEach((contract_info) => {
        collectionArray.push({
          contract_address: contract_info.address,
          minter: contract_info.minter,
          logo_url: contract_info.logo_url,
          name: contract_info.name,
          symbol: contract_info.symbol,
        });
        start_after = contract_info.address;
      });

      iterationCount++;
    }

    return collectionArray;
  } catch (error) {
    console.log("Error fetching collections:", error.message || error);
    return [];
  }
};

const fetchCollection = async (collectionAddress) => {
  console.log('get collection', collectionAddress);
  const client = await CosmWasmClient.connect(RPC_ENDPOINT);
  

  
  
  if(!collectionAddress) return null;
  
  try {
    const response = await client.queryContractSmart(
      collectionAddress.contract_address,
      {
        contract_info: {}
      }
    );

    const responsenum = await client.queryContractSmart(
      collectionAddress.contract_address,
      {
        num_tokens: {}
      }
    );

    
    const responseconfig = await client.queryContractSmart(
      collectionAddress.contract_address,
      {
        config: {},
      }
    );
    
    
    
    
    const responsemintphase = await client.queryContractSmart(
      collectionAddress.contract_address,
      {
        mint_phase: {
          start_after: '0',
          limit: 30,
        },
      }
    );
      
    

    if (!response) return null;

    const result = response;
    const resultresponsenum = responsenum;
    const resultconfig = responseconfig;
    const resultmintphase = responsemintphase;
   
    console.log('nft config', resultconfig);

    console.log('nft resultmintphase', resultmintphase);
    
    return {
      numtokens: resultresponsenum.count, 
      mintphase: resultmintphase.mint_phase[0],
      baseURI: resultconfig?.base_url.startsWith("ipfs://")
        ? resultconfig?.base_url.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
        : resultconfig?.base_url,
      basePrice: result?.basePrice,
      logoUrl: result?.logo_url,
      mintActive: resultconfig?.is_mint_active,
      name: result?.name,
      totalSupplyLimit: resultconfig?.max_mint,
      totalSupply: resultconfig?.total_supply,
      creator: collectionAddress?.minter,
      address: collectionAddress?.contract_address,
    };
  } catch (error) {
    console.error(`Error fetching collection details for ${collectionAddress.contract_address}:`, error.message || error);
    return null;
  }
};

const fetchCollectionMetadata = async (collection) => {
  try {
   // const response = await fetch(`${collection.baseURI}metadata.json`);
   
 //   const metadata =  await response.json();
    const responsenft = collection?.baseURI ? await fetch(`${collection.baseURI}1.json`) : null;
    
    let metadatanft = {}; // Default empty object

    if (responsenft && responsenft.ok) {
        metadatanft = await responsenft.json();
    }

    console.log(metadatanft.image, 'numtokems', collection?.numtokens);

    const image = metadatanft.image;

    const imagesrc = { src: image };
    const injiconsrc = { src: 'https://s2.coinmarketcap.com/static/img/coins/64x64/26680.png' };

    return {
      thumb: imagesrc,
      title: collection?.name,
      price: collection?.mintphase.price ? `${collection?.mintphase.price}` : "N/A",
      saleEnd: `${collection?.totalSupply - collection.numtokens}` || "N/A",
      coinIcon: injiconsrc,
      collectionAddress: collection?.address,
      projectDetails: [
        { title: "Current Mints", text: collection?.numtokens ? collection.numtokens.toString() : "0" },
        { title: "Total Supply", text: collection?.totalSupply ? collection.totalSupply.toString() : "N/A" },
        { title: "Targeted Raise", text: `${collection?.totalSupply * collection?.mintphase.price}` || "N/A" },
        { title: "Access Type", text: "Public" },
      ],
      socialLinks: [],
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${collection.address}:`, error.message || error);
    return null;
  }
};

const loadNFTCollections = async (onUpdate) => {
  try {
    const collections = await fetchAllCollections();
    const projects = [];

    for (const collection of collections) {
      const collectionDetails = await fetchCollection(collection);
      if (collectionDetails) {
        const collectionMetadata = await fetchCollectionMetadata(collectionDetails);
        if (collectionMetadata) {
          projects.push(collectionMetadata);

          // Call the callback function with updated data in real-time
          if (onUpdate) {
            onUpdate({
              data: [
                {
                  projectStatus: "On Going",
                  projects: [...projects], // Send a copy of the array
                },
              ],
            });
          }
        }
      }
    }

    return {
      data: [
        {
          projectStatus: "On Going",
          projects,
        },
      ],
    };
  } catch (error) {
    console.error("Error loading NFT collections:", error.message || error);
    return { data: [] };
  }
};

export default loadNFTCollections;
