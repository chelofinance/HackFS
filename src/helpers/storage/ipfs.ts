import {NFTStorage, File} from "nft.storage";

export const uploadDirectory = async (
  files: (File | {content: string; name: string; type: string})[]
) => {
  const client = new NFTStorage({token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || ""});
  const pureFiles = files.map((element) =>
    element instanceof File
      ? element
      : new File([element.content], element.name, {type: element.type})
  );
  console.log({pureFiles});
  return await client.storeDirectory(pureFiles);
};
