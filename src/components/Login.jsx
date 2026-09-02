import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/success');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup check>
          <Input
            id="terms"
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
          />
          <Label htmlFor="terms" check>
            Şartları kabul ediyorum
          </Label>
        </FormGroup>

        <FormGroup className="text-center p-4">
          <Button type="submit" color="primary">
            Login
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}