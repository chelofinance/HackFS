import {NFTStorage, File} from "nft.storage";
import axios from "axios";
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
  return links;
};

export const downloadFile = async (file: string, fileName: string) => {
  const res = await axios({
    url: file, //your url
    method: "GET",
    responseType: "blob", // important
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName); //or any other extension
  document.body.appendChild(link);
  link.click();

  return {url, response: res};
};

export const cidToHttp = (cid: string) => {
  return `https://ipfs.io/ipfs/${cid}`;
};
