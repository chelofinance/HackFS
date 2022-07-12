import {NFTStorage, File} from "nft.storage";

export const uploadDirectory = async (files: (File | Object)[]) => {
  const client = new NFTStorage({token: process.env.NEXT_PUBLIC_NFT_STORAGE_TOKEN || ""});
  const pureFiles = files.map((element) =>
    element instanceof File
      ? element
      : new File([JSON.stringify(element)], "element.json", {type: "application/json"})
  );
  return await client.storeDirectory(pureFiles);
};
