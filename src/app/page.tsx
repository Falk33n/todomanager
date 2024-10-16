import { AddTaskDialog, ModeToggle, TaskAccordion } from '@/components';

export default function Home() {
  return (
    <main className='px-4 w-full'>
      <div className='py-4'>
        <AddTaskDialog />
      </div>
      <div className='flex flex-col gap-y-16 mx-auto w-[80%]'>
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
      <div className='mt-40'>
        <ModeToggle />
      </div>
    </main>
  );
}
