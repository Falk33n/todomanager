import { Button, ModeToggle, TaskAccordion } from '@/components';
import { Plus } from 'lucide-react';

export default function Home() {
  return (
    <main className='px-4 w-full'>
      <ModeToggle />
      <Button aria-label='Add new task' className='gap-2'>
        Add new
        <Plus
          aria-hidden
          className='size-4'
        />
      </Button>
      <div className='border-t'>
        <TaskAccordion
          label='Active Tasks'
          id='activeTasks'
          type='active'
        />
        <TaskAccordion
          label='Inactive Tasks'
          id='inactiveTasks'
          type='inactive'
        />
        <TaskAccordion
          label='Completed Tasks'
          id='completedTasks'
          type='completed'
        />
      </div>
    </main>
  );
}
