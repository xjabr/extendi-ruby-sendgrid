import Joi from 'joi';
import React, { useState } from 'react';

import { useMails } from '../contexts/mails.context';
import { Input, Button, Label, Select, Form } from '../ui-components/form';

const Home = () => {
  const { templates, sendMail } = useMails();

  const [from, setFrom] = useState(null);
  const [subject, setSubject] = useState(null);
  const [to, setTo] = useState([]);
  const [content, setContent] = useState(null);
  const [cc, setCC] = useState([]);
  const [bcc, setBCC] = useState([]);
  const [templateId, setTemplateId] = useState(null);
  const [templateData, setTemplateData] = useState({});
  const [type, setType] = useState(null);

  const handleAdd = (set, item) => {
    set(items => [...items, item]);
  }

  const handleRemove = (set, index) => {
    set(items => items.filter((_, i) => i !== index));
  }

  const getValueField = (query, type = 'text') => {
    const element = document.querySelector(query);

    let value = element.value; // todo add a way for check type of fields
    element.value = "";

    return value;
  }

  const handleSendMail = async () => {
    const data = {
      from,
      subject,
      to,
      cc,
      bcc,
      type,
      content,
      template_id: templateId,
      template_data: templateData,
    };

    const scheme = Joi.object({
      from: Joi.string().required(),
      subject: Joi.string().required(),
      to: Joi.array().items(
        Joi.string().min(0).email({ tlds: { allow: false }})
      ),
      cc: Joi.array().items(
        Joi.string().min(0).email({ tlds: { allow: false }})
      ),
      bcc: Joi.array().items(
        Joi.string().min(0).email({ tlds: { allow: false }})
      ),
      type: Joi.number().allow(0).allow(1).required(),
      content: Joi.string().allow(null).allow("").optional(),
      template_id: Joi.string().allow(null).allow("").optional(),
      template_data: Joi.any().allow({}).optional()
    })

    const result = await scheme.validate(data);
    if (result.error !== undefined) return alert(result.error.toString())

    const response = await sendMail(data);
    if (response.error !== null) return alert(JSON.stringify(response.error.errors));
    
    return alert(response.data.message);
  }


  return (
    <Form as="div" className='big-form'>
      <Label htmlFor='from'>Da:</Label>
      <Input name="from" id="from" type="email" onChange={e => setFrom(e.target.value)} />

      <div>
        <Label htmlFor='to'>Destinatari: </Label>
        <Input name="to" id="to" type="email" />
        <Button className='primary' onClick={() => handleAdd(setTo, getValueField('#to', 'email'))}>Aggiungi</Button>

        <ul>
        {
          to.map((item, index) => <li key={index}>{item} <Button onClick={() => handleRemove(setTo, index)} className='red delete-item'>&times;</Button></li>)
        }
        </ul>
      </div>

      <div className={to.length > 0 ? 'mt-2' : null}>
        <Label htmlFor='cc'>CC: </Label>
        <Input name="cc" id="cc" type="email" />
        <Button className='primary' onClick={() => handleAdd(setCC, getValueField('#cc', 'email'))}>Aggiungi</Button>

        <ul>
        {
          cc.map((item, index) => <li key={index}>{item} <Button onClick={() => handleRemove(setCC, index)} className='red delete-item'>&times;</Button></li>)
        }
        </ul>
      </div>

      <div className={cc.length > 0 ? 'mt-2' : null}>
        <Label htmlFor='bcc'>BCC: </Label>
        <Input name="bcc" id="bcc" type="email" />
        <Button className='primary' onClick={() => handleAdd(setBCC, getValueField('#bcc', 'email'))}>Aggiungi</Button>

        <ul>
        {
          bcc.map((item, index) => <li key={index}>{item} <Button onClick={() => handleRemove(setBCC, index)} className='red delete-item'>&times;</Button></li>)
        }
        </ul>
      </div>

      <Label className={bcc.length > 0 ? 'mt-2' : null} htmlFor='subject'>Oggetto:</Label>
      <Input name="subject" id="subject" type="text" onChange={e => setSubject(e.target.value)} />

      {/* select type of mail (template or only content) */}
      <div>
        <Select onChange={e => setType(parseInt(e.target.value))}>
          <option>Seleziona un opzione</option>
          <option value={0}>Testo</option>
          <option value={1}>Template</option>
        </Select>
      </div>

      {
        type == 0 ?
          <div className='mt-2'>
            <Label htmlFor='content'>Testo:</Label>
            <Input name="content" id="content" type="text" onChange={e => setContent(e.target.value)} />
          </div>
          :
          null
      }

      {
        type == 1 ?
          <div className='mt-2'>
            <Select onChange={e => setTemplateId(e.target.value)}>
              <option>Seleziona un template</option>
              {
                templates && templates.map((item, index) => <option key={index} value={item.id}>{item.name}</option>)
              }
            </Select>

            <p>Dati template: </p>
            <div className='d-flex align-items-center'>
              <div>
                <Label htmlFor='key'>Key: </Label>
                <Input name="key" id="key" type="text" />
              </div>

              <div className='ml-1'>
                <Label htmlFor='value'>Value: </Label>
                <Input name="value" id="value" type="text" />
              </div>

              <Button className='primary ml-1' onClick={() => setTemplateData( {...templateData, ...{ [getValueField('#key')]:  getValueField('#value') } } )}>Aggiungi</Button>
            </div>

            <ul>
            {
              Object.keys(templateData).map((item, index) => {
                return <li key={index}>Key: {item} - Value: {templateData[item]}</li>
              })
            }
            </ul>
          </div>
          :
          null
      }

      <hr />

      <Button className='primary' onClick={handleSendMail}>Invia</Button>
    </Form>
  )
};

export default Home;