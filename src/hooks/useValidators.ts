import { useState } from 'react';
import { useQueryGetActiveValidators } from './query';
import { AFTERMATH_VALIDATOR_ADDRESS } from '@/config/constants';

export const useValidators = () => {
  const [selectedValidatorAddress, setSelectedValidatorAddress] = useState(
    AFTERMATH_VALIDATOR_ADDRESS,
  );

  const { data: validators, isLoading: isLoadingValidators } = useQueryGetActiveValidators();

  const selectedValidator =
    validators?.find(({ suiAddress }) => suiAddress === selectedValidatorAddress) ?? null;

  return {
    validators,
    selectedValidator,
    setSelectedValidatorAddress,
    selectedValidatorAddress,
    isLoadingValidators,
  };
};
