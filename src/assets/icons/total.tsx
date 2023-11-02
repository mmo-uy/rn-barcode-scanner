import React, {FunctionComponent} from 'react';
import Svg, {Mask, Path, G, Rect} from 'react-native-svg';
import colors from '../../theme/colors';

interface TotalIconProps {
	fill?: string;
	size?: number;
}

const TotalIcon: FunctionComponent<TotalIconProps> = ({fill = colors.primary.dark, size = 33}) => (
	<Svg viewBox="0 0 24 24" fill={fill} width={size} height={size}>
		<Mask
			id="mask0_0_11726"
			style={{
				maskType: 'luminance',
			}}
			maskUnits="userSpaceOnUse"
			x={2}
			y={1}
			width={size}
			height={size}>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19.5725 1.97952H4.37231C3.60376 1.97952 2.97876 2.60452 2.97876 3.37307V20.627C2.97876 21.3955 3.60376 22.0205 4.37231 22.0205H19.5725C20.3411 22.0205 20.9661 21.3955 20.9661 20.627V3.37308C20.9661 2.60452 20.3411 1.97952 19.5725 1.97952ZM19.9661 20.627C19.9661 20.8404 19.7854 21.0205 19.5725 21.0205H4.37231C4.15942 21.0205 3.97876 20.8404 3.97876 20.627V3.37308C3.97876 3.15628 4.15552 2.97953 4.37231 2.97953H19.5725C19.7893 2.97953 19.9661 3.15629 19.9661 3.37308V20.627ZM10.9934 8.00198H8.99145V6.00198H7.99145V8.00198H5.9895V9.00198H7.99145V10.9961H8.99145V9.00198H10.9934V8.00198ZM8.70019 16.0057L10.0002 17.3057L9.29321 18.0127L7.99316 16.7127L6.69848 18.0074L5.99145 17.3003L7.28613 16.0057L5.98559 14.7051L6.69262 13.9981L7.99316 15.2986L9.29223 13.9996L9.99926 14.7066L8.70019 16.0057ZM17.9983 8.00198H12.9973V9.00198H17.9983V8.00198ZM12.9973 16.9903H17.9914V17.9903H12.9973V16.9903ZM17.9914 13.9903H12.9973V14.9903H17.9914V13.9903Z"
				fill="white"
			/>
		</Mask>
		<G mask="url(#mask0_0_11726)">
			<Rect width={120} height={120} fill="#2F2F2F" />
		</G>
	</Svg>
);

export default TotalIcon;
