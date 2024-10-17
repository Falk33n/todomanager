import { AddTaskDialog, TaskAccordion } from '@/components';

export default function Home() {
  return (
    <main className='mx-auto px-4 py-20 w-[80%]'>
      <div className='flex flex-col gap-1'>
        <div className='py-2'>
          <AddTaskDialog />
        </div>
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
