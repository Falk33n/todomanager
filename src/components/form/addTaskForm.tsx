'use client';

import {
  Button,
  DatePicker,
  DialogFooter,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  UrgencySelector,
} from '@/components';
import { toast } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  title: z.string({
    required_error: 'Please enter a title.',
  }),
  urgency: z.string({
    required_error: 'Please select an urgency level.',
  }),
  dueDate: z.date({
    required_error: 'Please pick a due date.',
  }),
});

export const AddTaskForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: '',
      urgency: '',
      dueDate: undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedTasks = {
      ...data,
      dueDate: format(data.dueDate, 'yyyy-MM-dd'),
      status: 'active',
    };
    const activeTasks = localStorage.getItem('activeTasks');

    if (activeTasks) {
      const parsedTasks = JSON.parse(activeTasks);
      const combinedTasks = [...parsedTasks, formattedTasks];
      localStorage.setItem('activeTasks', JSON.stringify(combinedTasks));
    } else {
      localStorage.setItem('activeTasks', JSON.stringify([formattedTasks]));
    }

    form.reset();
    toast({
      title: 'Success!',
      variant: 'success',
      description: 'Added the new task successfully.',
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='flex flex-wrap items-center gap-x-4'>
              <FormLabel className='text-right w-[15%] md:w-[20%]'>
                Title
              </FormLabel>
              <FormControl>
                <Input
                  className='flex-1 hover:bg-muted focus:bg-muted placeholder:hover:text-foreground hover:text-foreground placeholder:focus:text-transparent focus:text-foreground transition-colors'
                  placeholder='Enter a title'
                  {...field}
                />
              </FormControl>
              <FormDescription className='sr-only'>
                Add the title of the task.
              </FormDescription>
              <FormMessage className='w-full' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='urgency'
          render={({ field }) => (
            <FormItem className='flex flex-wrap items-center gap-x-4'>
              <FormLabel className='text-right w-[15%] md:w-[20%]'>
                Urgency
              </FormLabel>
              <UrgencySelector field={field} />
              <FormDescription className='sr-only'>
                Add the urgency level of the task.
              </FormDescription>
              <FormMessage className='w-full' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='dueDate'
          render={({ field }) => (
            <FormItem className='flex flex-wrap items-center gap-x-4'>
              <FormLabel className='text-right w-[15%] md:w-[20%] whitespace-nowrap'>
                Due Date
              </FormLabel>
              <DatePicker field={field} />
              <FormDescription className='sr-only'>
                Add the due date of the task.
              </FormDescription>
              <FormMessage className='w-full' />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            aria-label='Save and add the task.'
            type='submit'
            className='px-10'
          >
            Add task
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

AddTaskForm.displayName = 'AddTaskForm';
