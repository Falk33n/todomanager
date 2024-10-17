'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='top-7 left-7 fixed'
        asChild
      >
        <Button
          variant='outline'
          size='icon'
        >
          <Sun className='w-[1.2rem] h-[1.2rem] transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute w-[1.2rem] h-[1.2rem] transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

ModeToggle.displayName = 'ModeToggle';
