import React from "react";
import {useForm} from "react-hook-form";
import {Dropzone, FileItem, FileValidated} from "@dropzone-ui/react";
import convert from "xml-js";

import {Input} from "@components/common/form/input";
import {Button} from "@components/common/button";
import {SelectInputForm} from "@components/common/form/select/select";
import {uploadDirectory} from "@helpers/storage/ipfs";
import {getTokensList} from "@helpers/erc";

import {getInvoiceJson} from "@helpers/xml";

const Create: React.FunctionComponent<{}> = () => {
	const [tokenList, setTokenList] = React.useState<any[]>([]);
	const [files, setFiles] = React.useState<FileValidated[]>([]);

	const {
		handleSubmit,
		register,
		setValue,
		formState: {errors},
	} = useForm();

	const onSubmit = async (values: any) => {
		const invoiceJson = getInvoiceJson({
			...values,
			currency: "EUR",
			principal: values.repaymentAmount,
		});

		const uploadContent: any[] = (files as any).concat([
			{
				content: convert.json2xml(JSON.stringify(invoiceJson), {}),
				name: "invoice_xml.xml",
				type: "application/xml",
			},
		]);

		if (files.length <= 0) return;

		try {
			const cid = await uploadDirectory(uploadContent);
			console.log(cid.toString());
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
				<form
					className="w-full flex flex-col  items-start gap-20"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="h-full w-1/2 flex flex-col items-start">
						<h4 className="text-xl w-full align-left">Issuer/DAO</h4>
						<Input
							labelVisible
							title="Contact/Name"
							name="issuer_contact"
							register={register}
							className="mb-5"
						/>
						<Input
							labelVisible
							title="Email"
							name="issuer_email"
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
								name="receiver_contact"
								register={register}
								className="mb-5 flex-1"
							/>
							<Input
								labelVisible
								title="Wallet"
								name="receiver_wallet"
								register={register}
								className="mb-5 flex-1"
							/>
						</div>
						<Input
							labelVisible
							title="Email"
							name="receiver_email"
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
						<div className="flex items-center w-full gap-10">
							<Input
								labelVisible
								title="Repayment Amount"
								name="repaymentAmount"
								register={register}
								className=" flex-1"
							/>
							<SelectInputForm
								labelVisible
								title="Pay Token"
								name="token"
								register={register}
								className="mb-0 flex-1"
								arrayValues={tokenList.map((tkn) => ({value: tkn.address, title: tkn.name}))}
							/>
						</div>
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
						<div className="w-full flex justify-end mt-10">
							<Button colored className="py-2 px-6" type="submit">
								Create Invoice
							</Button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Create;
