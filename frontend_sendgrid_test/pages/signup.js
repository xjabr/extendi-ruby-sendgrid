import Joi from 'joi';
import React, { useState } from 'react';

import { useAuth } from '../contexts/auth.context';
import { Button, Form, Label, Input } from '../ui-components/form';

const Signup = () => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);

  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verify data with Joi
    const scheme = Joi.object({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().min(0).email({ tlds: { allow: false }}).required(),
      password: Joi.string().min(6).required(),
      passwordConfirmation: Joi.any().valid(Joi.ref('password')).required()
    });
    
    const result = await scheme.validate({ name, username, email, password, passwordConfirmation });
    if (result.error !== undefined) return alert(result.error.toString().replace("ValidationError: ", ""))

    // make request
    const { error } = await signup({ name, username, email, password, password_confirmation: passwordConfirmation });
    console.log(error)

    // handling error
    if (error !== null) return alert(error);

    // if all is ok redirect to /login
    window.location.href = "/login";
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor='name'>Nome</Label>
      <Input name="name" type="text" required onChange={e => setName(e.target.value)} />

      <Label htmlFor='username'>Username</Label>
      <Input name="username" type="text" required onChange={e => setUsername(e.target.value)} />

      <Label htmlFor='email'>Email</Label>
      <Input name="email" type="email" required onChange={e => setEmail(e.target.value)} />

      <Label htmlFor='password'>Password</Label>
      <Input name="password" type="password" required onChange={e => setPassword(e.target.value)} />

      <Label htmlFor='password_confirmation'>Conferma Password</Label>
      <Input name="password_confirmation" type="password" required onChange={e => setPasswordConfirmation(e.target.value)} />

      <Button type="submit">Conferma</Button>
    </Form>
  )
};

export default Signup;