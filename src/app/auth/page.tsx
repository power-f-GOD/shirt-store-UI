'use client';

import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { shallowEqual } from 'react-redux';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';

import { Stack } from 'src/components/shared/Stack';
import { useTypedSelector } from 'src/redux/store';
import { Text } from 'src/components/shared';

const authTypeOptions: Array<'login' | 'signup'> = ['login', 'signup'];

const Auth = () => {
  const { status } = useTypedSelector((state) => state.user, shallowEqual);
  const [authType, setAuthType] =
    useState<(typeof authTypeOptions)[0]>('login');
  const isLoading = status !== 'fulfilled';

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack as="main" className="max-w-lg mx-auto w-full p-5 gap-10">
      <Text as="h2" className="capitalize text-center">
        Auth - {authType}
      </Text>
      <Stack as="form" className="gap-5">
        <FormControl
          className="w-full col-span-3 mb-1"
          disabled={isLoading}
          onChange={useCallback((e: SyntheticEvent) => {
            setAuthType(
              (e.target as HTMLInputElement).value as typeof authType
            );
          }, [])}>
          <FormLabel
            className="text-xs"
            id="auth-type"
            // sx={formLabelSx}
          >
            Choose Type *
          </FormLabel>
          <Stack
            component={RadioGroup}
            aria-labelledby="auth-type"
            name="payment-method-group"
            className="OutlinedRadio mt-1 grid grid-cols-2">
            {authTypeOptions.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                className="capitalize"
                control={<Radio size="small" />}
                label={option}
                checked={authType === option}
                // sx={formLabelSx}
              />
            ))}
          </Stack>
        </FormControl>

        <TextField
          placeholder="John Doe"
          label="Enter your name"
          className="text-black"
          disabled={isLoading}
        />

        <Button
          className="capitalize bg-black py-3 px-5 rounded-xl hover:bg-black/70 lg:py-3.5 lg:px-6"
          variant="contained"
          type="submit"
          disabled={isLoading}>
          {isLoading
            ? status === 'inert'
              ? 'Please, wait...'
              : 'Authenticating...'
            : authType}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Auth;
