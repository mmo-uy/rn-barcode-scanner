import React, {useState, useCallback} from 'react';
import {KeyboardTypeOptions, Text, View, StyleSheet} from 'react-native';
import Dialog from 'react-native-dialog';
import colors from '../theme/colors';

interface CustomPromptDialogProps {
	visible: boolean;
	onCancel: () => void;
	onSubmit: (inputValue: string) => void;
	placeholder: string;
	title: string;
	keyboardType?: KeyboardTypeOptions;
}

const CustomDialog: React.FC<CustomPromptDialogProps> = ({
	visible,
	onCancel,
	onSubmit,
	placeholder,
	title,
	keyboardType,
}) => {
	const [inputValue, setInputValue] = useState('');
	const isInputEmpty = inputValue.trim() === '';
	const isInputTooLong = inputValue.length > 16;
	const isInputError = isInputTooLong || (inputValue.length > 0 && inputValue.length < 16);

	const handleOnchange = useCallback((text: string) => {
		const numericText = text.replace(/[^0-9]/g, '');
		setInputValue(numericText);
	}, []);

	const handleCancel = useCallback(() => {
		onCancel();
		setInputValue('');
	}, [onCancel]);

	const handleSubmit = useCallback(() => {
		if (!isInputError && !isInputEmpty) {
			onSubmit(inputValue);
			setInputValue('');
		}
	}, [onSubmit, inputValue, isInputError, isInputEmpty]);

	return (
		<Dialog.Container visible={visible} contentStyle={styles.container}>
			<Dialog.Title style={styles.title}>{title}</Dialog.Title>
			<View style={styles.inputContainer}>
				<Dialog.Input
					underlineColorAndroid={isInputError ? colors.status.error : colors.greyScale.grey}
					placeholder={placeholder ?? 'Placeholder'}
					keyboardType={keyboardType ?? 'numeric'}
					onChangeText={handleOnchange}
					value={inputValue}
					style={[
						styles.input,
						{
							borderBottomColor: isInputError ? colors.status.error : colors.primary.dark,
						},
					]}
					label={!isInputEmpty ? placeholder : null}
					maxLength={16}
					unstableLabelStyle={{
						color: colors.greyScale.grey,
						display: isInputEmpty ? 'none' : 'flex',
					}}
				/>
				<Text
					style={{
						color: colors.status.error,
						position: 'absolute',
						bottom: 2,
						left: 10,
						display: !isInputEmpty && inputValue.length < 16 ? 'flex' : 'none',
					}}>
					Is Required
				</Text>
			</View>
			<Dialog.Button label="Cancelar" onPress={handleCancel} color={colors.primary.blue} />
			<Dialog.Button
				label="OK"
				onPress={handleSubmit}
				disabled={isInputError || isInputEmpty}
				style={{
					color: isInputError || isInputEmpty ? colors.greyScale.grey : colors.primary.blue,
				}}
			/>
		</Dialog.Container>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
	},
	title: {
		color: colors.primary.dark,
	},
	inputContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignContent: 'center',
	},
	input: {
		color: colors.primary.dark,
		fontWeight: '700',
	},
});

export default CustomDialog;
