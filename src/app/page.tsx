import { ModeToggle, TaskAccordion } from '@/components';

export default function Home() {
  return (
    <main className='px-4 w-full'>
      <ModeToggle />
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
    </main>
  );
}
