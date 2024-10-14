import {
  Button,
  Calendar,
  FormControl,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components';
import { cn } from '@/lib';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { ControllerRenderProps, FieldValues, Path } from 'react-hook-form';

type DatePickerProps<TFieldValues extends FieldValues> = {
  field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
};

export const DatePicker = <TFieldValues extends FieldValues>({
  field,
}: DatePickerProps<TFieldValues>) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'text-left font-normal flex-1 justify-start gap-2 hover:bg-muted focus:bg-muted hover:text-foreground focus:text-foreground',
              !field.value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='opacity-50 size-4' />
            {field.value ? (
              format(field.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent
        className='p-0 w-auto'
        align='start'
      >
        <Calendar
          mode='single'
          selected={field.value}
          onSelect={field.onChange}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

DatePicker.displayName = 'DatePicker';
