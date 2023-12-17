import {
	createStyles,
	Image,
	Container,
	Title,
	Button,
	Group,
	Text,
	List,
	ThemeIcon,
} from '@mantine/core';

import Link from 'next/link';
import useStyles from './styles';

export function HeroBullets() {
	return (
		<div className='main'>
			<div className='big'>
				<div className='lft'>
					<div className='caption'>
        					<p>BANKING IN YOUR <br></br> FINGERTIP!</p>
						<button className='btn'>GET STARTED</button>
					</div>
				</div>
				<div className='rgt'>
					<Image src='/man.png' width={615}></Image>
				</div>
			</div>
		</div>
		
	);
}