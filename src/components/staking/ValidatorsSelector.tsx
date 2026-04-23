import { useState } from 'react';
import { type ValidatorWithApy } from '@/types/validators';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { Skeleton } from '../ui/skeleton';
import { Field, FieldLabel } from '../ui/field';

interface ValidatorsSelectorProps {
  validators?: ValidatorWithApy[];
  selectedValidatorAddress: string;
  onSelectValidatorAddress: (value: string) => void;
  isLoading?: boolean;
}

export const ValidatorsSelector = ({
  validators,
  selectedValidatorAddress,
  onSelectValidatorAddress,
  isLoading = false,
}: ValidatorsSelectorProps) => {
  const [filter, setFilter] = useState('');

  const currentValidator = validators?.find((vali) => vali.suiAddress === selectedValidatorAddress);

  const filtered = validators?.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <Field>
      <FieldLabel className="text-xs">Select Validator</FieldLabel>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isLoading ? (
            <Skeleton className="w-full h-12 rounded-full bg-gray-200" />
          ) : (
            <Button
              variant="outline"
              size="lg"
              className="w-full justify-between"
              disabled={isLoading}
            >
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src={currentValidator?.imageUrl} />
                  <AvatarFallback>VA</AvatarFallback>
                </Avatar>
                <p className="line-clamp-1 max-w-50 truncate">{currentValidator?.name}</p>
              </div>
              <ChevronDown />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <InputGroup>
            <InputGroupInput
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Search..."
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">{filtered?.length} results</InputGroupAddon>
          </InputGroup>
          <DropdownMenuSeparator />
          {filtered?.length ? (
            <DropdownMenuRadioGroup
              value={selectedValidatorAddress}
              onValueChange={onSelectValidatorAddress}
            >
              {filtered.map((validator) => (
                <DropdownMenuRadioItem
                  key={validator.suiAddress}
                  className="flex justify-between items-center"
                  value={validator.suiAddress}
                >
                  <div className="flex gap-2 items-center">
                    <Avatar>
                      <AvatarImage src={validator.imageUrl} />
                      <AvatarFallback>VA</AvatarFallback>
                    </Avatar>
                    <p className="line-clamp-1 max-w-50 truncate">{validator.name}</p>
                  </div>
                  <p className="text-green-600">{(validator.apy * 100).toFixed(2)}%</p>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          ) : (
            <p className="px-3 py-2 text-sm text-muted-foreground">No validators found</p>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </Field>
  );
};
