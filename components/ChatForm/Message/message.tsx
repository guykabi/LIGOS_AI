'use client';

import React from 'react';
import styles from './message.module.scss';
import { RxAvatar } from 'react-icons/rx';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Markdown from '@/components/CodeForm/Markdown/markdown';

type MessageProps = {
  content: string;
  role?: 'assistant' | 'user';
};

const Message = ({ content, role }: MessageProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <div className={role === 'user' ? styles.userMessage : styles.message}>
        {role === 'user' ? (
          <div className={styles.senderIcon}>
            {session?.user?.image ? (
              <Image
                alt='image'
                src={session?.user?.image}
                width={20}
                height={20}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <RxAvatar size={20} />
            )}
          </div>
        ) : (
          <div className={styles.senderIcon}>
            <Image
              width={20}
              height={20}
              alt='Ligos'
              src='/images/AI_LOGO.png'
            />
          </div>
        )}
        <div className={styles.content}>
          {pathname.startsWith('/Code') ? (
            <Markdown content={content} />
          ) : (
            <>{content}</>
          )}
        </div>
      </div>
    </>
  );
};

export default Message;
