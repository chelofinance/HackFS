import * as React from 'react';

import clsx from 'clsx';

import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { InputProps } from './../../../../interfaces/common';
import { Typography } from 'components/common/typography';

export const SelectInput: React.FC<
	InputProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
	title,
	onChangeCustom,
	register,
	className,
	labelProps,
	values,
	name,
	defaultValue,
	rules,
	error,
	classNameContainer,
}) => {
	const registerInput = register && register(name, rules);

	return (
		<div
			className={clsx(
				'flex relative w-full',
				classNameContainer && classNameContainer
			)}
		>
			{title && (
				<label className={clsx('block mr-6', labelProps && labelProps)}>
					{title && title}
				</label>
			)}
			<select
				name={name}
				ref={registerInput && registerInput.ref}
				className={clsx(
					' block   border-dark-1 focus:outline-none focus:ring-indigo-500 focus:border-primary w-full rounded-lg f-18',
					className && className
				)}
				defaultValue={defaultValue && defaultValue}
				onChange={(e) => {
					registerInput && registerInput.onChange(e);
					onChangeCustom && onChangeCustom(e);
					/* 				handleActivation(e); */
				}}
			>
				{values?.map((item: any) => (
					<option key={item.value} value={item.value && item.value}>
						{item.name}
					</option>
				))}
			</select>
			{error && error.message && (
				<span className={clsx('flex items-center mt-1 mb-2 text-status-error')}>
					<div className="ml-1 w-4 h-4">
						<ExclamationCircleIcon className="w-4 text-status-error" />
					</div>
					<Typography type="caption">{error.message}</Typography>
				</span>
			)}
		</div>
	);
};
