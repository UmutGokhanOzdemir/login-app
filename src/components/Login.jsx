import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password:
    'Password must be at least 8 characters and include uppercase, lowercase, number and special character',
};

const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      emailRegex.test(form.email) &&
      passwordRegex.test(form.password) &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    const value = type === 'checkbox' ? checked : event.target.value;

    if (name === 'email') {
      setErrors({ ...errors, email: !emailRegex.test(value) });
    }

    if (name === 'password') {
      setErrors({ ...errors, password: !passwordRegex.test(value) });
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
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
            invalid={errors.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
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
            invalid={errors.password}
          />
          {errors.password && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
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
          <Button type="submit" color="primary" disabled={!isValid}>
            Login
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
}