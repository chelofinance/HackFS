import {NFTStorage, File} from "nft.storage";
import {create} from "ipfs-http-client";

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

export const getFolderList = async (ipfsPath: string) => {
  const url = "https://dweb.link/api/v0";
  const ipfs = create({url});

  const links = [];
  for await (const link of ipfs.ls(ipfsPath)) {
    links.push(link);
  }
  console.log(links);
};
