import React, { useEffect, useState } from 'react';

import { useAuth } from './auth.context';

import { MAIL_ENDPOINT } from '../constants/API_ENDPOINTS';
import { httpPost, httpGet } from '../utils/http';

const MailsContext = React.createContext({});
const MailsProvider = (props) => {
  const { isLoggedIn, token } = useAuth();

  const [templates, setTemplates] = useState([]);

  
  useEffect(() => {
    if (!isLoggedIn || !token) return ;

    const fetchTemplates = async () => {
      const response = await httpGet(`${MAIL_ENDPOINT}/templates`, token, {});
      
      if (!response.data.ok) {
        return ;
      }

      return setTemplates(response.data.result);
    }

    fetchTemplates();
  }, [isLoggedIn, token]);

  const sendMail = async (body) => {
    const response = {
      data: null,
      error: null,
      status: null
    }
  
    try {
      const result = await httpPost(`${MAIL_ENDPOINT}/send`, token, body);
      response.data = result.data;
      response.status = result.status;
    } catch (error) {
      response.error = error.response.data;
      response.status = error.response.status;
    }

    return response;
  }

  return (
    <MailsContext.Provider value={{
      templates,
      sendMail
    }} {...props} />
  )
}

const useMails = () => React.useContext(MailsContext);
export { MailsProvider, useMails }