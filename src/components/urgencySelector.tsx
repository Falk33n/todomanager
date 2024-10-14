import {
  FormControl,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { cn } from '@/lib';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type UrgencySelectorProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
};

export const UrgencySelector = <TFieldValues extends FieldValues>({
  field,
}: UrgencySelectorProps<TFieldValues>) => {
  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value}
      name={field.name}
    >
      <FormControl>
        <SelectTrigger
          className={cn(
            'flex-row-reverse justify-end gap-2 flex-1 hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground',
            !field.value && 'text-muted-foreground'
          )}
          {...field}
        >
          <SelectValue placeholder='Select a urgency level' />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        <SelectItem value='high'>High</SelectItem>
        <SelectItem value='normal'>Normal</SelectItem>
        <SelectItem value='low'>Low</SelectItem>
      </SelectContent>
    </Select>
  );
};

UrgencySelector.displayName = 'UrgencySelector';
