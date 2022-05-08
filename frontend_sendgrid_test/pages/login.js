import Joi from 'joi';
import React, { useState } from 'react';

import { useAuth } from '../contexts/auth.context';
import { Button, Form, Label, Input } from '../ui-components/form';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { authenticate } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verify data with Joi
    const scheme = Joi.object({
      email: Joi.string().min(0).email({ tlds: { allow: false }}).required(),
      password: Joi.string().min(6).required(),
    })
    
    const result = await scheme.validate({ email, password });
    if (result.error !== undefined) return alert(result.error.toString().replace("ValidationError: ", ""))

    // make request
    const { error } = await authenticate({ email, password });
    console.log(error)

    // handling error
    if (error !== null) return alert(error);

    // if all is ok redirect to /
    window.location.href = "/";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='email'>Email</Label>
      <Input name="email" type="email" required onChange={e => setEmail(e.target.value)} />
      
      <Label htmlFor='password'>Password</Label>
      <Input name="password" type="password" required onChange={e => setPassword(e.target.value)} />

      <Button type="submit">Login</Button>
    </Form>
  )
};

export default Login;