'use client';

import ApiService from '@/service/ApiService';
import '@n8n/chat/style.css';
import { useEffect } from 'react';

export default function ChatBox() {
  useEffect(() => {
    ApiService.request('GET', '/customers/contact/chatbox-config')
      .then(async (res) => {
        if (res?.n8nCRMWebhook) {
          const { createChat } = await import('@n8n/chat');
          createChat({
            webhookUrl: res.n8nCRMWebhook,
          });
        } else if (res?.CRMScript) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.innerHTML = res.CRMScript;
          document.body.appendChild(script);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <></>;
}
