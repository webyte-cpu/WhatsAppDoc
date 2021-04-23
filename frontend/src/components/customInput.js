import { Input, useTheme, Text } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <Input
      {...inputProps}
      value={value}
      onChangeText={(text) => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name);
        onBlur(name);
      }}
      status={hasError ? 'danger' : inputProps.status}
      caption={hasError ? errors[name] : inputProps.caption}
    />
  );
};

// UI Kitten input field without text
// used in image upload in Sign  Up
const CustomImgField = (props) => {
  const theme = useTheme();
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;
  const hasError = errors[name] && touched[name];

  const style = StyleSheet.create({
    err: {
      borderColor: theme['color-danger-500'],
    },
    caption: {
      color: hasError ? theme['color-danger-500'] : theme['text-hint-color'],
    },
  });

  const captionText = hasError ? errors[name] : props.caption;

  // TODO: refactor in caption in ui-kitten style
  
  return (
    <>
      <Input
        {...inputProps}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        style={hasError ? style.err : props.style}
      />
      <Text category="c1" style={style.caption}>
        {captionText}
      </Text>
    </>
  );
};

export { CustomInput, CustomImgField };
