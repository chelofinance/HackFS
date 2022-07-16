import React from "react";
import {useForm} from "react-hook-form";
import {Input} from "@components/common/form/input";

import {uploadDirectory} from "@helpers/storage/ipfs";

const Create: React.FunctionComponent<{}> = () => {
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

	return (
		<div className="h-full flex flex-col items-start">
			<div className="h-full w-1/2 flex flex-col items-start px-10 py-40">
				<h2 className="text-4xl w-full align-left mb-10">Create Invoice</h2>
				<h4 className="text-xl w-full align-left mb-4">Issuer/DAO</h4>
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
				<div className="flex w-full gap-10">
					<Input
						labelVisible
						title="Fax Number"
						name="client_fax"
						register={register}
						className="mb-5 flex-1"
					/>
					<Input
						labelVisible
						title="Phone Number"
						name="client_phone"
						register={register}
						className="mb-5 flex-1"
					/>
				</div>

				<h4 className="text-xl w-full align-left my-4">Receiver/Client</h4>
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
				<div className="flex w-full gap-10">
					{" "}
					<Input
						labelVisible
						title="Fax Number"
						name="client_fax"
						register={register}
						className="mb-5 flex-1"
					/>
					<Input
						labelVisible
						title="Phone Number"
						name="client_phone"
						register={register}
						className="mb-5 flex-1"
					/>
				</div>
			</div>
		</div>
	);
};

export default Create;
