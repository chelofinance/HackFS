import React from "react";
import {useForm} from "react-hook-form";
import {Dropzone, FileItem, FileValidated} from "@dropzone-ui/react";

import {Input} from "@components/common/form/input";
import {SelectInputForm} from "@components/common/form/select/select";
import {uploadDirectory} from "@helpers/storage/ipfs";
import {getTokensList} from "@helpers/erc";

const Create: React.FunctionComponent<{}> = () => {
	const [tokenList, setTokenList] = React.useState<any[]>([]);
	const [files, setFiles] = React.useState<FileValidated[]>([]);

	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm();

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

	const updateFiles = (incommingFiles: FileValidated[]) => {
		setFiles(incommingFiles);
	};

	React.useEffect(() => {
		getTokensList().then((res) => setTokenList(res));
	}, []);

	return (
		<div className="h-full flex flex-col items-start">
			<div className="h-full w-full flex flex-col items-start px-10 py-40">
				<img src="/main_image.png" className="absolute opacity-20 right-0" width="1200px" />
				<h2 className="text-4xl w-full align-left mb-10">Create Invoice</h2>
				<div className="w-full flex flex-col gap-20">
					<div className="h-full w-1/2 flex flex-col items-start">
						<h4 className="text-xl w-full align-left">Issuer/DAO</h4>
						<Input
							labelVisible
							title="Contact/Name"
							name="client_contact"
							register={register}
							className="mb-5"
						/>
						<Input
							labelVisible
							title="Email"
							name="client_email"
							register={register}
							className="mb-5"
						/>
					</div>

					<div className="h-full w-1/2 flex flex-col items-start">
						<h4 className="text-xl w-full align-left">Receiver/Client</h4>
						<div className="flex w-full gap-10">
							<Input
								labelVisible
								title="Contact/Name"
								name="client_contact"
								register={register}
								className="mb-5 flex-1"
							/>
							<Input
								labelVisible
								title="Wallet"
								name="client_wallet"
								register={register}
								className="mb-5 flex-1"
							/>
						</div>
						<Input
							labelVisible
							title="Email"
							name="client_email"
							register={register}
							className="mb-5"
						/>
					</div>
					<div className="h-full w-1/2 flex flex-col items-start">
						<h4 className="text-xl w-full align-left">Invoice</h4>
						<div className="flex w-full gap-10">
							<Input
								labelVisible
								title="Invoice fractions"
								name="fractions"
								register={register}
								className="mb-5 flex-1"
							/>
							<Input
								labelVisible
								title="Price/Fraction"
								name="fractionalPrice"
								register={register}
								className="mb-5 flex-1"
							/>
						</div>
						<SelectInputForm
							labelVisible
							title="Pay Token"
							name="token"
							register={register}
							className="mb-5 flex-1"
							arrayValues={tokenList.map((tkn) => ({value: tkn.address, title: tkn.name}))}
						/>
						<Dropzone
							style={{background: "black", color: "white"}}
							accept="text/plain,text/html,image/jpeg,image/png,application/json"
							label="Attachments"
							maxFiles={5}
							onChange={updateFiles}
							value={files}
						>
							{files.map((file) => (
								<FileItem {...file} preview />
							))}
						</Dropzone>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Create;
