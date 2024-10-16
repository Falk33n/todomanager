import {
  AddTaskForm,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components';
import { Plus } from 'lucide-react';

export const AddTaskDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label='Add a new task'
          className='gap-2 rounded-xl'
        >
          New task
          <Plus
            aria-hidden
            className='size-4'
          />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add a new task</DialogTitle>
          <DialogDescription>
            Add the details about your task here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <AddTaskForm />
      </DialogContent>
    </Dialog>
  );
};

AddTaskDialog.displayName = 'AddTaskDialog';
