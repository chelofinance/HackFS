import type {NextPage} from "next";
import {uploadDirectory} from "@helpers/storage/ipfs";

const Home: NextPage = () => {
  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: (File | Object)[] = Array.from(event.target.files || []);
    const uploadContent = files.concat([{mynewObject: "is awesome", isAwesome: true}]);

    if (files.length <= 0) return;

    try {
      await uploadDirectory(uploadContent);
    } catch (err: any) {
      console.log({err});
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <input type="file" onChange={handleFiles}></input>
    </div>
  );
};

export default Home;
