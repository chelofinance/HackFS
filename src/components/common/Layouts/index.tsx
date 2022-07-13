import React from 'react';
import Link from 'next/link';

import { useRouter } from 'next/dist/client/router';
import clsx from 'clsx';
// import { AreaChartOutlined, GoldenFilled } from '@ant-design/icons';
import { MenuIcon } from '@heroicons/react/outline';

const navItems = [
	{ name: 'HOME', link: '/', icon: <MenuIcon /> },
	{ name: 'HOW TO MINT', link: '/tutorial', icon: <MenuIcon /> },
];

export default function AppLayout() {
	const router = useRouter();

	return (
		<>
			<nav
				className={clsx(
					'fixed top-0 z-10',
					'bg-overlay',
					'w-screen xl:px-56 md:px-36 px-8 py-4 flex flex-row items-center justify-between shadow-md'
				)}
			>
				<div className="flex items-center">
					<Logo />
				</div>
				<div className="flex items-center">
					{navItems.map((item, index) => {
						return (
							<div>
								<NavbarItem
									key={index}
									name={item.name}
									icon={item.icon}
									link={item.link}
									route={router.asPath}
								/>
							</div>
						);
					})}
				</div>
				{/* <div
					className="md:hidden flex"
					onClick={() => {
						setSidebarOpen(true);
					}}
				>
					<MenuIcon
						className="h-6 w-6 text-white cursor-pointer"
						aria-hidden="true"
					/>
				</div> */}
			</nav>
		</>
	);
}

export const Message: React.FunctionComponent<{
	content: string;
	open: boolean;
}> = (props) => {
	const { content, open } = props;

	return (
		<div
			className={clsx(
				`absolute bottom-3.5 left-3.5 bg-purple-300 px-10 py-4 rounded-md`,
				'ease-out duration-300',
				open ? 'scale-100' : 'scale-0'
			)}
		>
			{content}
		</div>
	);
};

export const Logo = () => (
	<a href="https://thecoco.club/">
		<div className="mr-4 md:py-0 h-16 cursor-pointer">
			<img src="/logos/coco.svg" className="h-16" alt="" />
		</div>
	</a>
);

export const NavbarItem: React.FC<any> = ({ name, link, route }) => {
	return (
		<Link href={link}>
			<div
				className={clsx('md:px-6 sm:px-4 px-2 py-2 relative cursor-pointer')}
			>
				<div
					className={clsx(
						{ 'text-white': link !== route },
						{ 'text-primary': link === route },
						'gap-2 flex items-center'
					)}
				>
					{/* <div className="flex items-center w-4">{icon}</div> */}
					<h3 className={clsx('sm:text-md text-sm font-bold text-center')}>
						{name}
					</h3>
				</div>
			</div>
		</Link>
	);
};
