import { Button } from '@/components';
import { Plus } from 'lucide-react';

export const AddTaskButton = () => {
  return (
    <Button
      aria-label='Add a new task'
      className='gap-2'
    >
      New task
      <Plus
        aria-hidden
        className='size-4'
      />
    </Button>
  );
};

AddTaskButton.displayName = 'AddTaskButton';
